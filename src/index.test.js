import lighthousePlugin from './index.js';

describe('lighthousePlugin plugin events', () => {
  describe('onPostBuild', () => {
    it('should return only the expected event function', async () => {
      const events = lighthousePlugin({
        fail_deploy_on_score_thresholds: 'true',
      });
      expect(events).toEqual({
        onPostBuild: expect.any(Function),
      });
    });
  });

  describe('onSuccess', () => {
    it('should return only the expected event function', async () => {
      const events = lighthousePlugin();
      expect(events).toEqual({
        onSuccess: expect.any(Function),
      });
    });
  });
});
