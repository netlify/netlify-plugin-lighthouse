const puppeteer = () =>
  jest.unstable_mockModule('puppeteer', () => {
    return {
      default: {
        launch: () => {
         return { executablePath: () => 'path'}
        },
        createBrowserFetcher: () => ({
          localRevisions: () => Promise.resolve(['123']),
          revisionInfo: () => Promise.resolve({ executablePath: 'path' }),
        }),
      },
    };
  });

export default puppeteer;
