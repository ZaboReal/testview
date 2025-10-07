import StatsOverview from '../StatsOverview';

export default function StatsOverviewExample() {
  const sampleStats = {
    successful: 49,
    errors: 0,
    timeouts: 10,
    success_rate: "83.1%",
    total_products_returned: 239,
    avg_products_per_query: "4.9"
  };

  return (
    <div className="p-6">
      <StatsOverview statistics={sampleStats} />
    </div>
  );
}
