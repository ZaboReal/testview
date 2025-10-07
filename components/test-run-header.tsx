import { TestRun } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock } from "lucide-react";

interface TestRunHeaderProps {
  testRun: TestRun;
}

export default function TestRunHeader({ testRun }: TestRunHeaderProps) {
  const startTime = new Date(testRun.start_time).toLocaleString();
  const progressPercentage = Math.round((testRun.queries_completed / testRun.total_queries) * 100);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Test Results Dashboard</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span data-testid="text-start-time">{startTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span data-testid="text-base-url">{testRun.base_url}</span>
            </div>
          </div>
        </div>
        
        {testRun.in_progress ? (
          <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-blue-500/20">
            In Progress
          </Badge>
        ) : (
          <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
            Completed
          </Badge>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Query Progress</span>
          <span className="font-mono" data-testid="text-progress">
            {testRun.queries_completed} / {testRun.total_queries}
          </span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>
    </div>
  );
}
