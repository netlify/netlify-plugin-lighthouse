import mockResult from './fixture/results.json';
import settingsPreset from './fixture/output/settings-preset.js';
import mockUtils from './fixture/utils.js';
import mockConsoleLog from './mocks/console-log.js';
import mockConsoleError from './mocks/console-error.js';
import mockLighthouse from './mocks/lighthouse.js';
import mockPuppeteer from './mocks/puppeteer.js';
import mockChromeLauncher from './mocks/chrome-launcher.js';
import resetEnv from './lib/reset-env.js';

const modifiedResult = mockResult;
modifiedResult.lhr.configSettings.formFactor = 'desktop';

mockConsoleLog();
mockConsoleError();
mockLighthouse(modifiedResult);
mockPuppeteer();
mockChromeLauncher();

const lighthousePlugin = (await import('../index.js')).default;

describe('lighthousePlugin with custom device preset', () => {
  beforeEach(() => {
    resetEnv();
    jest.clearAllMocks();
  });

  it('should output results using desktop preset', async () => {
    process.env.PUBLISH_DIR = 'example';
    process.env.SETTINGS = JSON.stringify({ preset: 'desktop' });
    await lighthousePlugin().onPostBuild({ utils: mockUtils });
    expect(console.log.mock.calls).toEqual(settingsPreset.logs);
    expect(console.error).not.toHaveBeenCalled();
    expect(mockUtils.status.show).toHaveBeenCalledWith(settingsPreset.payload);
    expect(mockUtils.build.failBuild).not.toHaveBeenCalled();
    expect(mockUtils.build.failPlugin).not.toHaveBeenCalled();
  });
});
