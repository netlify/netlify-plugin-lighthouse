const settingsPreset = {
  logs: [
    ['Generating Lighthouse report. This may take a minute…'],
    ['Running Lighthouse on example/ using the "desktop" preset'],
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
          formFactor: 'desktop',
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

export default settingsPreset;
