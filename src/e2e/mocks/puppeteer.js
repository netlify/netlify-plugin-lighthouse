const puppeteer = () =>
  jest.unstable_mockModule('puppeteer', () => {
    return {
      default: {
        launch: () => Promise.resolve({
          wsEndpoint: () => 'ws://127.0.0.1:9222/devtools/browser/xyz',
          close: () => Promise.resolve(),
        }),
      },
    };
  });

export default puppeteer;
