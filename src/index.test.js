import lighthousePlugin from './index.js';

describe('lighthousePlugin plugin events', () => {
  describe('when fail_deploy_on_score_thresholds is true', () => {
    it('should return onPostBuild events', async () => {
      const events = lighthousePlugin({
        fail_deploy_on_score_thresholds: 'true',
      });
      expect(events).toEqual({
        onPostBuild: expect.any(Function),
      });
    });
  });

  describe('default behavior', () => {
    it('should return onSuccess event', async () => {
      const events = lighthousePlugin();
      expect(events).toEqual({
        onSuccess: expect.any(Function),
      });
    });
  });
});
