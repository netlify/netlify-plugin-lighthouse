const { getSettings } = require('./settings');

describe('replacements', () => {
  it('should return nothing with no settings set', () => {
    expect(getSettings()).toEqual(undefined);
    expect(getSettings({})).toEqual(undefined);
  });

  it('should return a template config with formFactor set to mobile', () => {
    const derivedSettings = getSettings({ formFactor: 'mobile' });
    expect(derivedSettings.extends).toEqual('lighthouse:default');
    expect(derivedSettings.settings.formFactor).toBeUndefined();
  });

  it('should return a template config with formFactor set to desktop', () => {
    const derivedSettings = getSettings({ formFactor: 'desktop' });
    expect(derivedSettings.extends).toEqual('lighthouse:default');
    expect(derivedSettings.settings.formFactor).toEqual('desktop');
  });

  it('should add a locale if set', () => {
    const derivedSettings = getSettings({ locale: 'es' });
    expect(derivedSettings.settings.locale).toEqual('es');
  });
});
