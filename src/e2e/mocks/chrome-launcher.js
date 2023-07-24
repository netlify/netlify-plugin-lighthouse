const chromeLauncher = () =>
  jest.unstable_mockModule('chrome-launcher', () => {
    return {
      default: {
        launch: () =>
          Promise.resolve({ port: 49920, kill: () => Promise.resolve() }),
      },
    };
  });

export default chromeLauncher;
