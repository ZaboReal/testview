"use client"

import { useState, useMemo } from "react";
import { TestResults } from "@/lib/types";
import TestRunHeader from "./test-run-header";
import StatsOverview from "./stats-overview";
import SearchFilter from "./search-filter";
import QueryResultCard from "./query-result-card";
import ThemeToggle from "./theme-toggle";

interface DashboardClientProps {
  initialData: TestResults;
}

export default function DashboardClient({ initialData }: DashboardClientProps) {
  const [testResults, setTestResults] = useState<TestResults>(initialData);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState(["all"]);

  const handleFileSelect = async (file: File) => {
    try {
      const text = await file.text();
      const data = JSON.parse(text) as TestResults;
      setTestResults(data);
    } catch (error) {
      console.error('Failed to parse uploaded file:', error);
      alert('Failed to parse the uploaded JSON file. Please check the file format.');
    }
  };

  const handleStatusFilterChange = (status: string) => {
    if (status === "all") {
      setStatusFilter(["all"]);
    } else {
      setStatusFilter((prev) => {
        const newFilter = prev.includes(status)
          ? prev.filter((s) => s !== status)
          : [...prev.filter((s) => s !== "all"), status];
        return newFilter.length === 0 ? ["all"] : newFilter;
      });
    }
  };

  const filteredResults = useMemo(() => {
    return testResults.results.filter((result) => {
      const matchesSearch = result.query.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter.includes("all") || statusFilter.includes(result.status);
      return matchesSearch && matchesStatus;
    });
  }, [testResults, searchQuery, statusFilter]);

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
            <span className="text-sm text-muted-foreground" data-testid="text-result-count">
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
            {filteredResults.map((result, index) => (
              <QueryResultCard key={index} result={result} index={index} />
            ))}

            {filteredResults.length === 0 && (
              <div className="text-center py-12 text-muted-foreground" data-testid="text-no-results">
                No results found matching your filters
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
