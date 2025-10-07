import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Clock } from "lucide-react";

interface StatusBadgeProps {
  status: "success" | "timeout" | "error";
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const statusConfig = {
    success: {
      icon: CheckCircle2,
      label: "Success",
      className: "bg-green-500/10 text-green-600 border-green-500/20 hover:bg-green-500/20"
    },
    timeout: {
      icon: Clock,
      label: "Timeout",
      className: "bg-amber-500/10 text-amber-600 border-amber-500/20 hover:bg-amber-500/20"
    },
    error: {
      icon: XCircle,
      label: "Error",
      className: "bg-red-500/10 text-red-600 border-red-500/20 hover:bg-red-500/20"
    }
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge variant="outline" className={config.className}>
      <Icon className="w-3 h-3 mr-1" />
      {config.label}
    </Badge>
  );
}
