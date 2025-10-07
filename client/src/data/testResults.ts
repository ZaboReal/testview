import { TestResults } from "@shared/types";

export async function loadHardcodedData(): Promise<TestResults> {
  const response = await fetch('/attached_assets/test_results_20251006_211851_1759808620219.json');
  return response.json();
}
