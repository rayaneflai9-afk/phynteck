
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SupplierDashboard } from "@/components/shop/SupplierDashboard";
import { AdminControlCenter } from "@/components/shop/AdminControlCenter";
import { ProductManagement } from "@/components/shop/ProductManagement";
import { PromotionEngine } from "@/components/shop/PromotionEngine";
import { AnalyticsDashboard } from "@/components/shop/AnalyticsDashboard";
import { SupplierRegistration } from "@/components/shop/SupplierRegistration";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Store, Shield, Package, Megaphone, BarChart3, UserPlus, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ShopManagement = () => {
  const { user } = useAuth();
  const [showRegistration, setShowRegistration] = useState(false);

  // If no user, show registration form
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour
              </Button>
            </Link>
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                Inscription Fournisseur
              </h1>
              <p className="text-gray-600">
                Rejoignez notre plateforme en tant que fournisseur agricole
              </p>
            </div>
          </div>
          <SupplierRegistration />
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute requireApproval={user.role === 'supplier'}>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                {user.role === 'admin' ? 'Centre d\'Administration' : 'Tableau de Bord Fournisseur'}
              </h1>
              <p className="text-gray-600">
                {user.role === 'admin' 
                  ? 'Gérez la plateforme et supervisez les fournisseurs' 
                  : `Bienvenue ${user.companyName || user.name}`
                }
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <Link to="/">
                <Button variant="outline">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Accueil
                </Button>
              </Link>
              <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg shadow-sm">
                {user.role === 'admin' ? (
                  <Shield className="h-5 w-5 text-purple-600" />
                ) : (
                  <Store className="h-5 w-5 text-green-600" />
                )}
                <span className="font-medium capitalize">{user.role}</span>
              </div>
            </div>
          </div>

          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className={`grid w-full ${user.role === 'admin' ? 'grid-cols-5' : 'grid-cols-4'}`}>
              <TabsTrigger value="dashboard" className="flex items-center gap-2">
                {user.role === 'admin' ? <Shield className="h-4 w-4" /> : <Store className="h-4 w-4" />}
                Tableau de Bord
              </TabsTrigger>
              <TabsTrigger value="products" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                Produits
              </TabsTrigger>
              <TabsTrigger value="promotions" className="flex items-center gap-2">
                <Megaphone className="h-4 w-4" />
                Promotions
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Analytiques
              </TabsTrigger>
              {user.role === 'admin' && (
                <TabsTrigger value="suppliers" className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  Fournisseurs
                </TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="dashboard">
              {user.role === 'admin' ? <AdminControlCenter /> : <SupplierDashboard />}
            </TabsContent>

            <TabsContent value="products">
              <ProductManagement userRole={user.role} />
            </TabsContent>

            <TabsContent value="promotions">
              <PromotionEngine userRole={user.role} />
            </TabsContent>

            <TabsContent value="analytics">
              <AnalyticsDashboard userRole={user.role} />
            </TabsContent>

            {user.role === 'admin' && (
              <TabsContent value="suppliers">
                <AdminControlCenter />
              </TabsContent>
            )}
          </Tabs>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default ShopManagement;
