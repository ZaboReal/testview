import { useState, useMemo, useEffect } from "react";
import { TestResults } from "@shared/types";
import FileUploadZone from "@/components/FileUploadZone";
import TestRunHeader from "@/components/TestRunHeader";
import StatsOverview from "@/components/StatsOverview";
import SearchFilter from "@/components/SearchFilter";
import QueryResultCard from "@/components/QueryResultCard";
import ThemeToggle from "@/components/ThemeToggle";

export default function Dashboard() {
  const [testResults, setTestResults] = useState<TestResults | null>(null);

  useEffect(() => {
    fetch('/attached_assets/test_results_20251006_181847_1759798411344.json')
      .then(res => res.json())
      .then(data => setTestResults(data as TestResults))
      .catch(err => console.error('Failed to load test results:', err));
  }, []);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState(["all"]);

  const handleFileSelect = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        setTestResults(data);
      } catch (error) {
        console.error("Failed to parse JSON:", error);
      }
    };
    reader.readAsText(file);
  };

  const handleStatusFilterChange = (status: string) => {
    if (status === "all") {
      setStatusFilter(["all"]);
    } else {
      setStatusFilter(prev => {
        const newFilter = prev.includes(status)
          ? prev.filter(s => s !== status)
          : [...prev.filter(s => s !== "all"), status];
        return newFilter.length === 0 ? ["all"] : newFilter;
      });
    }
  };

  const filteredResults = useMemo(() => {
    if (!testResults?.results) return [];
    
    return testResults.results.filter(result => {
      const matchesSearch = result.query.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter.includes("all") || statusFilter.includes(result.status);
      return matchesSearch && matchesStatus;
    });
  }, [testResults, searchQuery, statusFilter]);

  if (!testResults) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-semibold">Test Results Dashboard</h1>
            <ThemeToggle />
          </div>
          <FileUploadZone onFileSelect={handleFileSelect} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 space-y-8">
        <div className="flex justify-between items-start gap-4">
          <TestRunHeader testRun={testResults.test_run} />
          <ThemeToggle />
        </div>

        <StatsOverview statistics={testResults.statistics} />

        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold">Query Results</h2>
            <span className="text-sm text-muted-foreground" data-testid="text-results-count">
              {filteredResults.length} result{filteredResults.length !== 1 ? 's' : ''}
            </span>
          </div>

          <SearchFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            statusFilter={statusFilter}
            onStatusFilterChange={handleStatusFilterChange}
          />

          <div className="space-y-4">
            {filteredResults.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No results found</p>
              </div>
            ) : (
              filteredResults.map((result, index) => (
                <QueryResultCard 
                  key={`${result.timestamp}-${index}`} 
                  result={result} 
                  index={index}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
