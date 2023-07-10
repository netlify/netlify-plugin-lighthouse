import * as dotenv from 'dotenv';

import runEvent from './lib/run-event/index.js';
import getUtils from './lib/get-utils/index.js';

dotenv.config();

export default function lighthousePlugin(inputs) {

  // Run onSuccess by default, unless inputs specify we should block_deploy_on_failed_threshold
  const defaultEvent =
    inputs?.block_deploy_on_failed_threshold === 'true' 
      ? 'onPostBuild'
      : 'onSuccess';


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
