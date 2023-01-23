import { defineConfig } from 'cypress';

import plugin from './cypress/plugins/index.js';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      return plugin(on, config);
    },
  },
});
