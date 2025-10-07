import TestRunHeader from '../TestRunHeader';

export default function TestRunHeaderExample() {
  const sampleTestRun = {
    start_time: "2025-10-06T18:18:47.290439",
    last_updated: "2025-10-06T19:52:29.893368",
    queries_completed: 59,
    total_queries: 100,
    base_url: "http://localhost:8000",
    in_progress: true
  };

  return (
    <div className="p-6">
      <TestRunHeader testRun={sampleTestRun} />
    </div>
  );
}
