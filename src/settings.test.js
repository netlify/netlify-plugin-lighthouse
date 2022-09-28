const { getSettings } = require('./settings');

describe('replacements', () => {
  it('should return nothing with no settings set', () => {
    expect(getSettings()).toEqual(undefined);
    expect(getSettings({})).toEqual(undefined);
  });

  it('should return a template config with preset set to desktop', () => {
    const derivedSettings = getSettings({ preset: 'desktop' });
    expect(derivedSettings.extends).toEqual('lighthouse:default');
    expect(derivedSettings.settings.formFactor).toEqual('desktop');
  });

  it('should add a locale if set', () => {
    const derivedSettings = getSettings({ locale: 'es' });
    expect(derivedSettings.settings.locale).toEqual('es');
  });
});
