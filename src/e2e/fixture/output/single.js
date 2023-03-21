export const singleOnPostBuildSuccess = {
  logs: [
    ['Generating Lighthouse report. This may take a minute…'],
    ['Running Lighthouse on example/'],
    ['Serving and scanning site from directory \x1B[35mexample\x1B[39m'],
    ['\x1B[36m\x1B[1mLighthouse scores for example/\x1B[22m\x1B[39m'],
    ['- Performance: 100'],
    ['- Accessibility: 100'],
    ['- Best Practices: 100'],
    ['- SEO: 91'],
    ['- PWA: 30'],
  ],
  payload: {
    extraData: [
      {
        details: {
          formFactor: 'mobile',
          installable: false,
          locale: 'en-US',
        },
        path: 'example/',
        report: '<!DOCTYPE html><h1>Lighthouse Report (mock)</h1>',
        summary: {
          accessibility: 100,
          'best-practices': 100,
          performance: 100,
          pwa: 30,
          seo: 91,
        },
      },
    ],
    summary:
      "Summary for path 'example/': Performance: 100, Accessibility: 100, Best Practices: 100, SEO: 91, PWA: 30",
  },
};

export const singleOnSuccessSuccess = {
  logs: [
    ['Generating Lighthouse report. This may take a minute…'],
    ['Running Lighthouse on /'],
    ['\x1B[36m\x1B[1mLighthouse scores for /\x1B[22m\x1B[39m'],
    ['- Performance: 100'],
    ['- Accessibility: 100'],
    ['- Best Practices: 100'],
    ['- SEO: 91'],
    ['- PWA: 30'],
  ],
  payload: {
    extraData: [
      {
        details: {
          formFactor: 'mobile',
          installable: false,
          locale: 'en-US',
        },
        path: '/',
        report: '<!DOCTYPE html><h1>Lighthouse Report (mock)</h1>',
        summary: {
          accessibility: 100,
          'best-practices': 100,
          performance: 100,
          pwa: 30,
          seo: 91,
        },
      },
    ],
    summary:
      "Summary for path '/': Performance: 100, Accessibility: 100, Best Practices: 100, SEO: 91, PWA: 30",
  },
};

export const singleOnPostBuildThresholdFail = {
  logs: singleOnPostBuildSuccess.logs,
  errors: [
    [
      "\n\nExpected category \u001b[36mPWA\u001b[39m to be greater or equal to \u001b[32m1\u001b[39m but got \u001b[31m0.3\u001b[39m\n   '\u001b[36mWeb app manifest or service worker do not meet the installability requirements\u001b[39m' received a score of \u001b[33m0\u001b[39m\n   '\u001b[36mDoes not register a service worker that controls page and `start_url`\u001b[39m' received a score of \u001b[33m0\u001b[39m\n   '\u001b[36mIs not configured for a custom splash screen\u001b[39m' received a score of \u001b[33m0\u001b[39m\n   '\u001b[36mDoes not set a theme color for the address bar.\u001b[39m' received a score of \u001b[33m0\u001b[39m\n   '\u001b[36mDoes not provide a valid `apple-touch-icon`\u001b[39m' received a score of \u001b[33m0\u001b[39m\n   '\u001b[36mManifest doesn't have a maskable icon\u001b[39m' received a score of \u001b[33m0\u001b[39m",
    ],
  ],
  payload: {
    errorMetadata: singleOnPostBuildSuccess.payload.extraData,
  },
  // Example message without color formatting:
  // `Failed with error:
  //
  // Expected category 'PWA' to be greater or equal to '1' but got '0.3'`
  message:
    '\u001b[31mFailed with error:\u001b[39m\n\u001b[31m\u001b[39m\n\nExpected category \u001b[36mPWA\u001b[39m to be greater or equal to \u001b[32m1\u001b[39m but got \u001b[31m0.3\u001b[39m',
};

export const singleOnPostBuildNotFoundFail = {
  logs: singleOnPostBuildSuccess.logs,
  errors: [
    [
      "\n\nExpected category \u001b[36mPWA\u001b[39m to be greater or equal to \u001b[32m1\u001b[39m but got \u001b[31m0.3\u001b[39m\n   '\u001b[36mWeb app manifest or service worker do not meet the installability requirements\u001b[39m' received a score of \u001b[33m0\u001b[39m\n   '\u001b[36mDoes not register a service worker that controls page and `start_url`\u001b[39m' received a score of \u001b[33m0\u001b[39m\n   '\u001b[36mIs not configured for a custom splash screen\u001b[39m' received a score of \u001b[33m0\u001b[39m\n   '\u001b[36mDoes not set a theme color for the address bar.\u001b[39m' received a score of \u001b[33m0\u001b[39m\n   '\u001b[36mDoes not provide a valid `apple-touch-icon`\u001b[39m' received a score of \u001b[33m0\u001b[39m\n   '\u001b[36mManifest doesn't have a maskable icon\u001b[39m' received a score of \u001b[33m0\u001b[39m",
    ],
  ],
  payload: {
    errorMetadata: singleOnPostBuildSuccess.payload.extraData,
  },
  // Example message without color formatting:
  // `Failed with error:
  //
  // Expected category 'PWA' to be greater or equal to '1' but got '0.3'`
  message:
    '\u001b[31mFailed with error:\u001b[39m\n\u001b[31m\u001b[39m\n\nExpected category \u001b[36mPWA\u001b[39m to be greater or equal to \u001b[32m1\u001b[39m but got \u001b[31m0.3\u001b[39m',
};

export const singleOnSuccessThresholdFail = {
  logs: singleOnSuccessSuccess.logs,
  errors: [
    [
      "\n\n\u001b[31mError\u001b[39m for url '\u001b[36mhttps://www.netlify.com\u001b[39m':\nExpected category \u001b[36mPWA\u001b[39m to be greater or equal to \u001b[32m1\u001b[39m but got \u001b[31m0.3\u001b[39m\n   '\u001b[36mWeb app manifest or service worker do not meet the installability requirements\u001b[39m' received a score of \u001b[33m0\u001b[39m\n   '\u001b[36mDoes not register a service worker that controls page and `start_url`\u001b[39m' received a score of \u001b[33m0\u001b[39m\n   '\u001b[36mIs not configured for a custom splash screen\u001b[39m' received a score of \u001b[33m0\u001b[39m\n   '\u001b[36mDoes not set a theme color for the address bar.\u001b[39m' received a score of \u001b[33m0\u001b[39m\n   '\u001b[36mDoes not provide a valid `apple-touch-icon`\u001b[39m' received a score of \u001b[33m0\u001b[39m\n   '\u001b[36mManifest doesn't have a maskable icon\u001b[39m' received a score of \u001b[33m0\u001b[39m",
    ],
  ],
  payload: {
    errorMetadata: singleOnSuccessSuccess.payload.extraData,
  },
  // Example message without color formatting:
  // `Failed with error:
  //
  // Error for url 'https://www.netlify.com':
  // Expected category 'PWA' to be greater or equal to '1' but got '0.3'`
  // `,
  message:
    "\u001b[31mFailed with error:\u001b[39m\n\u001b[31m\u001b[39m\n\n\u001b[31mError\u001b[39m for url '\u001b[36mhttps://www.netlify.com\u001b[39m':\nExpected category \u001b[36mPWA\u001b[39m to be greater or equal to \u001b[32m1\u001b[39m but got \u001b[31m0.3\u001b[39m",
};
