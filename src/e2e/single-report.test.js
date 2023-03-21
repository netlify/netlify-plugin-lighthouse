import mockResult from './fixture/results.json';
import {
  singleOnPostBuildSuccess,
  singleOnSuccessSuccess,
} from './fixture/output/single.js';
import mockUtils from './fixture/utils.js';
import mockConsoleLog from './mocks/console-log.js';
import mockConsoleError from './mocks/console-error.js';
import mockLighthouse from './mocks/lighthouse.js';
import mockPuppeteer from './mocks/puppeteer.js';
import mockChromeLauncher from './mocks/chrome-launcher.js';
import resetEnv from './lib/reset-env.js';

mockConsoleLog();
mockConsoleError();
mockLighthouse(mockResult);
mockPuppeteer();
mockChromeLauncher();

const lighthousePlugin = (await import('../index.js')).default;

describe('lighthousePlugin with single report per run', () => {
  beforeEach(() => {
    resetEnv();
    jest.clearAllMocks();
  });

  describe('onPostBuild', () => {
    it('should return a successful run for a single audit', async () => {
      process.env.PUBLISH_DIR = 'example';
      const expected = singleOnPostBuildSuccess;
      await lighthousePlugin().onPostBuild({ utils: mockUtils });
      expect(console.log.mock.calls).toEqual(expected.logs);
      expect(console.error).not.toHaveBeenCalled();
      expect(mockUtils.status.show).toHaveBeenCalledWith(expected.payload);
      expect(mockUtils.build.failBuild).not.toHaveBeenCalled();
      expect(mockUtils.build.failPlugin).not.toHaveBeenCalled();
    });
  });

  describe('onSuccess', () => {
    beforeEach(() => {
      process.env.RUN_ON_SUCCESS = 'true';
    });
    afterEach(() => {
      delete process.env.RUN_ON_SUCCESS;
    });

    it('should return a successful run for a single audit', async () => {
      const expected = singleOnSuccessSuccess;
      await lighthousePlugin().onSuccess({ utils: mockUtils });
      expect(console.log.mock.calls).toEqual(expected.logs);
      expect(mockUtils.status.show).toHaveBeenCalledWith(expected.payload);
      expect(mockUtils.build.failBuild).not.toHaveBeenCalled();
      expect(mockUtils.build.failPlugin).not.toHaveBeenCalled();
    });
  });
});
