import { Card } from "@/components/ui/card";
import { QueryResult } from "@shared/types";
import StatusBadge from "./StatusBadge";
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface QueryResultCardProps {
  result: QueryResult;
  index: number;
}

export default function QueryResultCard({ result, index }: QueryResultCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const productCount = result.response?.products?.length || 0;
  const timestamp = new Date(result.timestamp).toLocaleString();

  return (
    <Card className="overflow-hidden">
      <div className="p-4">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-xs text-muted-foreground font-mono">#{index + 1}</span>
              <StatusBadge status={result.status} />
              <span className="text-xs text-muted-foreground" data-testid={`text-timestamp-${index}`}>
                {timestamp}
              </span>
            </div>
            <h3 className="font-medium text-base mb-1" data-testid={`text-query-${index}`}>
              {result.query}
            </h3>
            <p className="text-sm text-muted-foreground">
              {productCount} product{productCount !== 1 ? 's' : ''} found
            </p>
          </div>
          
          {productCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              data-testid={`button-expand-${index}`}
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="w-4 h-4 mr-1" />
                  Collapse
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4 mr-1" />
                  Expand
                </>
              )}
            </Button>
          )}
        </div>

        {isExpanded && result.response?.products && (
          <div className="pt-4 border-t space-y-3" data-testid={`div-products-${index}`}>
            {result.response.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
