const puppeteer = () =>
  jest.unstable_mockModule('puppeteer', () => {
    return {
      default: {
        launch: () => ({
          process: () => ({ spawnfile: 'path' }),
          close: () => Promise.resolve(),
        }),
      },
    };
  });

export default puppeteer;
