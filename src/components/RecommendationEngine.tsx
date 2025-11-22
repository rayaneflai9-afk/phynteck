
import { useState } from "react";
import { Brain, Lightbulb, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

const alternativeRecommendations = [
  {
    query: "engrais économique",
    recommendations: [
      {
        name: "Compost Organique Local",
        reason: "Alternative naturelle et économique",
        price: 800,
        benefits: ["Écologique", "Améliore le sol", "Prix abordable"]
      },
      {
        name: "Engrais NPK 12-12-17",
        reason: "Formulation similaire, prix réduit",
        price: 2100,
        benefits: ["Moins cher", "Efficace", "Disponible localement"]
      }
    ]
  },
  {
    query: "protection naturelle",
    recommendations: [
      {
        name: "Huile de Neem",
        reason: "Insecticide biologique efficace",
        price: 450,
        benefits: ["100% naturel", "Sans résidus", "Polyvalent"]
      },
      {
        name: "Savon Insecticide",
        reason: "Solution écologique et sûre",
        price: 280,
        benefits: ["Non toxique", "Biodégradable", "Économique"]
      }
    ]
  }
];

export const RecommendationEngine = () => {
  const [query, setQuery] = useState("");
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    setIsLoading(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const found = alternativeRecommendations.find(rec => 
        rec.query.toLowerCase().includes(query.toLowerCase()) ||
        query.toLowerCase().includes(rec.query.toLowerCase())
      );
      
      if (found) {
        setRecommendations(found.recommendations);
      } else {
        // Default recommendations
        setRecommendations([
          {
            name: "Analyse personnalisée requise",
            reason: "Contactez nos experts pour des recommandations sur mesure",
            price: 0,
            benefits: ["Consultation gratuite", "Conseils personnalisés", "Support technique"]
          }
        ]);
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <section id="recommendations" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
            <Brain className="h-8 w-8 mr-3 text-purple-600" />
            Recommandations Intelligentes
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Décrivez vos besoins et notre IA vous proposera des alternatives adaptées
          </p>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center text-purple-700">
              <Sparkles className="h-5 w-5 mr-2" />
              Assistant IA Agricole
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Que recherchez-vous ?
                </label>
                <Input
                  placeholder="Ex: engrais économique, protection bio, irrigation efficace..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <Button 
                onClick={handleSearch}
                disabled={!query.trim() || isLoading}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                {isLoading ? (
                  "Analyse en cours..."
                ) : (
                  <>
                    <Brain className="h-4 w-4 mr-2" />
                    Obtenir des recommandations IA
                  </>
                )}
              </Button>
            </div>

            {recommendations.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <Lightbulb className="h-5 w-5 mr-2 text-yellow-500" />
                  Recommandations pour "{query}"
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recommendations.map((rec, index) => (
                    <Card key={index} className="border-l-4 border-purple-400">
                      <CardContent className="pt-4">
                        <h4 className="font-semibold text-lg mb-2">{rec.name}</h4>
                        <p className="text-sm text-gray-600 mb-3">{rec.reason}</p>
                        
                        {rec.price > 0 && (
                          <div className="text-green-600 font-bold mb-3">
                            {rec.price.toLocaleString()} DA
                          </div>
                        )}
                        
                        <div className="space-y-2">
                          <h5 className="text-sm font-medium">Avantages:</h5>
                          <div className="flex flex-wrap gap-1">
                            {rec.benefits.map((benefit: string, idx: number) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {benefit}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pre-made queries */}
        <div className="mt-12 text-center">
          <h3 className="text-lg font-semibold mb-4">Recherches populaires:</h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {["engrais économique", "protection naturelle", "irrigation goutte à goutte", "semences résistantes"].map((suggestion) => (
              <Button
                key={suggestion}
                variant="outline"
                size="sm"
                onClick={() => {
                  setQuery(suggestion);
                  handleSearch();
                }}
                className="hover:bg-purple-50"
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
