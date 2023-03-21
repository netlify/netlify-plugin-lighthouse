const settingsLocale = {
  logs: [
    ['Generating Lighthouse report. This may take a minute…'],
    ['Running Lighthouse on example/ using the "es" locale'],
    ['Serving and scanning site from directory \x1B[35mexample\x1B[39m'],
    ['\x1B[36m\x1B[1mLighthouse scores for example/\x1B[22m\x1B[39m'],
    ['- Rendimiento: 100'],
    ['- Accesibilidad: 100'],
    ['- Prácticas recomendadas: 100'],
    ['- SEO: 91'],
    ['- PWA: 30'],
  ],
  payload: {
    extraData: [
      {
        details: {
          formFactor: 'mobile',
          installable: false,
          locale: 'es',
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
      "Summary for path 'example/': Rendimiento: 100, Accesibilidad: 100, Prácticas recomendadas: 100, SEO: 91, PWA: 30",
  },
};

export default settingsLocale;
