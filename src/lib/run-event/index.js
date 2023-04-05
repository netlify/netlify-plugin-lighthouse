import chalk from 'chalk';

import getSettings from '../../lib/get-settings/index.js';
import processResults from '../../lib/process-results/index.js';
import runAuditWithUrl from '../../lib/run-audit-with-url/index.js';
import runAuditWithServer from '../../lib/run-audit-with-server/index.js';
import getConfiguration from '../get-configuration/index.js';

import { formatStartMessage } from './helpers.js';

const runEvent = async ({
  event,
  constants,
  inputs,
  onComplete,
  onFail,
} = {}) => {
  const isOnSuccess = event === 'onSuccess';

  const deployUrl = process.env.DEPLOY_URL;

  // If we don't have the deploy URL to test against, we can't run Lighthouse onSuccess.
  // If running locally, ensure you have a DEPLOY_URL set in your .env file
  // e.g., `DEPLOY_URL=https://www.netlify.com/`
  if (isOnSuccess && !deployUrl) {
    console.log(
      chalk.red('DEPLOY_URL not available, skipping Lighthouse Plugin'),
    );
    return;
  }

  // Generate the config for each report we'll be running.
  // For onSuccess, we pass a deployUrl
  // For onPostBuild, we don't pass a deployUrl
  const { auditConfigs } = getConfiguration({
    constants,
    inputs,
    deployUrl: isOnSuccess ? deployUrl : undefined,
  });

  console.log(
    `Generating Lighthouse report${
      auditConfigs.length > 1 ? 's' : ''
    }. This may take a minute…`,
  );

  let errorMetadata = [];

  try {
    const settings = getSettings(inputs?.settings);

    const allErrors = [];
    const data = [];

    let i = 0;
    for (const auditConfig of auditConfigs) {
      i++;

      const { serveDir, path, url, thresholds, output_path } = auditConfig;
      const fullPath = [serveDir, path].join('/');

      const startMessage = formatStartMessage({
        count: { i, total: auditConfigs.length },
        path: fullPath,
        formFactor: settings?.settings.formFactor,
        locale: settings?.settings.locale,
      });

      console.log(startMessage);

      const runner = isOnSuccess ? runAuditWithUrl : runAuditWithServer;
      const { errors, summary, shortSummary, details, report, runtimeError } =
        await runner({
          serveDir,
          path,
          url,
          thresholds,
          output_path,
          settings,
        });

      if (summary && !runtimeError) {
        console.log(chalk.cyan.bold(`Lighthouse scores for ${fullPath}`));
        summary.map((item) => {
          console.log(`- ${item.title}: ${Math.floor(item.score * 100)}`);
        });
      }

      if (runtimeError) {
        console.log(chalk.red.bold(runtimeError.code));
        console.log(chalk.red(runtimeError.message));
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
    });

    errorMetadata.push(...extraData);

    if (error && Object.keys(error).length !== 0) {
      throw error;
    }

    onComplete({ summary, extraData });
  } catch (error) {
    if (error.details) {
      console.error(error.details);
      onFail(`${chalk.red('Failed with error:\n')}${error.message}`, {
        errorMetadata,
      });
    } else {
      onFail(`${chalk.red('Failed with error:\n')}`, {
        error,
        errorMetadata,
      });
    }
  }
};

export default runEvent;
