import chalk from 'chalk';
import * as dotenv from 'dotenv';

import onEvent from './events/onEvent/index.js';
import getUtils from './lib/get-utils/index.js';
import getConfiguration from './lib/get-configuration/index.js';

dotenv.config();

export default function lighthousePlugin(inputs) {
  // Run onPostBuild by default, unless RUN_ON_SUCCESS is set to true
  const defaultEvent =
    inputs?.run_on_success || process.env.RUN_ON_SUCCESS === 'true'
      ? 'onSuccess'
      : 'onPostBuild';

  if (defaultEvent === 'onSuccess') {
    return {
      onSuccess: async ({ constants, utils, inputs } = {}) => {
        // Use the availability of the plugin functions to determine if we're running
        // in the Netlify Build system or not
        const isDevelopment = !utils;

        // Mock the `utils` functions if running locally during development
        const { failPlugin, show } = getUtils({ utils });

        // Generate the config for each report we'll be running.
        // For onSuccess, we pass a deployUrl
        const { auditConfigs } = getConfiguration({
          constants,
          inputs,
          deployUrl: process.env.DEPLOY_URL,
        });

        if (isDevelopment) {
          console.log(
            chalk.gray.bold('\n---------------------------------------'),
          );
          console.log(
            chalk.gray.bold(`Running Lighthouse Plugin (${defaultEvent})`),
          );
          console.log(
            chalk.gray.bold('---------------------------------------\n'),
          );
        }

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
      onPostBuild: async ({ constants, utils, inputs } = {}) => {
        // Use the availability of the plugin functions to determine if we're running
        // in the Netlify Build system or not
        const isDevelopment = !utils;

        // Mock the `utils` functions if running locally during development
        const { failBuild, show } = getUtils({ utils });

        // Generate the config for each report we'll be running.
        // For onPostBuild, we don't pass a deployUrl
        const { auditConfigs } = getConfiguration({
          constants,
          inputs,
        });

        if (isDevelopment) {
          console.log(
            chalk.gray.bold('\n---------------------------------------'),
          );
          console.log(
            chalk.gray.bold(`Running Lighthouse Plugin (${defaultEvent})`),
          );
          console.log(
            chalk.gray.bold('---------------------------------------\n'),
          );
        }

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
