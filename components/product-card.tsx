"use client"

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { Product } from "@/lib/types";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [showReasoning, setShowReasoning] = useState(false);
  
  const scoreValue = Math.round(product.final_score * 100);
  const scoreColor = scoreValue >= 80 ? "text-green-600" : scoreValue >= 60 ? "text-amber-600" : "text-red-600";

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col md:flex-row gap-4 p-4">
        <div className="w-full md:w-32 h-40 md:h-auto flex-shrink-0 relative">
          <Image 
            src={product.image_url} 
            alt={product.name}
            fill
            className="object-cover rounded-md"
            sizes="(max-width: 768px) 100vw, 128px"
          />
        </div>
        
        <div className="flex-1 min-w-0 space-y-3">
          <div>
            <h3 className="font-medium text-base mb-1 line-clamp-2" data-testid={`text-product-name-${product.id}`}>
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground" data-testid={`text-brand-${product.id}`}>
              {String(product.brand || 'Unknown')} · {String(product.retailer || 'Unknown')}
            </p>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-lg font-semibold font-mono" data-testid={`text-price-${product.id}`}>
              {product.price}
            </span>
            <div className="flex items-center gap-2">
              <Progress value={scoreValue} className="w-24 h-2" />
              <span className={`text-sm font-medium ${scoreColor}`} data-testid={`text-score-${product.id}`}>
                {product.score_percentage}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {product.key_strengths.slice(0, 3).map((strength, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs" data-testid={`badge-strength-${product.id}-${idx}`}>
                {strength}
              </Badge>
            ))}
          </div>

          <div className="flex gap-2 pt-2">
            <Button 
              size="sm" 
              variant="outline" 
              asChild
              data-testid={`button-view-product-${product.id}`}
            >
              <a href={product.url} target="_blank" rel="noopener noreferrer">
                View Product <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => setShowReasoning(!showReasoning)}
              data-testid={`button-toggle-reasoning-${product.id}`}
            >
              {showReasoning ? <ChevronUp className="w-4 h-4 mr-1" /> : <ChevronDown className="w-4 h-4 mr-1" />}
              {showReasoning ? "Hide" : "Show"} Details
            </Button>
          </div>

          {showReasoning && (
            <div className="pt-3 border-t space-y-2" data-testid={`div-reasoning-${product.id}`}>
              <p className="text-sm text-foreground">{product.reasoning}</p>
              {product.important_notes && (
                <p className="text-sm text-muted-foreground italic">
                  Note: {product.important_notes}
                </p>
              )}
              <div className="flex gap-2 items-center">
                <span className="text-xs text-muted-foreground">Confidence:</span>
                <Badge variant="outline" className="text-xs capitalize">
                  {product.recommendation_confidence}
                </Badge>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
