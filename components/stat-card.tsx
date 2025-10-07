import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  variant?: "success" | "warning" | "error" | "info" | "default";
}

export default function StatCard({ title, value, icon: Icon, trend, variant = "default" }: StatCardProps) {
  const variantColors = {
    success: "text-green-500",
    warning: "text-amber-500",
    error: "text-red-500",
    info: "text-blue-500",
    default: "text-muted-foreground"
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-semibold font-mono">{value}</p>
          {trend && (
            <p className="text-xs text-muted-foreground mt-1">{trend}</p>
          )}
        </div>
        <div className={`${variantColors[variant]}`}>
          <Icon className="w-8 h-8" />
        </div>
      </div>
    </Card>
  );
}
