
import { useState } from "react";
import { Menu, X, Leaf, Search, Store, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "@/components/auth/AuthModal";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-gray-800">PhynTech</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#products" className="text-gray-700 hover:text-green-600 transition-colors">
              Produits
            </a>
            <a href="#compare" className="text-gray-700 hover:text-green-600 transition-colors">
              Comparer
            </a>
            <a href="#recommendations" className="text-gray-700 hover:text-green-600 transition-colors">
              Recommandations IA
            </a>
            
            {user && (
              <Link to="/shop-management" className="text-gray-700 hover:text-green-600 transition-colors flex items-center gap-1">
                <Store className="h-4 w-4" />
                {user.role === 'admin' ? 'Administration' : 'Ma Boutique'}
              </Link>
            )}
            
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-gray-500" />
              <Input 
                placeholder="Rechercher des produits..." 
                className="w-64"
              />
            </div>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {user.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white">
                  <DropdownMenuItem onClick={logout} className="flex items-center gap-2 cursor-pointer">
                    <LogOut className="h-4 w-4" />
                    Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                onClick={() => setShowAuthModal(true)}
                className="bg-green-600 hover:bg-green-700"
              >
                Se connecter
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-green-600"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <a href="#products" className="block px-3 py-2 text-gray-700 hover:text-green-600">
                Produits
              </a>
              <a href="#compare" className="block px-3 py-2 text-gray-700 hover:text-green-600">
                Comparer
              </a>
              <a href="#recommendations" className="block px-3 py-2 text-gray-700 hover:text-green-600">
                Recommandations IA
              </a>
              {user && (
                <Link to="/shop-management" className="block px-3 py-2 text-gray-700 hover:text-green-600">
                  {user.role === 'admin' ? 'Administration' : 'Ma Boutique'}
                </Link>
              )}
              {!user && (
                <button 
                  onClick={() => setShowAuthModal(true)}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-green-600"
                >
                  Se connecter
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </nav>
  );
};
