
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Package, Plus, Edit, Trash, Eye, Camera, Video, Tag } from "lucide-react";

interface ProductManagementProps {
  userRole: 'supplier' | 'admin';
}

export const ProductManagement = ({ userRole }: ProductManagementProps) => {
  const [showAddProduct, setShowAddProduct] = useState(false);

  const products = [
    { 
      id: 1, 
      name: "Tracteur Massey Ferguson 5710", 
      category: "Équipements", 
      price: "2,500,000 DA", 
      stock: 3, 
      status: "active",
      sku: "MF-5710-2024"
    },
    { 
      id: 2, 
      name: "Graines de Blé Bio Premium", 
      category: "Semences", 
      price: "15,000 DA/kg", 
      stock: 150, 
      status: "active",
      sku: "BLE-BIO-001"
    },
    { 
      id: 3, 
      name: "Engrais Organique NPK", 
      category: "Fertilisants", 
      price: "8,500 DA/sac", 
      stock: 0, 
      status: "out_of_stock",
      sku: "NPK-ORG-50"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return <Badge className="bg-green-100 text-green-800">Actif</Badge>;
      case 'out_of_stock': return <Badge variant="destructive">Rupture</Badge>;
      case 'pending': return <Badge variant="secondary">En Attente</Badge>;
      default: return <Badge variant="outline">Inconnu</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Gestion des Produits</h2>
          <p className="text-muted-foreground">Gérez votre catalogue de produits agricoles</p>
        </div>
        <Button 
          onClick={() => setShowAddProduct(true)}
          className="bg-green-600 hover:bg-green-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Ajouter Produit
        </Button>
      </div>

      <Tabs defaultValue="list" className="w-full">
        <TabsList>
          <TabsTrigger value="list">Liste Produits</TabsTrigger>
          <TabsTrigger value="bulk">Gestion en Lot</TabsTrigger>
          <TabsTrigger value="pricing">Tarification Dynamique</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>Catalogue Produits</CardTitle>
              <CardDescription>
                {products.length} produits • {products.filter(p => p.status === 'active').length} actifs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produit</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Catégorie</TableHead>
                    <TableHead>Prix</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell className="text-muted-foreground">{product.sku}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell className="font-mono">{product.price}</TableCell>
                      <TableCell>
                        <span className={product.stock === 0 ? 'text-red-600' : 'text-green-600'}>
                          {product.stock}
                        </span>
                      </TableCell>
                      <TableCell>{getStatusBadge(product.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bulk">
          <Card>
            <CardHeader>
              <CardTitle>Opérations en Lot</CardTitle>
              <CardDescription>Effectuez des modifications sur plusieurs produits simultanément</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-20 flex-col">
                  <Package className="h-6 w-6 mb-2" />
                  Import CSV
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Tag className="h-6 w-6 mb-2" />
                  Mise à Jour Prix
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Edit className="h-6 w-6 mb-2" />
                  Modification Lot
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing">
          <Card>
            <CardHeader>
              <CardTitle>Tarification Dynamique</CardTitle>
              <CardDescription>Configurez des prix saisonniers et des remises volume</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Prix Saisonnier</Label>
                    <div className="flex gap-2">
                      <Input placeholder="Saison (ex: Hiver)" />
                      <Input placeholder="Multiplicateur (ex: 1.2)" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Remise Volume</Label>
                    <div className="flex gap-2">
                      <Input placeholder="Quantité min" />
                      <Input placeholder="% Remise" />
                    </div>
                  </div>
                </div>
                <Button className="bg-green-600 hover:bg-green-700">
                  Appliquer Règles
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Product Modal */}
      {showAddProduct && (
        <Card className="fixed inset-0 z-50 bg-white m-4 overflow-auto">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Ajouter Nouveau Produit</CardTitle>
              <Button variant="outline" onClick={() => setShowAddProduct(false)}>
                Fermer
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Nom du Produit</Label>
                  <Input placeholder="Ex: Tracteur John Deere..." />
                </div>
                <div className="space-y-2">
                  <Label>SKU</Label>
                  <Input placeholder="Code produit unique" />
                </div>
                <div className="space-y-2">
                  <Label>Catégorie</Label>
                  <Input placeholder="Équipements, Semences..." />
                </div>
                <div className="space-y-2">
                  <Label>Prix de Base (DA)</Label>
                  <Input placeholder="0" type="number" />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Média Produit</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" className="h-20 flex-col">
                      <Camera className="h-6 w-6 mb-1" />
                      Photos
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <Video className="h-6 w-6 mb-1" />
                      Vidéos
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <Package className="h-6 w-6 mb-1" />
                      360°
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Stock Initial</Label>
                  <Input placeholder="Quantité" type="number" />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setShowAddProduct(false)}>
                Annuler
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">
                Créer Produit
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
