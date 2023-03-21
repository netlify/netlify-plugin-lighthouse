import mockResult from './fixture/results.json';
import settingsLocale from './fixture/output/settings-locale.js';
import mockUtils from './fixture/utils.js';
import mockConsoleLog from './mocks/console-log.js';
import mockConsoleError from './mocks/console-error.js';
import mockLighthouse from './mocks/lighthouse.js';
import mockPuppeteer from './mocks/puppeteer.js';
import mockChromeLauncher from './mocks/chrome-launcher.js';
import resetEnv from './lib/reset-env.js';

const modifiedResult = mockResult;
modifiedResult.lhr.categories.performance.title = 'Rendimiento';
modifiedResult.lhr.categories.accessibility.title = 'Accesibilidad';
modifiedResult.lhr.categories['best-practices'].title =
  'Prácticas recomendadas';
modifiedResult.lhr.categories.seo.title = 'SEO';
modifiedResult.lhr.categories.pwa.title = 'PWA';
modifiedResult.lhr.configSettings.locale = 'es';

mockConsoleLog();
mockConsoleError();
mockLighthouse(modifiedResult);
mockPuppeteer();
mockChromeLauncher();

const lighthousePlugin = (await import('../index.js')).default;

describe('lighthousePlugin with custom locale', () => {
  beforeEach(() => {
    resetEnv();
    jest.clearAllMocks();
  });

  it('should output results in specified locale', async () => {
    process.env.PUBLISH_DIR = 'example';
    process.env.SETTINGS = JSON.stringify({ locale: 'es' });
    await lighthousePlugin().onPostBuild({ utils: mockUtils });
    expect(console.log.mock.calls).toEqual(settingsLocale.logs);
    expect(console.error).not.toHaveBeenCalled();
    expect(mockUtils.status.show).toHaveBeenCalledWith(settingsLocale.payload);
    expect(mockUtils.build.failBuild).not.toHaveBeenCalled();
    expect(mockUtils.build.failPlugin).not.toHaveBeenCalled();
  });
});
