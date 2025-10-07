import { TestResults } from './types';

export async function loadDefaultTestResults(): Promise<TestResults> {
  const response = await fetch('/data/test_results.json', { cache: 'no-store' });
  if (!response.ok) {
    throw new Error('Failed to load test results');
  }
  return response.json();
}
