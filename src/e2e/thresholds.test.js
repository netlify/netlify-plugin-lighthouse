import mockResult from './fixture/results.json';
import {
  singleOnPostBuildSuccess,
  singleOnPostBuildThresholdFail,
  singleOnSuccessSuccess,
  singleOnSuccessThresholdFail,
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

describe('lighthousePlugin with thresholds set', () => {
  beforeEach(() => {
    resetEnv();
    jest.clearAllMocks();
  });

  describe('onPostBuild', () => {
    it('should return a successful run when thresholds are met', async () => {
      process.env.PUBLISH_DIR = 'example';
      process.env.THRESHOLDS = JSON.stringify({ pwa: 0.1 });
      const expected = singleOnPostBuildSuccess;
      await lighthousePlugin().onPostBuild({ utils: mockUtils });
      expect(console.log.mock.calls).toEqual(expected.logs);
      expect(console.error).not.toHaveBeenCalled();
      expect(mockUtils.status.show).toHaveBeenCalledWith(expected.payload);
      expect(mockUtils.build.failBuild).not.toHaveBeenCalled();
      expect(mockUtils.build.failPlugin).not.toHaveBeenCalled();
    });

    it('should return a failed run when thresholds not met', async () => {
      process.env.PUBLISH_DIR = 'example';
      process.env.THRESHOLDS = JSON.stringify({ pwa: 1 });
      const expected = singleOnPostBuildThresholdFail;
      await lighthousePlugin().onPostBuild({ utils: mockUtils });
      expect(console.error.mock.calls).toEqual(expected.errors);
      expect(mockUtils.status.show).not.toHaveBeenCalledWith();
      expect(mockUtils.build.failBuild).toHaveBeenCalledWith(
        expected.message,
        expected.payload,
      );
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

    it('should return a successful run when thresholds are met', async () => {
      const expected = singleOnSuccessSuccess;
      process.env.THRESHOLDS = JSON.stringify({ pwa: 0.1 });
      await lighthousePlugin().onSuccess({ utils: mockUtils });
      expect(console.log.mock.calls).toEqual(expected.logs);
      expect(mockUtils.status.show).toHaveBeenCalledWith(expected.payload);
      expect(mockUtils.build.failBuild).not.toHaveBeenCalled();
      expect(mockUtils.build.failPlugin).not.toHaveBeenCalled();
    });

    it('should return a failed run when thresholds not met', async () => {
      process.env.THRESHOLDS = JSON.stringify({ pwa: 1 });
      const expected = singleOnSuccessThresholdFail;
      await lighthousePlugin().onSuccess({ utils: mockUtils });
      expect(console.log.mock.calls).toEqual(expected.logs);
      expect(console.error.mock.calls).toEqual(expected.errors);
      expect(mockUtils.status.show).not.toHaveBeenCalledWith();
      expect(mockUtils.build.failBuild).not.toHaveBeenCalled();
      expect(mockUtils.build.failPlugin).toHaveBeenCalledWith(
        expected.message,
        expected.payload,
      );
    });
  });
});
