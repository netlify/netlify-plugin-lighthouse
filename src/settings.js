const desktopConfig = require('lighthouse/lighthouse-core/config/desktop-config');
const fullConfig = require('lighthouse/lighthouse-core/config/full-config');

const getSettings = (inputSettings) => {
  if (!inputSettings || Object.keys(inputSettings).length === 0) return;

  // Set a base-level config based on the preset input value
  // (desktop is currently the only supported option)
  const derivedSettings =
    inputSettings.preset === 'desktop' ? desktopConfig : fullConfig;

  // The following are added to the `settings` object of the selected base config

  if (inputSettings.locale) {
    derivedSettings.settings.locale = inputSettings.locale;
  }

  return derivedSettings;
};

module.exports = {
  getSettings,
};
