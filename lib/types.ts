export interface TestRun {
  start_time: string;
  last_updated: string;
  queries_completed: number;
  total_queries: number;
  base_url: string;
  in_progress: boolean;
}

export interface Statistics {
  successful: number;
  errors: number;
  timeouts: number;
  success_rate: string;
  total_products_returned: number;
  avg_products_per_query: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  retailer: string;
  brand_retailer: string;
  price: string;
  url: string;
  image_url: string;
  final_score: number;
  score_percentage: string;
  reasoning: string;
  recommendation_confidence: string;
  key_strengths: string[];
  important_notes: string;
  sale_indicators: boolean;
  gender_validated: boolean;
  score_breakdown: Record<string, unknown>;
}

export interface QueryResponse {
  message: string;
  products: Product[];
  conversation_id: string | null;
  intent: string;
  query: string;
  total_found: number;
  success: boolean;
}

export interface QueryResult {
  query: string;
  status: "success" | "timeout" | "error";
  response?: QueryResponse;
  timestamp: string;
}

export interface TestResults {
  test_run: TestRun;
  statistics: Statistics;
  results: QueryResult[];
}
