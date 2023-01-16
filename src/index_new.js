const getUtils = require('./lib/get-utils/index.js');

module.exports = {
  onPostBuild: async ({ constants, utils, inputs } = {}) => {
    // Mock standard plugin functions if running locally
    const { failBuild, show } = getUtils({ utils });

    console.log({ constants, utils, inputs, failBuild, show });
  },
};
