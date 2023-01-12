const { dirname } = require('path');
const fs = require('fs').promises;

const persistResults = async ({ report, path }) => {
  await fs.mkdir(dirname(path), { recursive: true });
  await fs.writeFile(path, report);
};

module.exports = persistResults;
