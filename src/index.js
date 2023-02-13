import chalk from 'chalk';
import * as dotenv from 'dotenv';

import processResults from './lib/process-results/index.js';
import getUtils from './lib/get-utils/index.js';
import getConfiguration from './lib/get-configuration/index.js';
import getSettings from './lib/get-settings/index.js';
import runAudit from './lib/run-audit/index.js';
import runAuditWithServer from './lib/run-audit-with-server/index.js';

dotenv.config();

export const onPostBuild = async ({ constants, utils, inputs } = {}) => {
  const isVerbose = process.env.VERBOSE;

  if (isVerbose) {
    console.log(chalk.cyan.bold('---------------------------------------'));
    console.log(chalk.cyan.bold('Running Lighthouse Plugin (onPostBuild)'));
    console.log(chalk.cyan.bold('---------------------------------------'));
    console.log();
  }

  const { failBuild, show } = getUtils({ utils });

  // If we want to thresholds to block deploys, we run the rest of onPostBuild.
  // Otherwise, we return so reports can bu run during onSuccess.
  if (
    !(inputs?.thresholds_block_deploy || process.env.THRESHOLDS_BLOCK_DEPLOY)
  ) {
    if (isVerbose) {
      console.log(
        chalk.yellow(`thresholds_block_deploy not set – skipping onPostBuild`),
      );
    }
    return show({ summary: 'Lighthouse will run after deploy completes' });
  }

  let errorMetadata = [];

  try {
    const { audits } = getConfiguration({
      constants,
      inputs,
    });

    if (!isVerbose) {
      console.log(
        `Generating Lighthouse report${
          audits.length > 1 ? 's' : ''
        }. This may take a minute…`,
      );
    }

    const settings = getSettings(inputs?.settings);

    const allErrors = [];
    const data = [];
    for (const { serveDir, path, url, thresholds, output_path } of audits) {
      const { errors, summary, shortSummary, details, report, runtimeError } =
        await runAuditWithServer({
          serveDir,
          path,
          url,
          thresholds,
          output_path,
          settings,
        });

      const fullPath = [serveDir, path].join('/');
      if (summary && !runtimeError) {
        // console.log({ results: summary });
        console.log('');
        console.log(chalk.cyan.bold(`Lighthouse scores for ${fullPath}`));
        summary.map((item) => {
          console.log(`- ${item.title}: ${Math.floor(item.score * 100)}`);
        });
        console.log('');
      }

      if (runtimeError) {
        console.log({ runtimeError });
      }

      // if (report) {
      //   const size = Buffer.byteLength(JSON.stringify(report));
      //   console.log(
      //     `Report collected: audited_uri: '${chalk.magenta(
      //       url || fullPath,
      //     )}', html_report_size: ${chalk.magenta(
      //       +(size / 1024).toFixed(2),
      //     )} KiB`,
      //   );
      // }

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

export const onSuccess = async ({ constants, utils, inputs } = {}) => {
  const isVerbose = process.env.VERBOSE;
  const deployUrl = process.env.DEPLOY_URL;

  if (isVerbose) {
    console.log(chalk.cyan.bold('-------------------------------------'));
    console.log(chalk.cyan.bold('Running Lighthouse Plugin (onSuccess)'));
    console.log(chalk.cyan('Deploy URL: ' + deployUrl));
    console.log(chalk.cyan.bold('-------------------------------------'));
    console.log();
  }

  // If we want to thresholds to block deploys, we run don't need to continue.
  // The onPostBuild will have already run, which already generated reports.
  if (inputs?.thresholds_block_deploy || process.env.THRESHOLDS_BLOCK_DEPLOY) {
    if (isVerbose) {
      console.log(
        chalk.yellow(
          '`thresholds_block_deploy` is set, so reports are generated during onPostBuild',
        ),
      );
      console.log(chalk.yellow('Skipping onSuccess'));
    }
    return;
  }

  // If we don't have the deploy URL to test against, we can't run Lighthouse.
  // If running locally, ensure you have a DEPLOY_URL set in your .env file
  // e.g., `DEPLOY_URL=https://www.netlify.com/`
  if (!deployUrl) {
    console.log('DEPLOY_URL not set, skipping Lighthouse Plugin');
    return;
  }

  const { failPlugin, show } = getUtils({ utils });
  let errorMetadata = [];

  const sanitizedInputs = { ...inputs, output_path: undefined };

  try {
    const { audits } = getConfiguration({
      constants,
      inputs: sanitizedInputs,
    });

    if (!isVerbose) {
      console.log(
        `Generating Lighthouse report${
          audits.length > 1 ? 's' : ''
        }. This may take a minute…`,
      );
    }

    const settings = getSettings(inputs?.settings);

    const allErrors = [];
    const data = [];
    for (const { serveDir, path, /* url, */ thresholds } of audits) {
      const { errors, summary, shortSummary, details, report, runtimeError } =
        await runAudit({
          serveDir,
          path,
          url: deployUrl,
          thresholds,
          settings,
        });

      const fullPath = [deployUrl, path].join('/');

      if (summary && !runtimeError) {
        // console.log({ results: summary });

        console.log('');
        console.log(chalk.cyan.bold(`Lighthouse scores for ${fullPath}`));
        summary.map((item) => {
          console.log(`- ${item.title}: ${item.score}`);
        });
        console.log('');
      }

      // if (report) {
      //   const size = Buffer.byteLength(JSON.stringify(report));
      //   console.log(
      //     `Report collected: ${chalk.magenta(+(size / 1024).toFixed(2))} KiB`,
      //   );
      // }

      if (Array.isArray(errors) && errors.length > 0) {
        allErrors.push({ serveDir, url: deployUrl, errors });
      }
      data.push({
        path: fullPath,
        url: deployUrl,
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
