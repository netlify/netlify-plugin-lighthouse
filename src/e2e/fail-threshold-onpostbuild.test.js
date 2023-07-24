import stripAnsi from 'strip-ansi';

import mockResult from './fixture/results.json';
import mockUtils from './fixture/utils.js';
import mockConsoleLog from './mocks/console-log.js';
import mockConsoleError from './mocks/console-error.js';
import mockLighthouse from './mocks/lighthouse.js';
import mockPuppeteer from './mocks/puppeteer.js';
import mockChromeLauncher from './mocks/chrome-launcher.js';
import resetEnv from './lib/reset-env.js';
import formatMockLog from './lib/format-mock-log.js';

mockConsoleLog();
mockConsoleError();
mockLighthouse(mockResult);
mockPuppeteer();
mockChromeLauncher();

const lighthousePlugin = (await import('../index.js')).default;

describe('lighthousePlugin with failed threshold run (onPostBuild)', () => {
  beforeEach(() => {
    resetEnv();
    jest.clearAllMocks();
    process.env.PUBLISH_DIR = 'example';
    process.env.THRESHOLDS = JSON.stringify({
      performance: 1,
      accessibility: 1,
      'best-practices': 1,
      seo: 1,
      pwa: 1,
    });
  });

  it('should output expected log content', async () => {
    const logs = [
      'Generating Lighthouse report. This may take a minute…',
      'Running Lighthouse on example/',
      'Serving and scanning site from directory example',
      'Lighthouse scores for example/',
      '- Performance: 100',
      '- Accessibility: 100',
      '- Best Practices: 100',
      '- SEO: 91',
      '- PWA: 30',
    ];

    await lighthousePlugin({
      fail_deploy_on_score_thresholds: 'true',
    }).onPostBuild({ utils: mockUtils });
    expect(formatMockLog(console.log.mock.calls)).toEqual(logs);
  });

  it('should not output expected success payload', async () => {
    await lighthousePlugin({
      fail_deploy_on_score_thresholds: 'true',
    }).onPostBuild({ utils: mockUtils });
    expect(mockUtils.status.show).not.toHaveBeenCalledWith();
  });

  it('should output expected error', async () => {
    const error = [
      'Expected category SEO to be greater or equal to 1 but got 0.91',
      "   'Document does not have a meta description' received a score of 0",
      'Expected category PWA to be greater or equal to 1 but got 0.3',
      "   'Web app manifest or service worker do not meet the installability requirements' received a score of 0",
      "   'Does not register a service worker that controls page and `start_url`' received a score of 0",
      "   'Is not configured for a custom splash screen' received a score of 0",
      "   'Does not set a theme color for the address bar.' received a score of 0",
      "   'Does not provide a valid `apple-touch-icon`' received a score of 0",
      "   'Manifest doesn't have a maskable icon' received a score of 0",
    ];

    await lighthousePlugin({
      fail_deploy_on_score_thresholds: 'true',
    }).onPostBuild({ utils: mockUtils });
    const resultError = console.error.mock.calls[0][0];
    expect(stripAnsi(resultError).split('\n').filter(Boolean)).toEqual(error);
  });

  it('should call the expected fail event', async () => {
    const message = [
      'Failed with error:',
      'Expected category SEO to be greater or equal to 1 but got 0.91',
      'Expected category PWA to be greater or equal to 1 but got 0.3',
    ];
    const payload = {
      errorMetadata: [
        {
          details: {
            formFactor: 'mobile',
            installable: false,
            locale: 'en-US',
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
    };

    await lighthousePlugin({
      fail_deploy_on_score_thresholds: 'true',
    }).onPostBuild({ utils: mockUtils });
    const [resultMessage, resultPayload] =
      mockUtils.build.failBuild.mock.calls[0];

    expect(stripAnsi(resultMessage).split('\n').filter(Boolean)).toEqual(
      message,
    );
    expect(resultPayload).toEqual(payload);

    // This should only be called onSuccess
    expect(mockUtils.build.failPlugin).not.toHaveBeenCalled();
  });
});
