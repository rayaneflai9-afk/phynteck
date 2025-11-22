
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Shield, Users, AlertTriangle, CheckCircle, Clock, XCircle } from "lucide-react";

export const AdminControlCenter = () => {
  const pendingSuppliers = [
    { id: 1, name: "Ferme Bio Alger", email: "contact@fermebio.dz", status: "pending", submitted: "2024-01-15" },
    { id: 2, name: "Équipements Agricoles Sahra", email: "info@sahra.dz", status: "review", submitted: "2024-01-14" },
    { id: 3, name: "Semences Premium", email: "admin@semences.dz", status: "approved", submitted: "2024-01-13" }
  ];

  const disputes = [
    { id: 1, supplier: "Ferme Bio Alger", customer: "Ahmed B.", issue: "Produit non conforme", priority: "high", status: "open" },
    { id: 2, supplier: "Équipements Sahra", customer: "Fatima K.", issue: "Livraison retardée", priority: "medium", status: "investigating" }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'approved': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rejected': return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <AlertTriangle className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Admin Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fournisseurs Actifs</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">847</div>
            <p className="text-xs text-muted-foreground">+23 ce mois</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Attente</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Demandes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Litiges Ouverts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">À résoudre</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenus Platform</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4M DA</div>
            <p className="text-xs text-muted-foreground">Ce mois</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="suppliers" className="w-full">
        <TabsList>
          <TabsTrigger value="suppliers">Gestion Fournisseurs</TabsTrigger>
          <TabsTrigger value="disputes">Résolution Litiges</TabsTrigger>
          <TabsTrigger value="moderation">Modération Contenu</TabsTrigger>
        </TabsList>

        <TabsContent value="suppliers">
          <Card>
            <CardHeader>
              <CardTitle>Demandes de Fournisseurs</CardTitle>
              <CardDescription>Gérez les nouvelles demandes et vérifications</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fournisseur</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Date Soumission</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingSuppliers.map((supplier) => (
                    <TableRow key={supplier.id}>
                      <TableCell className="font-medium">{supplier.name}</TableCell>
                      <TableCell>{supplier.email}</TableCell>
                      <TableCell>{supplier.submitted}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(supplier.status)}
                          <Badge variant={supplier.status === 'approved' ? 'default' : 'secondary'}>
                            {supplier.status === 'pending' ? 'En Attente' : 
                             supplier.status === 'review' ? 'En Révision' : 'Approuvé'}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">Voir</Button>
                          {supplier.status === 'pending' && (
                            <>
                              <Button size="sm" className="bg-green-600 hover:bg-green-700">Approuver</Button>
                              <Button size="sm" variant="destructive">Rejeter</Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="disputes">
          <Card>
            <CardHeader>
              <CardTitle>Litiges Actifs</CardTitle>
              <CardDescription>Résolvez les conflits entre fournisseurs et clients</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fournisseur</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Problème</TableHead>
                    <TableHead>Priorité</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {disputes.map((dispute) => (
                    <TableRow key={dispute.id}>
                      <TableCell className="font-medium">{dispute.supplier}</TableCell>
                      <TableCell>{dispute.customer}</TableCell>
                      <TableCell>{dispute.issue}</TableCell>
                      <TableCell>
                        <Badge variant={dispute.priority === 'high' ? 'destructive' : 'default'}>
                          {dispute.priority === 'high' ? 'Élevée' : 'Moyenne'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {dispute.status === 'open' ? 'Ouvert' : 'Investigation'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">Détails</Button>
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">Résoudre</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="moderation">
          <Card>
            <CardHeader>
              <CardTitle>Modération de Contenu</CardTitle>
              <CardDescription>Surveillez et modérez le contenu de la plateforme</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Système de Modération Automatique</h3>
                <p className="text-muted-foreground">
                  Le système IA surveille automatiquement le contenu. Aucune action manuelle requise pour le moment.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
