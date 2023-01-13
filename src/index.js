import chalk from 'chalk';
import processResults from './lib/process-results';
import getUtils from './lib/get-utils';
import getConfiguration from './lib/get-configuration';
import getSettings from './lib/get-settings';

import * as dotenv from 'dotenv';
import runAudit from './lib/run-audit';
dotenv.config();

export const onPostBuild = async ({ constants, utils, inputs } = {}) => {
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
