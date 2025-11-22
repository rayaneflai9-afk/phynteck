
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart3, TrendingUp, Users, Package, Star, Eye, ShoppingCart, Calendar } from "lucide-react";

interface AnalyticsDashboardProps {
  userRole: 'supplier' | 'admin';
}

export const AnalyticsDashboard = ({ userRole }: AnalyticsDashboardProps) => {
  const supplierMetrics = {
    totalViews: 15420,
    conversionRate: 3.2,
    avgOrderValue: 125000,
    customerSatisfaction: 4.6,
    topProducts: [
      { name: "Tracteur MF 5710", sales: 12, revenue: "30M DA" },
      { name: "Graines Bio", sales: 89, revenue: "1.3M DA" },
      { name: "Engrais NPK", sales: 45, revenue: "380K DA" }
    ]
  };

  const platformMetrics = {
    totalSuppliers: 847,
    monthlyGrowth: 12.5,
    totalTransactions: 25680,
    platformRevenue: 2400000
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Tableau de Bord Analytique</h2>
        <p className="text-muted-foreground">
          {userRole === 'supplier' ? 'Analysez les performances de votre boutique' : 'Vue d\'ensemble de la plateforme'}
        </p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Vue d'Ensemble</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="customers">Clients</TabsTrigger>
          {userRole === 'admin' && <TabsTrigger value="platform">Plateforme</TabsTrigger>}
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Vues Produits</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{supplierMetrics.totalViews.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+18% ce mois</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taux Conversion</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{supplierMetrics.conversionRate}%</div>
                <p className="text-xs text-muted-foreground">+0.3% ce mois</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Panier Moyen</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{(supplierMetrics.avgOrderValue / 1000).toFixed(0)}K DA</div>
                <p className="text-xs text-muted-foreground">+5% ce mois</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Satisfaction</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{supplierMetrics.customerSatisfaction}/5</div>
                <p className="text-xs text-muted-foreground">+0.2 ce mois</p>
              </CardContent>
            </Card>
          </div>

          {/* Top Products */}
          <Card>
            <CardHeader>
              <CardTitle>Produits les Plus Performants</CardTitle>
              <CardDescription>Vos meilleurs produits ce mois</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {supplierMetrics.topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                        index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.sales} ventes</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{product.revenue}</p>
                      <Badge variant="outline" className="text-xs">Top {index + 1}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Mensuelle</CardTitle>
                <CardDescription>Évolution de vos ventes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Janvier 2024</span>
                    <span className="font-mono">850K DA</span>
                  </div>
                  <Progress value={85} />
                  
                  <div className="flex justify-between items-center">
                    <span>Décembre 2023</span>
                    <span className="font-mono">720K DA</span>
                  </div>
                  <Progress value={72} />
                  
                  <div className="flex justify-between items-center">
                    <span>Novembre 2023</span>
                    <span className="font-mono">690K DA</span>
                  </div>
                  <Progress value={69} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Indicateurs Clés</CardTitle>
                <CardDescription>KPIs de performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-blue-600" />
                      <span>Taux de Stock</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">94%</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-purple-600" />
                      <span>Délai Livraison</span>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">2.3 jours</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-orange-600" />
                      <span>Clients Récurrents</span>
                    </div>
                    <Badge className="bg-orange-100 text-orange-800">67%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="customers">
          <Card>
            <CardHeader>
              <CardTitle>Analyse Clientèle</CardTitle>
              <CardDescription>Profil et comportement de vos clients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Analyse Approfondie Disponible</h3>
                <p className="text-muted-foreground">
                  Données démographiques, habitudes d'achat et segmentation clientèle.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {userRole === 'admin' && (
          <TabsContent value="platform">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Fournisseurs</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{platformMetrics.totalSuppliers}</div>
                  <p className="text-xs text-muted-foreground">+{platformMetrics.monthlyGrowth}% ce mois</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Transactions</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{platformMetrics.totalTransactions.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">Ce mois</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Revenus Platform</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{(platformMetrics.platformRevenue / 1000000).toFixed(1)}M DA</div>
                  <p className="text-xs text-muted-foreground">Ce mois</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Croissance</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+{platformMetrics.monthlyGrowth}%</div>
                  <p className="text-xs text-muted-foreground">Mensuelle</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};
