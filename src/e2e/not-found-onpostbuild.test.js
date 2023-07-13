import mockResult from './fixture/results-not-found.json';
import mockUtils from './fixture/utils.js';
import mockConsoleLog from './mocks/console-log.js';
import mockConsoleError from './mocks/console-error.js';
import mockLighthouse from './mocks/lighthouse.js';
import mockPuppeteer from './mocks/puppeteer.js';
import mockChromeLauncher from './mocks/chrome-launcher.js';
import resetEnv from './lib/reset-env.js';
import formatMockLog from './lib/format-mock-log.js';

mockConsoleLog();
mockLighthouse(mockResult);
mockPuppeteer();
mockChromeLauncher();

const lighthousePlugin = (await import('../index.js')).default;

describe('lighthousePlugin with single not-found run (onPostBuild)', () => {
  beforeEach(() => {
    resetEnv();
    jest.clearAllMocks();
    process.env.PUBLISH_DIR = 'example';
    process.env.AUDITS = JSON.stringify([{ path: 'this-page-does-not-exist' }]);
  });

  it('should output expected log content', async () => {
    const logs = [
      'Generating Lighthouse report. This may take a minute…',
      'Running Lighthouse on example/this-page-does-not-exist',
      'Serving and scanning site from directory example',
      'ERRORED_DOCUMENT_REQUEST',
      'Lighthouse was unable to reliably load the page you requested. Make sure you are testing the correct URL and that the server is properly responding to all requests. (Status code: 404)',
    ];

    await lighthousePlugin({
      fail_deploy_on_score_thresholds: 'true',
    }).onPostBuild({ utils: mockUtils });
    expect(formatMockLog(console.log.mock.calls)).toEqual(logs);
  });

  it('should output expected payload', async () => {
    const payload = {
      extraData: [
        {
          details: {
            formFactor: 'mobile',
            installable: false,
            locale: 'en-US',
          },
          report: '<!DOCTYPE html><h1>Lighthouse Report (mock)</h1>',
        },
      ],
      summary:
        "Error testing 'example/this-page-does-not-exist': Lighthouse was unable to reliably load the page you requested. Make sure you are testing the correct URL and that the server is properly responding to all requests. (Status code: 404)",
    };

    await lighthousePlugin({
      fail_deploy_on_score_thresholds: 'true',
    }).onPostBuild({ utils: mockUtils });
    expect(mockUtils.status.show).toHaveBeenCalledWith(payload);
  });

  it('should not output errors, or call fail events', async () => {
    mockConsoleError();

    await lighthousePlugin({
      fail_deploy_on_score_thresholds: 'true',
    }).onPostBuild({ utils: mockUtils });
    expect(console.error).not.toHaveBeenCalled();
    expect(mockUtils.build.failBuild).not.toHaveBeenCalled();
    expect(mockUtils.build.failPlugin).not.toHaveBeenCalled();
  });
});
