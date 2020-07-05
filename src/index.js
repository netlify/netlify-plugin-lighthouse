require('dotenv').config();
const httpServer = require('http-server');
const chalk = require('chalk');
const { getBrowserPath, runLighthouse } = require('./lighthouse');

const getServer = ({ serveDir, auditUrl }) => {
  if (auditUrl) {
    // return a mock server for readability
    const server = {
      listen: async (func) => {
        console.log(`Scanning url ${chalk.magenta(auditUrl)}`);
        await func();
      },
      close: () => undefined,
      url: auditUrl,
    };
    return { server };
  }

  if (!serveDir) {
    throw new Error('Empty publish dir');
  }

  const s = httpServer.createServer({ root: serveDir });
  const port = 5000;
  const host = 'localhost';
  const server = {
    listen: (func) => {
      console.log(
        `Serving and scanning site from directory ${chalk.magenta(serveDir)}`,
      );
      return s.listen(port, host, func);
    },
    close: () => s.close(),
    url: `http://${host}:${port}`,
  };
  return { server };
};

const belowThreshold = (id, expected, categories) => {
  const category = categories.find((c) => c.id === id);
  if (!category) {
    console.warn(`Could not find category ${chalk.yellow(id)}`);
  }
  const actual = category ? category.score : Number.MAX_SAFE_INTEGER;
  return actual < expected;
};

const getError = (id, expected, results) => {
  const category = results.find((c) => c.id === id);
  return `Expected category ${chalk.magenta(
    category.title,
  )} to be greater or equal to ${chalk.green(expected)} but got ${chalk.red(
    category.score !== null ? category.score : 'unknown',
  )}`;
};

const formatResults = ({ results, thresholds }) => {
  const categories = Object.values(
    results.lhr.categories,
  ).map(({ title, score, id }) => ({ title, score, id }));

  const categoriesBelowThreshold = Object.entries(
    thresholds,
  ).filter(([id, expected]) => belowThreshold(id, expected, categories));

  const errors = categoriesBelowThreshold.map(([id, expected]) =>
    getError(id, expected, categories),
  );

  const summary = {
    results: categories.map((cat) => ({
      ...cat,
      ...(thresholds[cat.id] ? { threshold: thresholds[cat.id] } : {}),
    })),
  };

  const shortSummary = categories
    .map(({ title, score }) => `${title}: ${score * 100}`)
    .join(', ');

  return { summary, shortSummary, errors };
};

const getConfiguration = ({ constants, inputs }) => {
  const serveDir =
    (constants && constants.PUBLISH_DIR) || process.env.PUBLISH_DIR;
  const auditUrl = (inputs && inputs.audit_url) || process.env.AUDIT_URL;
  let thresholds =
    (inputs && inputs.thresholds) || process.env.THRESHOLDS || {};
  if (typeof thresholds === 'string') {
    thresholds = JSON.parse(thresholds);
  }

  return { serveDir, auditUrl, thresholds };
};

const getUtils = ({ utils }) => {
  const failBuild =
    (utils && utils.build && utils.build.failBuild) ||
    (() => {
      process.exitCode = 1;
    });

  const show =
    (utils && utils.status && utils.status.show) || (() => undefined);

  return { failBuild, show };
};

module.exports = {
  onSuccess: async ({ constants, utils, inputs } = {}) => {
    const { failBuild, show } = getUtils({ utils });

    try {
      const { serveDir, auditUrl, thresholds } = getConfiguration({
        constants,
        inputs,
      });

      const { server } = getServer({ serveDir, auditUrl });

      const browserPath = await getBrowserPath();

      const { error, results } = await new Promise((resolve) => {
        server.listen(async () => {
          try {
            const results = await runLighthouse(browserPath, server.url);
            resolve({ error: false, results });
          } catch (error) {
            resolve({ error });
          } finally {
            server.close();
          }
        });
      });

      if (error) {
        throw error;
      } else {
        const { summary, shortSummary, errors } = formatResults({
          results,
          thresholds,
        });
        console.log(summary);
        show({ summary: shortSummary });

        if (errors.length > 0) {
          throw new Error(`\n${errors.join('\n')}`);
        }
      }
    } catch (error) {
      console.error(`\nError: ${error.message}\n`);
      failBuild(`Failed with error: ${error.message}`, { error });
    }
  },
};
