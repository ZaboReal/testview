import { Statistics } from "@shared/types";
import StatCard from "./StatCard";
import { CheckCircle2, XCircle, Clock, Package } from "lucide-react";

interface StatsOverviewProps {
  statistics: Statistics;
}

export default function StatsOverview({ statistics }: StatsOverviewProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Success Rate"
        value={statistics.success_rate}
        icon={CheckCircle2}
        variant="success"
        trend={`${statistics.successful} successful`}
      />
      <StatCard
        title="Timeouts"
        value={statistics.timeouts}
        icon={Clock}
        variant="warning"
      />
      <StatCard
        title="Errors"
        value={statistics.errors}
        icon={XCircle}
        variant={statistics.errors > 0 ? "error" : "default"}
      />
      <StatCard
        title="Avg Products/Query"
        value={statistics.avg_products_per_query}
        icon={Package}
        variant="info"
        trend={`${statistics.total_products_returned} total`}
      />
    </div>
  );
}
