import ProductCard from '../ProductCard';

export default function ProductCardExample() {
  const sampleProduct = {
    id: "sample-1",
    name: "Mila Satin Maxi Dress",
    brand: "FFORME",
    retailer: "Moda Operandi",
    brand_retailer: "FFORME",
    price: "$1,895.00 USD",
    url: "https://example.com",
    image_url: "https://cdn.modaoperandi.com/assets/images/products/1042941/689509/small_fforme-red-mila-bias-cut-dress.jpg",
    final_score: 0.9,
    score_percentage: "90%",
    reasoning: "Luxurious option embodying quiet luxury with elegant satin fabric and flowing silhouette.",
    recommendation_confidence: "high",
    key_strengths: ["luxurious satin fabric", "elegant maxi silhouette", "high-quality craftsmanship"],
    important_notes: "Price is high, but quality justifies the investment.",
    sale_indicators: false,
    gender_validated: true,
    score_breakdown: {}
  };

  return (
    <div className="p-6 max-w-4xl">
      <ProductCard product={sampleProduct} />
    </div>
  );
}
