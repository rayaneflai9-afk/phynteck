
import { useState } from "react";
import { Star, Plus, Check, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

const sampleProducts = [
  {
    id: 1,
    name: "Engrais NPK 15-15-15",
    category: "Engrais",
    price: 2500,
    rating: 4.5,
    reviews: 128,
    image: "/placeholder.svg",
    description: "Engrais équilibré pour tous types de cultures",
    strengths: ["Équilibré", "Polyvalent", "Résultats rapides"],
    weaknesses: ["Prix élevé", "Nécessite stockage sec"]
  },
  {
    id: 2,
    name: "Semences Blé Dur Vitron",
    category: "Semences",
    price: 180,
    rating: 4.8,
    reviews: 89,
    image: "/placeholder.svg",
    description: "Variété résistante à la sécheresse",
    strengths: ["Résistant", "Haut rendement", "Adapté au climat"],
    weaknesses: ["Cycle long", "Sensible aux maladies fongiques"]
  },
  {
    id: 3,
    name: "Insecticide Cypermétrine",
    category: "Phytosanitaire",
    price: 950,
    rating: 4.2,
    reviews: 67,
    image: "/placeholder.svg",
    description: "Protection efficace contre les insectes",
    strengths: ["Efficace", "Action rapide", "Large spectre"],
    weaknesses: ["Toxique", "Résistance possible"]
  },
  {
    id: 4,
    name: "Irrigation Goutte-à-Goutte Kit",
    category: "Irrigation",
    price: 4200,
    rating: 4.6,
    reviews: 156,
    image: "/placeholder.svg",
    description: "Système d'irrigation économique",
    strengths: ["Économie d'eau", "Installation facile", "Durabilité"],
    weaknesses: ["Investissement initial", "Maintenance requise"]
  }
];

interface ProductCatalogProps {
  selectedProducts: any[];
  setSelectedProducts: (products: any[]) => void;
  onCompare: () => void;
}

export const ProductCatalog = ({ selectedProducts, setSelectedProducts, onCompare }: ProductCatalogProps) => {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  
  const categories = ["Tous", "Engrais", "Semences", "Phytosanitaire", "Irrigation"];

  const handleProductSelect = (product: any) => {
    const isSelected = selectedProducts.find(p => p.id === product.id);
    if (isSelected) {
      setSelectedProducts(selectedProducts.filter(p => p.id !== product.id));
    } else if (selectedProducts.length < 3) {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const filteredProducts = selectedCategory === "Tous" 
    ? sampleProducts 
    : sampleProducts.filter(p => p.category === selectedCategory);

  return (
    <section id="products" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Catalogue des Produits Agricoles
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez notre large gamme de produits agricoles avec des analyses détaillées
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? "bg-green-600 hover:bg-green-700" : ""}
            >
              <Filter className="h-4 w-4 mr-2" />
              {category}
            </Button>
          ))}
        </div>

        {/* Compare Button */}
        {selectedProducts.length > 0 && (
          <div className="text-center mb-8">
            <Button 
              onClick={onCompare}
              className="bg-blue-600 hover:bg-blue-700"
              size="lg"
            >
              Comparer {selectedProducts.length} produit{selectedProducts.length > 1 ? 's' : ''}
            </Button>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const isSelected = selectedProducts.find(p => p.id === product.id);
            return (
              <Card key={product.id} className={`relative transition-all hover:shadow-lg ${isSelected ? 'ring-2 ring-blue-500' : ''}`}>
                <CardHeader className="pb-3">
                  <div className="absolute top-2 right-2">
                    <Checkbox
                      checked={!!isSelected}
                      onCheckedChange={() => handleProductSelect(product)}
                      disabled={!isSelected && selectedProducts.length >= 3}
                    />
                  </div>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-32 object-cover rounded-md mb-3"
                  />
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <Badge variant="secondary">{product.category}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                  
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      {product.rating} ({product.reviews} avis)
                    </span>
                  </div>

                  <div className="text-xl font-bold text-green-600 mb-3">
                    {product.price.toLocaleString()} DA
                  </div>

                  <div className="space-y-2">
                    <div>
                      <h4 className="text-sm font-semibold text-green-700">Points forts:</h4>
                      <p className="text-xs text-gray-600">{product.strengths.join(', ')}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-red-700">Points faibles:</h4>
                      <p className="text-xs text-gray-600">{product.weaknesses.join(', ')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
