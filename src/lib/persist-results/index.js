import { dirname } from 'path';
import { mkdir, writeFile } from 'fs/promises';

const persistResults = async ({ report, path }) => {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, report);
};

export default persistResults;
