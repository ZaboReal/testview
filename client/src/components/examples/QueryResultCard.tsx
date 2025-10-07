import QueryResultCard from '../QueryResultCard';

export default function QueryResultCardExample() {
  const sampleResult = {
    query: "show me Quiet luxury dress under $300",
    status: "success" as const,
    timestamp: "2025-10-06T18:20:10.397730",
    response: {
      message: "Found 2 products",
      products: [
        {
          id: "1",
          name: "Elegant Maxi Dress",
          brand: "Designer Brand",
          retailer: "Fashion Store",
          brand_retailer: "Designer Brand",
          price: "$250.00 USD",
          url: "https://example.com",
          image_url: "https://cdn.modaoperandi.com/assets/images/products/1042941/689509/small_fforme-red-mila-bias-cut-dress.jpg",
          final_score: 0.85,
          score_percentage: "85%",
          reasoning: "Great fit for your requirements",
          recommendation_confidence: "high",
          key_strengths: ["elegant design", "good price"],
          important_notes: "Limited stock",
          sale_indicators: false,
          gender_validated: true,
          score_breakdown: {}
        }
      ],
      conversation_id: null,
      intent: "search",
      query: "Quiet luxury dress",
      total_found: 2,
      success: true
    }
  };

  return (
    <div className="p-6 max-w-4xl">
      <QueryResultCard result={sampleResult} index={0} />
    </div>
  );
}
