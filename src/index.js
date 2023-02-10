import chalk from 'chalk';
import * as dotenv from 'dotenv';

import processResults from './lib/process-results/index.js';
import getUtils from './lib/get-utils/index.js';
import getConfiguration from './lib/get-configuration/index.js';
import getSettings from './lib/get-settings/index.js';
import runAudit from './lib/run-audit/index.js';

dotenv.config();

export const onSuccess = async ({ constants, utils, inputs } = {}) => {
  // Run onSuccess by default, unless we want to block deploys
  if (inputs?.thresholds_block_deploy) {
    return;
  }

  console.log('Running Lighthouse Plugin (onSuccess)', {
    inputs,
    constants,
    utils,
  });

  const { failPlugin, show } = getUtils({ utils });
  let errorMetadata = [];

  const sanitizedInputs = { ...inputs, output_path: undefined };

  try {
    const { audits } = getConfiguration({
      constants,
      inputs: sanitizedInputs,
    });

    const settings = getSettings(inputs?.settings);

    const allErrors = [];
    const data = [];
    for (const { serveDir, path, url, thresholds } of audits) {
      const { errors, summary, shortSummary, details, report, runtimeError } =
        await runAudit({
          serveDir,
          path,
          url,
          thresholds,
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
      failPlugin(`${chalk.red('Failed with error:\n')}${error.message}`, {
        errorMetadata,
      });
    } else {
      failPlugin(`${chalk.red('Failed with error:\n')}`, {
        error,
        errorMetadata,
      });
    }
  }
};

export const onPostBuild = async ({ constants, utils, inputs } = {}) => {
  // If we want to block deploys, we run this instead of onSuccess
  if (!inputs?.thresholds_block_deploy) {
    return;
  }

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
};
