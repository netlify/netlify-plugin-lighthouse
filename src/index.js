import chalk from 'chalk';
import * as dotenv from 'dotenv';

import onEvent from './events/onEvent/index.js';
import getUtils from './lib/get-utils/index.js';
import getConfiguration from './lib/get-configuration/index.js';

dotenv.config();

export default function lighthousePlugin({ constants, utils, inputs } = {}) {
  // Use the availability of the plugin functions to determine if we're running
  // in the Netlify Build system or not
  const isDevelopment = !utils;

  // Mock the `utils` functions if running locally during development
  const { failPlugin, failBuild, show } = getUtils({ utils });

  // Run onPostBuild by default, unless RUN_ON_SUCCESS is set to true
  const defaultEvent =
    inputs?.run_on_success || process.env.RUN_ON_SUCCESS === 'true'
      ? 'onSuccess'
      : 'onPostBuild';

  const deployUrl = process.env.DEPLOY_URL;

  // Generate the config for each report we'll be running.
  // The output differs based on the availability of a Deploy URL
  const { auditConfigs } = getConfiguration({
    constants,
    inputs,
    deployUrl: defaultEvent === 'onSuccess' ? deployUrl : undefined,
  });

  if (isDevelopment) {
    console.log(chalk.gray.bold('\n---------------------------------------'));
    console.log(chalk.gray.bold(`Running Lighthouse Plugin (${defaultEvent})`));
    console.log(chalk.gray.bold('---------------------------------------\n'));
  }

  if (defaultEvent === 'onSuccess') {
    return {
      onSuccess: async () => {
        if (isDevelopment) {
          console.log(chalk.gray('Running onSuccess event\n'));
        }

        // If we don't have the deploy URL to test against, we can't run Lighthouse.
        // If running locally, ensure you have a DEPLOY_URL set in your .env file
        // e.g., `DEPLOY_URL=https://www.netlify.com/`
        const deployUrl = process.env.DEPLOY_URL;
        if (!deployUrl) {
          console.log(
            chalk.red('DEPLOY_URL not available, skipping Lighthouse Plugin'),
          );
          return;
        }
        try {
          const results = await onEvent({
            auditConfigs,
            inputs,
            onFail: failPlugin,
            event: 'onSuccess',
          });

          console.log('Show results: ', results);
          show(results);
        } catch (err) {
          console.log(err);
        }

        if (isDevelopment) {
          console.log(chalk.gray('Completed onSuccess event\n'));
        }
      },
    };
  } else {
    return {
      onPostBuild: async () => {
        if (isDevelopment) {
          console.log(chalk.gray('Running onPostBuild event\n'));
        }
        try {
          const results = await onEvent({
            auditConfigs,
            inputs,
            onFail: failBuild,
            event: 'onPostBuild',
          });

          console.log('Show results: ', results);
          show(results);
        } catch (err) {
          console.log(err);
        }

        if (isDevelopment) {
          console.log(chalk.gray('Completed onPostBuild event\n'));
        }
      },
    };
  }
}
