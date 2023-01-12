const chalk = require('chalk');
const { join } = require('path');

const getServePath = (dir, subDir) => {
  if (typeof subDir !== 'string' || typeof dir !== 'string') {
    return { serveDir: undefined };
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

  return { serveDir: resolvedPath };
};

module.exports = getServePath;
