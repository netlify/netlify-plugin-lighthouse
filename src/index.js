require('dotenv').config();
const httpServer = require('http-server');
const chalk = require('chalk');
const { getConfiguration } = require('./config');
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

const getUtils = ({ utils }) => {
  const failBuild =
    (utils && utils.build && utils.build.failBuild) ||
    ((message, { error }) => {
      console.error(message, error.message);
      process.exitCode = 1;
    });

  const show =
    (utils && utils.status && utils.status.show) ||
    (({ summary }) => console.log(summary));

  return { failBuild, show };
};

const runAudit = async ({ path, url, thresholds }) => {
  try {
    const { server } = getServer({ serveDir: path, auditUrl: url });
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
      return { error };
    } else {
      const { summary, shortSummary, errors } = formatResults({
        results,
        thresholds,
      });

      return {
        summary,
        shortSummary,
        error: errors.length > 0 ? new Error(`\n${errors.join('\n')}`) : false,
      };
    }
  } catch (error) {
    return { error };
  }
};

const processResults = ({ summaries, errors }) => {
  if (errors.length > 0) {
    return {
      error: new Error(
        errors
          .map(({ path, url, error }) => {
            if (path) {
              return `\n${chalk.red('Error')} for directory '${chalk.magenta(
                path,
              )}': ${error.message}`;
            }
            if (url) {
              return `\n${chalk.red('Error')} for url '${chalk.magenta(
                url,
              )}': ${error.message}`;
            }
            return `\n${error.message}`;
          })
          .join('\n'),
      ),
    };
  } else {
    return {
      summary: summaries
        .map(({ path, url, summary }) => {
          if (path) {
            return `Summary for directory '${chalk.magenta(path)}': ${summary}`;
          }
          if (url) {
            return `Summary for url '${chalk.magenta(url)}': ${summary}`;
          }
          return `${summary}`;
        })
        .join('\n'),
    };
  }
};

module.exports = {
  onSuccess: async ({ constants, utils, inputs } = {}) => {
    const { failBuild, show } = getUtils({ utils });

    try {
      const { audits } = getConfiguration({
        constants,
        inputs,
      });

      const errors = [];
      const summaries = [];
      for (const { path, url, thresholds } of audits) {
        const { error, summary, shortSummary } = await runAudit({
          path,
          url,
          thresholds,
        });
        if (summary) {
          console.log(summary);
        }
        if (error) {
          errors.push({ path, url, error });
        } else {
          summaries.push({ path, url, summary: shortSummary });
        }
      }

      const { error, summary } = processResults({ summaries, errors, show });
      if (error) {
        throw error;
      }
      show({ summary });
    } catch (error) {
      failBuild(chalk.red('Failed with error:\n'), { error });
    }
  },
};
