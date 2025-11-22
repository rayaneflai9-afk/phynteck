
import { X, TrendingUp, TrendingDown, DollarSign, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ComparisonToolProps {
  products: any[];
  onClose: () => void;
}

export const ComparisonTool = ({ products, onClose }: ComparisonToolProps) => {
  if (products.length === 0) return null;

  const getAIAnalysis = (products: any[]) => {
    if (products.length === 1) {
      return `Analyse IA: ${products[0].name} est un excellent choix pour sa catégorie avec un bon rapport qualité-prix.`;
    }
    
    const cheapest = products.reduce((prev, curr) => prev.price < curr.price ? prev : curr);
    const highest_rated = products.reduce((prev, curr) => prev.rating > curr.rating ? prev : curr);
    
    return `Analyse IA: ${cheapest.name} offre le meilleur prix (${cheapest.price.toLocaleString()} DA), tandis que ${highest_rated.name} a la meilleure note (${highest_rated.rating}/5). Considérez vos priorités : budget vs qualité.`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Comparaison des Produits</h2>
          <Button variant="ghost" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>

        <div className="p-6">
          {/* AI Analysis */}
          <Card className="mb-6 bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-800 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Analyse Intelligente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-700">{getAIAnalysis(products)}</p>
            </CardContent>
          </Card>

          {/* Products Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="h-full">
                <CardHeader>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-32 object-cover rounded-md mb-3"
                  />
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <Badge variant="secondary">{product.category}</Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Prix:</span>
                    <span className="text-lg font-bold text-green-600">
                      {product.price.toLocaleString()} DA
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Note:</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span>{product.rating}/5 ({product.reviews} avis)</span>
                    </div>
                  </div>

                  {/* Strengths */}
                  <div>
                    <h4 className="text-sm font-semibold text-green-700 mb-2 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      Points forts:
                    </h4>
                    <ul className="text-xs space-y-1">
                      {product.strengths.map((strength: string, index: number) => (
                        <li key={index} className="flex items-center text-green-600">
                          <span className="w-1 h-1 bg-green-600 rounded-full mr-2"></span>
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Weaknesses */}
                  <div>
                    <h4 className="text-sm font-semibold text-red-700 mb-2 flex items-center">
                      <TrendingDown className="h-4 w-4 mr-1" />
                      Points faibles:
                    </h4>
                    <ul className="text-xs space-y-1">
                      {product.weaknesses.map((weakness: string, index: number) => (
                        <li key={index} className="flex items-center text-red-600">
                          <span className="w-1 h-1 bg-red-600 rounded-full mr-2"></span>
                          {weakness}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
