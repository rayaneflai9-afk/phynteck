
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Megaphone, Plus, Calendar, Percent, Package, Users, Gift } from "lucide-react";

interface PromotionEngineProps {
  userRole: 'supplier' | 'admin';
}

export const PromotionEngine = ({ userRole }: PromotionEngineProps) => {
  const [showCreatePromo, setShowCreatePromo] = useState(false);

  const activePromotions = [
    {
      id: 1,
      name: "Réduction Équipements Hiver",
      type: "percentage",
      value: 15,
      startDate: "2024-01-15",
      endDate: "2024-02-15",
      status: "active",
      uses: 24
    },
    {
      id: 2,
      name: "Pack Semences Premium",
      type: "bundle",
      value: 25,
      startDate: "2024-01-10",
      endDate: "2024-01-31",
      status: "active",
      uses: 8
    },
    {
      id: 3,
      name: "Fidélité Agriculteurs",
      type: "loyalty",
      value: 10,
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      status: "active",
      uses: 156
    }
  ];

  const getPromoTypeBadge = (type: string) => {
    switch (type) {
      case 'percentage': return <Badge className="bg-blue-100 text-blue-800">% Réduction</Badge>;
      case 'bundle': return <Badge className="bg-purple-100 text-purple-800">Pack</Badge>;
      case 'loyalty': return <Badge className="bg-orange-100 text-orange-800">Fidélité</Badge>;
      default: return <Badge variant="outline">Autre</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return <Badge className="bg-green-100 text-green-800">Actif</Badge>;
      case 'scheduled': return <Badge className="bg-yellow-100 text-yellow-800">Programmé</Badge>;
      case 'expired': return <Badge variant="destructive">Expiré</Badge>;
      default: return <Badge variant="outline">Inconnu</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Moteur de Promotions</h2>
          <p className="text-muted-foreground">Créez et gérez vos offres spéciales</p>
        </div>
        <Button 
          onClick={() => setShowCreatePromo(true)}
          className="bg-purple-600 hover:bg-purple-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Créer Promotion
        </Button>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList>
          <TabsTrigger value="active">Promotions Actives</TabsTrigger>
          <TabsTrigger value="scheduled">Programmées</TabsTrigger>
          <TabsTrigger value="templates">Modèles</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Promotions en Cours</CardTitle>
              <CardDescription>
                {activePromotions.length} promotions actives • {activePromotions.reduce((sum, p) => sum + p.uses, 0)} utilisations totales
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom Promotion</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Valeur</TableHead>
                    <TableHead>Période</TableHead>
                    <TableHead>Utilisations</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activePromotions.map((promo) => (
                    <TableRow key={promo.id}>
                      <TableCell className="font-medium">{promo.name}</TableCell>
                      <TableCell>{getPromoTypeBadge(promo.type)}</TableCell>
                      <TableCell>
                        {promo.type === 'percentage' ? `${promo.value}%` : `${promo.value} DA`}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{promo.startDate}</div>
                          <div className="text-muted-foreground">→ {promo.endDate}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{promo.uses} fois</Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(promo.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">Modifier</Button>
                          <Button size="sm" variant="outline">Dupliquer</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scheduled">
          <Card>
            <CardHeader>
              <CardTitle>Promotions Programmées</CardTitle>
              <CardDescription>Promotions qui démarreront automatiquement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Aucune Promotion Programmée</h3>
                <p className="text-muted-foreground mb-4">
                  Créez des promotions à démarrage automatique pour planifier vos campagnes.
                </p>
                <Button onClick={() => setShowCreatePromo(true)}>
                  Programmer une Promotion
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle>Modèles de Promotions</CardTitle>
              <CardDescription>Templates prêts à utiliser pour vos promotions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Percent className="h-8 w-8 text-blue-600" />
                      <div>
                        <h4 className="font-semibold">Réduction Saisonnière</h4>
                        <p className="text-sm text-muted-foreground">10-30% de réduction</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="w-full">Utiliser</Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Package className="h-8 w-8 text-purple-600" />
                      <div>
                        <h4 className="font-semibold">Pack Bundle</h4>
                        <p className="text-sm text-muted-foreground">2 produits = -15%</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="w-full">Utiliser</Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Users className="h-8 w-8 text-orange-600" />
                      <div>
                        <h4 className="font-semibold">Programme Fidélité</h4>
                        <p className="text-sm text-muted-foreground">Points + récompenses</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="w-full">Utiliser</Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create Promotion Modal */}
      {showCreatePromo && (
        <Card className="fixed inset-0 z-50 bg-white m-4 overflow-auto">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Créer Nouvelle Promotion</CardTitle>
              <Button variant="outline" onClick={() => setShowCreatePromo(false)}>
                Fermer
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Nom de la Promotion</Label>
                  <Input placeholder="Ex: Réduction Hiver 2024" />
                </div>
                <div className="space-y-2">
                  <Label>Type de Promotion</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" className="h-16 flex-col">
                      <Percent className="h-5 w-5 mb-1" />
                      Pourcentage
                    </Button>
                    <Button variant="outline" className="h-16 flex-col">
                      <Package className="h-5 w-5 mb-1" />
                      Bundle
                    </Button>
                    <Button variant="outline" className="h-16 flex-col">
                      <Gift className="h-5 w-5 mb-1" />
                      Cadeau
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Valeur</Label>
                  <Input placeholder="Ex: 15 (pour 15%)" type="number" />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Date de Début</Label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <Label>Date de Fin</Label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <Label>Limite d'Utilisation</Label>
                  <Input placeholder="Nombre max d'utilisations" type="number" />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setShowCreatePromo(false)}>
                Annuler
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700">
                Créer Promotion
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
