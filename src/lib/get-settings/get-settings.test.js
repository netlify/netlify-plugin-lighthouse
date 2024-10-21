import getSettings from './index.js';

describe('replacements', () => {
  it('should return nothing with no settings set', () => {
    expect(getSettings()).toEqual(undefined);
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

  it('should use values from process.env.SETTINGS', () => {
    process.env.SETTINGS = JSON.stringify({
      preset: 'desktop',
      locale: 'ar',
    });
    const derivedSettings = getSettings();
    expect(derivedSettings.settings.formFactor).toEqual('desktop');
    expect(derivedSettings.settings.locale).toEqual('ar');
  });

  it('should prefer values from input over process.env.SETTINGS', () => {
    process.env.SETTINGS = JSON.stringify({
      locale: 'ar',
    });
    const derivedSettings = getSettings({ locale: 'es' });
    expect(derivedSettings.settings.locale).toEqual('es');
  });

  it('should error with incorrect syntax for process.env.SETTINGS', () => {
    process.env.SETTINGS = 'not json';
    expect(getSettings).toThrow(/Invalid JSON/);
  });
});
