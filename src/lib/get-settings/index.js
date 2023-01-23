import desktopConfig from 'lighthouse/lighthouse-core/config/desktop-config.js';
import fullConfig from 'lighthouse/lighthouse-core/config/full-config.js';

/*
 * Check for settings added in `.env` file and merge with input settings
 * specified in `netlify.toml`
 */
const mergeSettingsSources = (inputSettings = {}) => {
  let envSettings = {};
  if (typeof process.env.SETTINGS === 'string') {
    try {
      envSettings = JSON.parse(process.env.SETTINGS);
    } catch (e) {
      throw new Error(`Invalid JSON for 'settings' input: ${e.message}`);
    }
  }

  // Shallow merge of input and env settings, with input taking priority.
  // Review the need for a deep merge if/when more complex settings are added.
  return Object.assign({}, envSettings, inputSettings);
};

const getSettings = (inputSettings) => {
  const settings = mergeSettingsSources(inputSettings);
  if (Object.keys(settings).length === 0) return;

  // Set a base-level config based on the preset input value
  // (desktop is currently the only supported option)
  const derivedSettings =
    settings.preset === 'desktop' ? desktopConfig : fullConfig;

  // The following are added to the `settings` object of the selected base config
  // We add individually to avoid passing anything unexpected to Lighthouse.
  if (settings.locale) {
    derivedSettings.settings.locale = settings.locale;
  }

  return derivedSettings;
};

export default getSettings;
