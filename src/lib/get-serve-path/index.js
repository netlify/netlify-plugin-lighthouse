import { join } from 'path';

import chalk from 'chalk';

const getServePath = (dir, subDir) => {
  if (typeof subDir !== 'string' || typeof dir !== 'string') {
    return undefined;
  }

  const resolvedPath = join(dir, subDir);
  if (!resolvedPath.startsWith(dir)) {
    throw new Error(
      chalk.red(
        `resolved path for ${chalk.red(
          subDir,
        )} is outside publish directory ${chalk.red(dir)}`,
      ),
    );
  }

  return resolvedPath;
};

export default getServePath;
