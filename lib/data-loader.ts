import { TestResults } from './types';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function loadDefaultTestResults(): Promise<TestResults> {
  const filePath = join(process.cwd(), 'public', 'data', 'test_results.json');
  const fileContent = await readFile(filePath, 'utf-8');
  return JSON.parse(fileContent);
}
