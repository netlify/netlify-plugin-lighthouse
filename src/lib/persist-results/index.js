import { dirname } from 'path';
import { mkdir, writeFile } from 'fs/promises';

const persistResults = async ({ report, path }) => {
  console.log('Attempting to persist report to:', path);
  console.log('Report directory:', dirname(path));
  
  try {
    await mkdir(dirname(path), { recursive: true });
    await writeFile(path, report);
    console.log('Successfully wrote report to:', path);
  } catch (error) {
    console.error('Failed to persist report:', error);
    throw error; // Re-throw to maintain existing error handling
  }
};

export default persistResults;
