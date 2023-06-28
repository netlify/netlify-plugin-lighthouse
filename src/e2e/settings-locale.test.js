import mockResult from './fixture/results.json';
import mockUtils from './fixture/utils.js';
import mockConsoleLog from './mocks/console-log.js';
import mockConsoleError from './mocks/console-error.js';
import mockLighthouse from './mocks/lighthouse.js';
import mockPuppeteer from './mocks/puppeteer.js';
import mockChromeLauncher from './mocks/chrome-launcher.js';
import resetEnv from './lib/reset-env.js';
import formatMockLog from './lib/format-mock-log.js';

const modifiedResult = mockResult;
modifiedResult.lhr.categories.performance.title = 'Rendimiento';
modifiedResult.lhr.categories.accessibility.title = 'Accesibilidad';
modifiedResult.lhr.categories['best-practices'].title =
  'Prácticas recomendadas';
modifiedResult.lhr.categories.seo.title = 'SEO';
modifiedResult.lhr.categories.pwa.title = 'PWA';
modifiedResult.lhr.configSettings.locale = 'es';

mockConsoleLog();
mockLighthouse(modifiedResult);
mockPuppeteer();
mockChromeLauncher();

const lighthousePlugin = (await import('../index.js')).default;

describe('lighthousePlugin with custom locale', () => {
  beforeEach(() => {
    resetEnv();
    jest.clearAllMocks();
    process.env.PUBLISH_DIR = 'example';
    process.env.SETTINGS = JSON.stringify({ locale: 'es' });
  });

  it('should output expected log content', async () => {
    const logs = [
      'Generating Lighthouse report. This may take a minute…',
      'Running Lighthouse on example/ using the “es” locale',
      'Serving and scanning site from directory example',
      'Lighthouse scores for example/',
      '- Rendimiento: 100',
      '- Accesibilidad: 100',
      '- Prácticas recomendadas: 100',
      '- SEO: 91',
      '- PWA: 30',
    ];

    await lighthousePlugin().onPostBuild({ utils: mockUtils });
    expect(formatMockLog(console.log.mock.calls)).toEqual(logs);
  });

  it('should output expected payload', async () => {
    const payload = {
      extraData: [
        {
          details: {
            formFactor: 'mobile',
            installable: false,
            locale: 'es',
          },
          path: 'example/',
          report: '<!DOCTYPE html><h1>Lighthouse Report (mock)</h1>',
          summary: {
            accessibility: 100,
            'best-practices': 100,
            performance: 100,
            pwa: 30,
            seo: 91,
          },
        },
      ],
      summary:
        "Summary for path 'example/': Rendimiento: 100, Accesibilidad: 100, Prácticas recomendadas: 100, SEO: 91, PWA: 30",
    };

    await lighthousePlugin().onPostBuild({ utils: mockUtils });
    expect(mockUtils.status.show).toHaveBeenCalledWith(payload);
  });

  it('should not output errors, or call fail events', async () => {
    mockConsoleError();

    await lighthousePlugin().onPostBuild({ utils: mockUtils });
    expect(console.error).not.toHaveBeenCalled();
    expect(mockUtils.build.failBuild).not.toHaveBeenCalled();
    expect(mockUtils.build.failPlugin).not.toHaveBeenCalled();
  });
});
