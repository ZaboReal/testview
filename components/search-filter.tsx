"use client"

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SearchFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: string[];
  onStatusFilterChange: (status: string) => void;
}

export default function SearchFilter({ 
  searchQuery, 
  onSearchChange, 
  statusFilter, 
  onStatusFilterChange 
}: SearchFilterProps) {
  const statuses = [
    { value: "all", label: "All" },
    { value: "success", label: "Success" },
    { value: "timeout", label: "Timeout" },
    { value: "error", label: "Error" }
  ];

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search queries..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 pr-9"
          data-testid="input-search"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
            onClick={() => onSearchChange("")}
            data-testid="button-clear-search"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      <div className="flex gap-2 flex-wrap">
        {statuses.map((status) => {
          const isActive = statusFilter.includes(status.value);
          return (
            <Badge
              key={status.value}
              variant={isActive ? "default" : "outline"}
              className="cursor-pointer hover-elevate active-elevate-2"
              onClick={() => onStatusFilterChange(status.value)}
              data-testid={`badge-filter-${status.value}`}
            >
              {status.label}
            </Badge>
          );
        })}
      </div>
    </div>
  );
}
