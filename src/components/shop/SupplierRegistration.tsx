import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Upload, File, X, CheckCircle, AlertCircle, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface DocumentFile {
  id: string;
  file: File;
  type: string;
  uploadProgress: number;
  status: 'uploading' | 'completed' | 'error';
}

export const SupplierRegistration = () => {
  const { toast } = useToast();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    // Basic Business Information
    companyLegalName: '',
    tradeName: '',
    businessType: '',
    yearEstablished: '',
    
    // Legal & Regulatory Compliance
    commercialRegNumber: '',
    taxIdentificationNumber: '',
    agriculturalPermitNumber: '',
    phytosanitaryCertNumber: '',
    organicCertification: '',
    
    // Contact Information
    contactEmail: '',
    contactPhone: '',
    businessAddress: '',
    serviceAreas: '',
    
    // Product Categories
    productCategories: [] as string[],
    
    // Terms acceptance
    acceptTerms: false,
    acceptDataProcessing: false
  });

  const [documents, setDocuments] = useState<DocumentFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const businessTypes = [
    "Individual Farmer",
    "Cooperative", 
    "Agri-Wholesaler",
    "Equipment Manufacturer",
    "Seed Supplier",
    "Fertilizer Distributor",
    "Organic Producer",
    "Agricultural Consultant"
  ];

  const organicCertifications = [
    "EU Organic",
    "USDA NOP",
    "Ecocert",
    "JAS Organic",
    "IFOAM",
    "Other"
  ];

  const productCategories = [
    "Seeds & Plants",
    "Fertilizers", 
    "Pesticides",
    "Agrochemicals",
    "Organic Inputs",
    "Farm Equipment",
    "Irrigation Systems",
    "Livestock Feed",
    "Agricultural Tools"
  ];

  const documentTypes = [
    { id: 'commercial-registry', name: 'Commercial Registry Extract', required: true },
    { id: 'agricultural-license', name: 'Agricultural License', required: false }
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleProductCategoryChange = (category: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      productCategories: checked 
        ? [...prev.productCategories, category]
        : prev.productCategories.filter(c => c !== category)
    }));
  };

  const handleFileUpload = (files: FileList, documentType: string) => {
    Array.from(files).forEach(file => {
      const documentFile: DocumentFile = {
        id: `${documentType}-${Date.now()}-${Math.random()}`,
        file,
        type: documentType,
        uploadProgress: 0,
        status: 'uploading'
      };

      setDocuments(prev => [...prev, documentFile]);

      // Simulate upload progress
      const uploadInterval = setInterval(() => {
        setDocuments(prev => prev.map(doc => {
          if (doc.id === documentFile.id) {
            const newProgress = Math.min(doc.uploadProgress + 10, 100);
            return {
              ...doc,
              uploadProgress: newProgress,
              status: newProgress === 100 ? 'completed' : 'uploading'
            };
          }
          return doc;
        }));
      }, 200);

      setTimeout(() => {
        clearInterval(uploadInterval);
      }, 2000);
    });
  };

  const removeDocument = (documentId: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== documentId));
  };

  const validateCommercialRegNumber = (number: string) => {
    // Basic validation for Algerian commercial registration format
    const algerianRegFormat = /^\d{2}\/\d{4}\/\d{7}$/;
    return algerianRegFormat.test(number);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.acceptTerms) {
      toast({
        title: "Erreur",
        description: "Vous devez accepter les conditions d'utilisation",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const success = await register(formData, 'supplier');
      
      if (success) {
        toast({
          title: "Demande soumise avec succès!",
          description: "Votre demande d'inscription sera examinée sous 48h. Vous recevrez un email de confirmation.",
        });
        
        // Reset form
        setFormData({
          companyLegalName: '',
          tradeName: '',
          businessType: '',
          yearEstablished: '',
          commercialRegNumber: '',
          taxIdentificationNumber: '',
          agriculturalPermitNumber: '',
          phytosanitaryCertNumber: '',
          organicCertification: '',
          contactEmail: '',
          contactPhone: '',
          businessAddress: '',
          serviceAreas: '',
          productCategories: [],
          acceptTerms: false,
          acceptDataProcessing: false
        });
        setDocuments([]);
        
        // Redirect to login after successful registration
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
        
      } else {
        throw new Error('Registration failed');
      }
      
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la soumission",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const needsAgriculturalPermit = formData.productCategories.some(cat => 
    ['Agrochemicals', 'Organic Inputs', 'Pesticides', 'Fertilizers'].includes(cat)
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-green-800">
            Inscription Fournisseur
          </CardTitle>
          <CardDescription>
            Rejoignez notre plateforme en tant que fournisseur agricole certifié
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Business Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Info className="h-5 w-5" />
                Informations Générales de l'Entreprise
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyLegalName">Dénomination Sociale *</Label>
                  <Input
                    id="companyLegalName"
                    value={formData.companyLegalName}
                    onChange={(e) => handleInputChange('companyLegalName', e.target.value)}
                    placeholder="Nom légal de l'entreprise"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tradeName">Nom Commercial</Label>
                  <Input
                    id="tradeName"
                    value={formData.tradeName}
                    onChange={(e) => handleInputChange('tradeName', e.target.value)}
                    placeholder="Si différent du nom légal"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="businessType">Type d'Entreprise *</Label>
                  <Select value={formData.businessType} onValueChange={(value) => handleInputChange('businessType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner le type" />
                    </SelectTrigger>
                    <SelectContent>
                      {businessTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="yearEstablished">Année de Création *</Label>
                  <Input
                    id="yearEstablished"
                    type="number"
                    min="1900"
                    max={new Date().getFullYear()}
                    value={formData.yearEstablished}
                    onChange={(e) => handleInputChange('yearEstablished', e.target.value)}
                    placeholder="YYYY"
                    required
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Legal & Regulatory Compliance */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Conformité Légale et Réglementaire
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="commercialRegNumber">
                    N° Registre de Commerce *
                    <span className="text-xs text-gray-500 ml-1">(Format: XX/XXXX/XXXXXXX)</span>
                  </Label>
                  <Input
                    id="commercialRegNumber"
                    value={formData.commercialRegNumber}
                    onChange={(e) => handleInputChange('commercialRegNumber', e.target.value)}
                    placeholder="00/0000/0000000"
                    pattern="\d{2}/\d{4}/\d{7}"
                    className={!validateCommercialRegNumber(formData.commercialRegNumber) && formData.commercialRegNumber ? 'border-red-500' : ''}
                    required
                  />
                  {!validateCommercialRegNumber(formData.commercialRegNumber) && formData.commercialRegNumber && (
                    <p className="text-xs text-red-500">Format invalide. Utilisez XX/XXXX/XXXXXXX</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="taxIdentificationNumber">N° Identification Fiscale *</Label>
                  <Input
                    id="taxIdentificationNumber"
                    value={formData.taxIdentificationNumber}
                    onChange={(e) => handleInputChange('taxIdentificationNumber', e.target.value)}
                    placeholder="Numéro TVA/NIF"
                    required
                  />
                </div>
                
                {needsAgriculturalPermit && (
                  <div className="space-y-2">
                    <Label htmlFor="agriculturalPermitNumber">
                      N° Agrément Agricole *
                      <span className="text-xs text-gray-500 ml-1">(Requis pour produits chimiques/bio)</span>
                    </Label>
                    <Input
                      id="agriculturalPermitNumber"
                      value={formData.agriculturalPermitNumber}
                      onChange={(e) => handleInputChange('agriculturalPermitNumber', e.target.value)}
                      placeholder="Numéro d'agrément"
                      required
                    />
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="phytosanitaryCertNumber">N° Certification Phytosanitaire</Label>
                  <Input
                    id="phytosanitaryCertNumber"
                    value={formData.phytosanitaryCertNumber}
                    onChange={(e) => handleInputChange('phytosanitaryCertNumber', e.target.value)}
                    placeholder="Pour fournisseurs de semences/plants"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="organicCertification">Certification Biologique</Label>
                  <Select value={formData.organicCertification} onValueChange={(value) => handleInputChange('organicCertification', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner si applicable" />
                    </SelectTrigger>
                    <SelectContent>
                      {organicCertifications.map(cert => (
                        <SelectItem key={cert} value={cert}>{cert}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator />

            {/* Product Categories */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Catégories de Produits *</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {productCategories.map(category => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={category}
                      checked={formData.productCategories.includes(category)}
                      onCheckedChange={(checked) => handleProductCategoryChange(category, !!checked)}
                    />
                    <Label htmlFor={category} className="text-sm">{category}</Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Informations de Contact</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Email Professionnel *</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                    placeholder="contact@entreprise.com"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Téléphone *</Label>
                  <Input
                    id="contactPhone"
                    type="tel"
                    value={formData.contactPhone}
                    onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                    placeholder="+213 XX XX XX XX XX"
                    required
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="businessAddress">Adresse Commerciale *</Label>
                  <Textarea
                    id="businessAddress"
                    value={formData.businessAddress}
                    onChange={(e) => handleInputChange('businessAddress', e.target.value)}
                    placeholder="Adresse complète de l'entreprise"
                    rows={3}
                    required
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="serviceAreas">Zones de Service</Label>
                  <Textarea
                    id="serviceAreas"
                    value={formData.serviceAreas}
                    onChange={(e) => handleInputChange('serviceAreas', e.target.value)}
                    placeholder="Wilayas/régions desservies (ex: Alger, Blida, Tipaza...)"
                    rows={2}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Document Uploads */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Documents Requis
              </h3>
              
              <div className="space-y-4">
                {documentTypes.map(docType => (
                  <div key={docType.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Label className="font-medium">
                        {docType.name}
                        {docType.required && <span className="text-red-500"> *</span>}
                      </Label>
                    </div>
                    
                    <div className="space-y-2">
                      <Input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        multiple
                        onChange={(e) => e.target.files && handleFileUpload(e.target.files, docType.id)}
                        className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                      />
                      <p className="text-xs text-gray-500">
                        Formats acceptés: PDF, JPG, PNG (max 5MB par fichier)
                      </p>
                    </div>
                    
                    {/* Display uploaded files for this document type */}
                    <div className="mt-3 space-y-2">
                      {documents
                        .filter(doc => doc.type === docType.id)
                        .map(doc => (
                          <div key={doc.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                            <div className="flex items-center gap-2">
                              <File className="h-4 w-4 text-gray-600" />
                              <span className="text-sm truncate max-w-48">{doc.file.name}</span>
                              {doc.status === 'completed' && (
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              )}
                              {doc.status === 'error' && (
                                <AlertCircle className="h-4 w-4 text-red-600" />
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              {doc.status === 'uploading' && (
                                <Progress value={doc.uploadProgress} className="w-16 h-2" />
                              )}
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeDocument(doc.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Terms and Conditions */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="acceptTerms"
                  checked={formData.acceptTerms}
                  onCheckedChange={(checked) => handleInputChange('acceptTerms', !!checked)}
                />
                <Label htmlFor="acceptTerms" className="text-sm">
                  J'accepte les <a href="#" className="text-green-600 underline">conditions d'utilisation</a> et la <a href="#" className="text-green-600 underline">politique de confidentialité</a> *
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="acceptDataProcessing"
                  checked={formData.acceptDataProcessing}
                  onCheckedChange={(checked) => handleInputChange('acceptDataProcessing', !!checked)}
                />
                <Label htmlFor="acceptDataProcessing" className="text-sm">
                  J'autorise le traitement de mes données personnelles pour l'évaluation de ma candidature
                </Label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button 
                type="submit" 
                className="bg-green-600 hover:bg-green-700 px-8 py-3"
                disabled={isSubmitting || !formData.acceptTerms}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Soumission en cours...
                  </>
                ) : (
                  'Soumettre la Demande'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
