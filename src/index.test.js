import lighthousePlugin from './index.js';

describe('lighthousePlugin plugin events', () => {
  describe('when fail_deploy_on_score_thresholds is true', () => {
    it('should return onPreBuild and onPostBuild events', async () => {
      const events = lighthousePlugin({
        fail_deploy_on_score_thresholds: 'true',
      });
      expect(events).toEqual({
        onPreBuild: expect.any(Function),
        onPostBuild: expect.any(Function),
      });
    });
  });

  describe('default behavior', () => {
    it('should return onPreBuild, onPostBuild and onSuccess events', async () => {
      const events = lighthousePlugin();
      expect(events).toEqual({
        onPreBuild: expect.any(Function),
        onPostBuild: expect.any(Function),
        onSuccess: expect.any(Function),
      });
    });
  });
});
