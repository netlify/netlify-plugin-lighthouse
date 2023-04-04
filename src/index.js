import * as dotenv from 'dotenv';

import runEvent from './lib/run-event/index.js';
import getUtils from './lib/get-utils/index.js';

dotenv.config();

export default function lighthousePlugin(inputs) {
  // Run onPostBuild by default, unless RUN_ON_SUCCESS is set to true
  const defaultEvent =
    inputs?.run_on_success === 'true' || process.env.RUN_ON_SUCCESS === 'true'
      ? 'onSuccess'
      : 'onPostBuild';

  if (defaultEvent === 'onSuccess') {
    return {
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
      onPostBuild: async ({ constants, utils, inputs } = {}) => {
        // Mock the required `utils` functions if running locally
        const { failBuild, show } = getUtils({ utils });
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
