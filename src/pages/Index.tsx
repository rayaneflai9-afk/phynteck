
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProductCatalog } from "@/components/ProductCatalog";
import { ComparisonTool } from "@/components/ComparisonTool";
import { RecommendationEngine } from "@/components/RecommendationEngine";
import { Footer } from "@/components/Footer";

const Index = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showComparison, setShowComparison] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <Navbar />
      <Hero />
      <ProductCatalog 
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
        onCompare={() => setShowComparison(true)}
      />
      {showComparison && (
        <ComparisonTool 
          products={selectedProducts}
          onClose={() => setShowComparison(false)}
        />
      )}
      <RecommendationEngine />
      <Footer />
    </div>
  );
};

export default Index;
