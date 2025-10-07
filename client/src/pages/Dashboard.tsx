import { useState, useMemo, useEffect } from "react";
import { TestResults } from "@shared/types";
import FileUploadZone from "@/components/FileUploadZone";
import TestRunHeader from "@/components/TestRunHeader";
import StatsOverview from "@/components/StatsOverview";
import SearchFilter from "@/components/SearchFilter";
import QueryResultCard from "@/components/QueryResultCard";
import ThemeToggle from "@/components/ThemeToggle";
import { loadHardcodedData } from "@/data/testResults";

export default function Dashboard() {
  const [testResults, setTestResults] = useState<TestResults | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load hardcoded data on mount
  useEffect(() => {
    loadHardcodedData()
      .then(data => {
        setTestResults(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Failed to load hardcoded data:', err);
        setIsLoading(false);
      });
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse text-lg text-muted-foreground">Loading test results...</div>
        </div>
      </div>
    );
  }

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
        <div className="flex justify-between items-start gap-4 flex-wrap">
          <TestRunHeader testRun={testResults.test_run} />
          <div className="flex items-center gap-2">
            <button
              onClick={() => document.getElementById('file-upload-input')?.click()}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              data-testid="button-upload-new"
            >
              Upload New File
            </button>
            <input
              id="file-upload-input"
              type="file"
              accept=".json"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileSelect(file);
              }}
            />
            <ThemeToggle />
          </div>
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
