import { join } from 'path';
import { homedir } from 'os';

import * as dotenv from 'dotenv';

import runEvent from './lib/run-event/index.js';
import getUtils from './lib/get-utils/index.js';

dotenv.config();

const puppeteerCacheDir = join(homedir(), '.cache', 'puppeteer');

const onPreBuild = async ({ utils } = {}) => {
  console.log('Restoring Lighthouse cache...');
  // Puppeteer relies on a global cache since v19.x, which otherwise would not be persisted in Netlify builds
  await utils?.cache.restore(puppeteerCacheDir);
  console.log('Lighthouse cache restored');
};

const persistCache = async ({ utils } = {}) => {
  console.log('Persisting Lighthouse cache...');
  await utils?.cache.save(puppeteerCacheDir);
  console.log('Lighthouse cache persisted');
};

export default function lighthousePlugin(inputs) {
  // Run onSuccess by default, unless inputs specify we should fail_deploy_on_score_thresholds
  const defaultEvent =
    inputs?.fail_deploy_on_score_thresholds === 'true'
      ? 'onPostBuild'
      : 'onSuccess';

  if (defaultEvent === 'onSuccess') {
    return {
      onPreBuild,
      onPostBuild: ({ utils }) => persistCache({ utils }),
      onSuccess: async ({ constants, utils, inputs } = {}) => {
        // Mock the required `utils` functions if running locally
        const { failPlugin, show } = getUtils({ utils });

        await runEvent({
          event: 'onSuccess',
          constants,
          inputs,
          onComplete: show,
          onFail: failPlugin,
        });
      },
    };
  } else {
    return {
      onPreBuild,
      onPostBuild: async ({ constants, utils, inputs } = {}) => {
        // Mock the required `utils` functions if running locally
        const { failBuild, show } = getUtils({ utils });

        await persistCache({ utils });
        await runEvent({
          event: 'onPostBuild',
          constants,
          inputs,
          onComplete: show,
          onFail: failBuild,
        });
      },
    };
  }
}
