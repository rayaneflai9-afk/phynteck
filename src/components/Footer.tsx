
import { Leaf, Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-green-500" />
              <span className="text-2xl font-bold">PhynTech</span>
            </div>
            <p className="text-gray-400">
              La plateforme agricole intelligente qui accompagne les agriculteurs algériens 
              vers une agriculture moderne et rentable.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><a href="#products" className="text-gray-400 hover:text-white transition-colors">Produits</a></li>
              <li><a href="#compare" className="text-gray-400 hover:text-white transition-colors">Comparer</a></li>
              <li><a href="#recommendations" className="text-gray-400 hover:text-white transition-colors">Recommandations IA</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">À propos</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Catégories</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Engrais</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Semences</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Phytosanitaire</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Irrigation</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-green-500" />
                <span className="text-gray-400">contact@PhynTech.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-green-500" />
                <span className="text-gray-400">+213 XX XX XX XX</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-green-500" />
                <span className="text-gray-400">Alger, Algérie</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 PhynTech. Tous droits réservés. Plateforme développée pour l'agriculture algérienne.
          </p>
        </div>
      </div>
    </footer>
  );
};
