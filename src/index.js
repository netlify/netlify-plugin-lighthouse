require('dotenv').config();
const { join, dirname } = require('path');
const express = require('express');
const compression = require('compression');
const chalk = require('chalk');
const fs = require('fs').promises;
const { getConfiguration } = require('./config');
const { getSettings } = require('./settings');
const { getBrowserPath, runLighthouse } = require('./lighthouse');
const { formatResults } = require('./format');

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
  app.use(express.static(serveDir));

  const port = 5100;
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

const persistResults = async ({ report, path }) => {
  await fs.mkdir(dirname(path), { recursive: true });
  await fs.writeFile(path, report);
};

const getUtils = ({ utils }) => {
  // This function checks to see if we're running within the Netlify Build system,
  // and if so, we use the util functions. If not, we're likely running locally
  // so fall back using console.log to emulate the output.

  // If available, fails the Netlify build with the supplied message
  // https://docs.netlify.com/integrations/build-plugins/create-plugins/#error-reporting
  const failBuild =
    (utils && utils.build && utils.build.failBuild) ||
    ((message, { error } = {}) => {
      console.error(message, error && error.message);
      process.exitCode = 1;
    });

  // If available, displays the summary in the Netlify UI Deploy Summary section
  // https://docs.netlify.com/integrations/build-plugins/create-plugins/#logging
  const show =
    (utils && utils.status && utils.status.show) ||
    (({ summary }) => console.log(summary));

  return { failBuild, show };
};

const runAudit = async ({
  serveDir,
  path = '',
  url,
  thresholds,
  output_path,
  settings,
}) => {
  try {
    console.log('---- RUNNING AUDIT');
    const { server } = getServer({ serveDir: serveDir, auditUrl: url });
    const browserPath = await getBrowserPath();
    console.log('BROWSER PATH', browserPath);
    const { error, results } = await new Promise((resolve) => {
      const instance = server.listen(async () => {
        try {
          const fullPath = path ? `${server.url}/${path}` : server.url;
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
      const { summary, shortSummary, details, report, errors, runtimeError } =
        formatResults({
          results,
          thresholds,
        });

      if (output_path) {
        await persistResults({ report, path: join(serveDir, output_path) });
      }

      return {
        summary,
        shortSummary,
        details,
        report,
        errors,
        runtimeError,
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
  const err = {};
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
    err.message = error.message;
    err.details = error.details;
  }
  const reports = [];
  return {
    error: err,
    summary: data
      .map(
        ({
          path,
          url,
          summary,
          shortSummary,
          details,
          report,
          runtimeError,
        }) => {
          const obj = { report, details };

          if (!runtimeError && summary) {
            obj.summary = summary.reduce((acc, item) => {
              acc[item.id] = Math.round(item.score * 100);
              return acc;
            }, {});
          }

          if (runtimeError) {
            reports.push(obj);
            return `Error testing '${chalk.magenta(path || url)}': ${
              runtimeError.message
            }`;
          }

          if (path) {
            obj.path = path;
            reports.push(obj);
            return `Summary for path '${chalk.magenta(path)}': ${shortSummary}`;
          }
          if (url) {
            obj.url = url;
            reports.push(obj);
            return `Summary for url '${chalk.magenta(url)}': ${shortSummary}`;
          }
          return `${shortSummary}`;
        },
      )
      .join('\n'),
    extraData: reports,
  };
};

module.exports = {
  onPostBuild: async ({ constants, utils, inputs } = {}) => {
    console.log(
      '------------------------------ YOU ARE RUNNING AGAINST 19.1.0 pointing explicitly at cache path',
    );

    const { failBuild, show } = getUtils({ utils });
    let errorMetadata = [];

    try {
      const { audits } = getConfiguration({
        constants,
        inputs,
      });

      const settings = getSettings(inputs?.settings);

      const allErrors = [];
      const data = [];
      for (const { serveDir, path, url, thresholds, output_path } of audits) {
        const { errors, summary, shortSummary, details, report, runtimeError } =
          await runAudit({
            serveDir,
            path,
            url,
            thresholds,
            output_path,
            settings,
          });

        if (summary && !runtimeError) {
          console.log({ results: summary });
        }
        if (runtimeError) {
          console.log({ runtimeError });
        }

        const fullPath = [serveDir, path].join('/');
        if (report) {
          const size = Buffer.byteLength(JSON.stringify(report));
          console.log(
            `Report collected: audited_uri: '${chalk.magenta(
              url || fullPath,
            )}', html_report_size: ${chalk.magenta(
              +(size / 1024).toFixed(2),
            )} KiB`,
          );
        }

        if (Array.isArray(errors) && errors.length > 0) {
          allErrors.push({ serveDir, url, errors });
        }
        data.push({
          path: fullPath,
          url,
          summary,
          shortSummary,
          details,
          report,
          runtimeError,
        });
      }

      const { error, summary, extraData } = processResults({
        data,
        errors: allErrors,
        show,
      });
      errorMetadata.push(...extraData);

      if (error && Object.keys(error).length !== 0) {
        throw error;
      }

      show({ summary, extraData });
    } catch (error) {
      if (error.details) {
        console.error(error.details);
        failBuild(`${chalk.red('Failed with error:\n')}${error.message}`, {
          errorMetadata,
        });
      } else {
        failBuild(`${chalk.red('Failed with error:\n')}`, {
          error,
          errorMetadata,
        });
      }
    }
  },
};
