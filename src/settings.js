const desktopOpts = require('lighthouse/lighthouse-core/config/desktop-config');

const getSettings = (settings) => {
  console.log(111111, { settings });
  if (!settings) return;

  if (settings.formFactor === 'desktop') {
    return desktopOpts;
  }
};

module.exports = {
  getSettings,
};
