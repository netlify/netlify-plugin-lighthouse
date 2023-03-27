import lighthousePlugin from './index.js';

describe('lighthousePlugin plugin events', () => {
  describe('onPostBuild', () => {
    it('should return only the expected event function', async () => {
      const events = lighthousePlugin();
      expect(events).toEqual({
        onPostBuild: expect.any(Function),
      });
    });
  });

  describe('onSuccess', () => {
    beforeEach(() => {
      process.env.RUN_ON_SUCCESS = 'true';
    });
    afterEach(() => {
      delete process.env.RUN_ON_SUCCESS;
    });
    it('should return only the expected event function', async () => {
      const events = lighthousePlugin();
      expect(events).toEqual({
        onSuccess: expect.any(Function),
      });
    });
  });
});
