const desktopConfig = require('lighthouse/lighthouse-core/config/desktop-config');
const fullConfig = require('lighthouse/lighthouse-core/config/full-config');

const getSettings = (inputSettings) => {
  if (!inputSettings) return;

  // Set a base-level config based on the formFactor (mobile/desktop)
  const derivedSettings =
    inputSettings.formFactor === 'desktop' ? desktopConfig : fullConfig;

  if (inputSettings.locale) {
    derivedSettings.settings.locale = inputSettings.locale;
  }
  console.log('Settings specified in netlify.toml: ' + inputSettings);
  console.log('Final derived settings: ' + derivedSettings);

  return derivedSettings;
};

module.exports = {
  getSettings,
};
