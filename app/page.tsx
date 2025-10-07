import DashboardClient from "@/components/dashboard-client";
import { loadDefaultTestResults } from "@/lib/data-loader";

export default async function Home() {
  const testResults = await loadDefaultTestResults();
  
  return <DashboardClient initialData={testResults} />;
}
