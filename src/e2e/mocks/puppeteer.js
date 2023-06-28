const puppeteer = () =>
  jest.unstable_mockModule('puppeteer', () => {
    return {
      default: {
        createBrowserFetcher: () => ({
          localRevisions: () => Promise.resolve(['123']),
          revisionInfo: () => Promise.resolve({ executablePath: 'path' }),
        }),
      },
    };
  });

export default puppeteer;
