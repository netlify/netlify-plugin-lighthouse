require('dotenv').config();
const { join, dirname } = require('path');
const express = require('express');
const compression = require('compression');
const chalk = require('chalk');
const fs = require('fs').promises;
const minify = require('html-minifier').minify;
const { getConfiguration } = require('./config');
const { getSettings } = require('./settings');
const { getBrowserPath, runLighthouse } = require('./lighthouse');
const { makeReplacements } = require('./replacements');

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

  const app = express();
  app.use(compression());
  app.use(
    express.static(serveDir),
    express.static(`${serveDir}/static/css`),
    express.static(`${serveDir}/static/js`),
  );

  const port = 5000;
  const host = 'localhost';
  const server = {
    listen: (func) => {
      console.log(
        `Serving and scanning site from directory ${chalk.magenta(serveDir)}`,
      );
      return app.listen(port, host, func);
    },
    close: (instance) => instance.close(),
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

const getError = (id, expected, categories, audits) => {
  const category = categories.find((c) => c.id === id);

  const categoryError = `Expected category ${chalk.cyan(
    category.title,
  )} to be greater or equal to ${chalk.green(expected)} but got ${chalk.red(
    category.score !== null ? category.score : 'unknown',
  )}`;

  const categoryAudits = category.auditRefs
    .filter(({ weight, id }) => weight > 0 && audits[id].score < 1)
    .map((ref) => {
      const audit = audits[ref.id];
      return `   '${chalk.cyan(
        audit.title,
      )}' received a score of ${chalk.yellow(audit.score)}`;
    })
    .join('\n');

  return { message: categoryError, details: categoryAudits };
};

const formatResults = ({ results, thresholds }) => {
  const categories = Object.values(results.lhr.categories).map(
    ({ title, score, id, auditRefs }) => ({ title, score, id, auditRefs }),
  );

  const categoriesBelowThreshold = Object.entries(thresholds).filter(
    ([id, expected]) => belowThreshold(id, expected, categories),
  );

  const errors = categoriesBelowThreshold.map(([id, expected]) =>
    getError(id, expected, categories, results.lhr.audits),
  );

  const summary = categories.map(({ title, score, id }) => ({
    title,
    score,
    id,
    ...(thresholds[id] ? { threshold: thresholds[id] } : {}),
  }));

  const shortSummary = categories
    .map(({ title, score }) => `${title}: ${Math.round(score * 100)}`)
    .join(', ');

  const formattedReport = makeReplacements(results.report);

  // Pull some additional details to pass to App
  const { formFactor, locale } = results.lhr.configSettings;
  const installable =
    results.lhr.audits['installable-manifest'].score === 1 &&
    results.lhr.audits['service-worker'].score === 1;
  const details = { installable, formFactor, locale };

  const report = minify(formattedReport, {
    removeAttributeQuotes: true,
    collapseWhitespace: true,
    removeRedundantAttributes: true,
    removeOptionalTags: true,
    removeEmptyElements: true,
    minifyCSS: true,
    minifyJS: true,
  });

  return { summary, shortSummary, details, report, errors };
};

const persistResults = async ({ report, path }) => {
  await fs.mkdir(dirname(path), { recursive: true });
  await fs.writeFile(path, report);
};

const getUtils = ({ utils }) => {
  const failBuild =
    (utils && utils.build && utils.build.failBuild) ||
    ((message, { error } = {}) => {
      console.error(message, error && error.message);
      process.exitCode = 1;
    });

  const show =
    (utils && utils.status && utils.status.show) ||
    (({ summary }) => console.log(summary));

  return { failBuild, show };
};

const runAudit = async ({
  path,
  fileName = '',
  url,
  thresholds,
  output_path,
  settings,
}) => {
  try {
    const { server } = getServer({ serveDir: path, auditUrl: url });
    const browserPath = await getBrowserPath();
    const { error, results } = await new Promise((resolve) => {
      const instance = server.listen(async () => {
        try {
          const fullPath = fileName ? `${server.url}/${fileName}` : server.url;
          const results = await runLighthouse(browserPath, fullPath, settings);
          resolve({ error: false, results });
        } catch (error) {
          resolve({ error });
        } finally {
          server.close(instance);
        }
      });
    });

    if (error) {
      return { error };
    } else {
      const { summary, shortSummary, details, report, errors } = formatResults({
        results,
        thresholds,
      });

      if (output_path) {
        await persistResults({ report, path: join(path, output_path) });
      }

      return {
        summary,
        shortSummary,
        details,
        report,
        errors,
      };
    }
  } catch (error) {
    return { error };
  }
};

const prefixString = ({ path, url, str }) => {
  if (path) {
    return `\n${chalk.red('Error')} for directory '${chalk.cyan(
      path,
    )}':\n${str}`;
  } else if (url) {
    return `\n${chalk.red('Error')} for url '${chalk.cyan(url)}':\n${str}`;
  } else {
    return `\n${str}`;
  }
};

const processResults = ({ data, errors }) => {
  if (errors.length > 0) {
    const error = errors.reduce(
      (acc, { path, url, errors }) => {
        const message = prefixString({
          path,
          url,
          str: errors.map((e) => e.message).join('\n'),
        });
        const details = prefixString({
          path,
          url,
          str: errors.map((e) => `${e.message}\n${e.details}`).join('\n'),
        });

        return {
          message: `${acc.message}\n${message}`,
          details: `${acc.details}\n${details}`,
        };
      },
      {
        message: '',
        details: '',
      },
    );
    return {
      error,
    };
  } else {
    const reports = [];
    return {
      summary: data
        .map(({ path, url, summary, shortSummary, details, report }) => {
          const obj = { report, details };

          if (summary) {
            obj.summary = summary.reduce((acc, item) => {
              acc[item.id] = Math.round(item.score * 100);
              return acc;
            }, {});
          }

          if (path) {
            obj.path = path;
            reports.push(obj);
            return `Summary for directory '${chalk.magenta(
              path,
            )}': ${shortSummary}`;
          }
          if (url) {
            obj.url = url;
            reports.push(obj);
            return `Summary for url '${chalk.magenta(url)}': ${shortSummary}`;
          }
          return `${shortSummary}`;
        })
        .join('\n'),
      extraData: reports,
    };
  }
};

module.exports = {
  onPostBuild: async ({ constants, utils, inputs } = {}) => {
    const { failBuild, show } = getUtils({ utils });

    try {
      const { audits } = getConfiguration({
        constants,
        inputs,
      });

      const settings = getSettings(inputs?.settings);

      const allErrors = [];
      const data = [];
      for (const { path, fileName, url, thresholds, output_path } of audits) {
        const { errors, summary, shortSummary, details, report } =
          await runAudit({
            path,
            fileName,
            url,
            thresholds,
            output_path,
            settings,
          });
        if (summary) {
          console.log({ results: summary });
        }

        if (report) {
          const size = Buffer.byteLength(JSON.stringify(report));
          console.log(
            `Report collected: audited_uri: '${chalk.magenta(
              url || path,
            )}', html_report_size: ${chalk.magenta(size / 1024)} KiB`,
          );
        }

        if (Array.isArray(errors) && errors.length > 0) {
          allErrors.push({ path, url, errors });
        } else {
          data.push({
            path,
            url,
            summary,
            shortSummary,
            details,
            report,
          });
        }
      }

      const { error, summary, extraData } = processResults({
        data,
        errors: allErrors,
        show,
      });

      if (error) {
        throw error;
      }

      show({ summary, extraData });
    } catch (error) {
      if (error.details) {
        console.error(error.details);
        failBuild(`${chalk.red('Failed with error:\n')}${error.message}`);
      } else {
        failBuild(`${chalk.red('Failed with error:\n')}`, { error });
      }
    }
  },
};
