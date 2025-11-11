import { existsSync } from 'fs';
import { homedir } from 'os';
import { join } from 'path';

import * as dotenv from 'dotenv';

import runEvent from './lib/run-event/index.js';
import getUtils from './lib/get-utils/index.js';

dotenv.config();

const puppeteerCacheDir = join(homedir(), '.cache', 'puppeteer');

const restorePuppeteerCache = async ({ utils } = {}) => {
  console.log('Restoring Lighthouse cache...');
  // Puppeteer relies on a global cache since v19.x, which otherwise would not be persisted in Netlify builds
  // Note: We use system Chrome now (skipDownload: true), so this cache may be empty
  await utils?.cache.restore(puppeteerCacheDir);
  console.log('Lighthouse cache restored');
};

const persistPuppeteerCache = async ({ utils } = {}) => {
  console.log('Persisting Lighthouse cache...');
  // Only cache if the directory exists and is not empty
  // Since we use system Chrome (skipDownload: true), this may not exist
  if (existsSync(puppeteerCacheDir)) {
    try {
      await utils?.cache.save(puppeteerCacheDir);
      console.log('Lighthouse cache persisted');
    } catch (error) {
      // Non-critical error - cache persistence failed but build can continue
      console.log('Note: Lighthouse cache persistence skipped');
    }
  } else {
    console.log('Note: Lighthouse cache not found (using system Chrome)');
  }
};

export default function lighthousePlugin(inputs) {
  // Run onSuccess by default, unless inputs specify we should fail_deploy_on_score_thresholds
  const defaultEvent =
    inputs?.fail_deploy_on_score_thresholds === 'true'
      ? 'onPostBuild'
      : 'onSuccess';

  if (defaultEvent === 'onSuccess') {
    return {
      onSuccess: async ({ constants, utils, inputs } = {}) => {
        await restorePuppeteerCache({ utils });
        // Mock the required `utils` functions if running locally
        const { failPlugin, show } = getUtils({ utils });

        await runEvent({
          event: 'onSuccess',
          constants,
          inputs,
          onComplete: show,
          onFail: failPlugin,
        });
        await persistPuppeteerCache({ utils });
      },
    };
  } else {
    return {
      onPostBuild: async ({ constants, utils, inputs } = {}) => {
        await restorePuppeteerCache({ utils });
        // Mock the required `utils` functions if running locally
        const { failBuild, show } = getUtils({ utils });

        await runEvent({
          event: 'onPostBuild',
          constants,
          inputs,
          onComplete: show,
          onFail: failBuild,
        });
        await persistPuppeteerCache({ utils });
      },
    };
  }
}
