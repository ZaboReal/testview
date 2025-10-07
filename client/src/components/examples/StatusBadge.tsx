import StatusBadge from '../StatusBadge';

export default function StatusBadgeExample() {
  return (
    <div className="p-6 flex gap-2">
      <StatusBadge status="success" />
      <StatusBadge status="timeout" />
      <StatusBadge status="error" />
    </div>
  );
}
