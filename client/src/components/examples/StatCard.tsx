import StatCard from '../StatCard';
import { CheckCircle2 } from 'lucide-react';

export default function StatCardExample() {
  return (
    <div className="p-6 max-w-sm">
      <StatCard 
        title="Success Rate" 
        value="83.1%" 
        icon={CheckCircle2}
        variant="success"
      />
    </div>
  );
}
