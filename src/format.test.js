import {
  belowThreshold,
  getError,
  formatShortSummary,
  formatResults,
} from './format.js';

// Strip ANSI color codes from strings, as they make CI sad.
const stripAnsiCodes = (str) =>
  str.replace(
    // eslint-disable-next-line no-control-regex
    /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
    '',
  );

describe('format', () => {
  const getCategories = ({ score }) => [
    {
      title: 'Performance',
      score,
      id: 'performance',
      auditRefs: [
        { weight: 1, id: 'is-crawlable' },
        { weight: 1, id: 'robots-txt' },
        { weight: 1, id: 'tap-targets' },
      ],
    },
  ];
  const audits = {
    'is-crawlable': {
      id: 'is-crawlable',
      title: 'Page isn’t blocked from indexing',
      description:
        "Search engines are unable to include your pages in search results if they don't have permission to crawl them. [Learn more](https://web.dev/is-crawable/).",
      score: 1,
    },
    'robots-txt': {
      id: 'robots-txt',
      title: 'robots.txt is valid',
      description:
        'If your robots.txt file is malformed, crawlers may not be able to understand how you want your website to be crawled or indexed. [Learn more](https://web.dev/robots-txt/).',
      score: 0,
    },
    'tap-targets': {
      id: 'tap-targets',
      title: 'Tap targets are sized appropriately',
      description:
        'Interactive elements like buttons and links should be large enough (48x48px), and have enough space around them, to be easy enough to tap without overlapping onto other elements. [Learn more](https://web.dev/tap-targets/).',
      score: 0.5,
    },
  };

  const formattedError = {
    details:
      "   'robots.txt is valid' received a score of 0\n" +
      "   'Tap targets are sized appropriately' received a score of 0.5",
    message:
      'Expected category Performance to be greater or equal to 1 but got 0.5',
  };

  describe('belowThreshold', () => {
    const categories = [
      { title: 'Performance', score: 0.9, id: 'performance' },
      { title: 'Accessibility', score: 0.8, id: 'accessibility' },
    ];

    it('returns false when the score is above the threshold', () => {
      expect(belowThreshold('performance', 0.8, categories)).toBe(false);
    });

    it('returns false when the category is not found', () => {
      console.warn = jest.fn();
      const result = belowThreshold('seo', 0.8, categories);
      expect(console.warn).toHaveBeenCalled();
      expect(result).toBe(false);
    });

    it('returns true when the score is below the threshold', () => {
      expect(belowThreshold('performance', 1, categories)).toBe(true);
    });
  });

  describe('getError', () => {
    it('returns an expected error message and list of details with valid score', () => {
      const errorMessage = getError(
        'performance',
        1,
        getCategories({ score: 0.5 }),
        audits,
      );
      expect(stripAnsiCodes(errorMessage.details)).toEqual(
        formattedError.details,
      );
      expect(stripAnsiCodes(errorMessage.message)).toEqual(
        formattedError.message,
      );
    });

    it('returns an expected error message and list of details without valid score', () => {
      const errorMessage = getError(
        'performance',
        1,
        getCategories({ score: null }),
        audits,
      );
      expect(stripAnsiCodes(errorMessage.message)).toContain(
        'to be greater or equal to 1 but got unknown',
      );
    });
  });

  describe('formatShortSummary', () => {
    const categories = [
      { title: 'Performance', score: 1, id: 'performance' },
      { title: 'Accessibility', score: 0.9, id: 'accessibility' },
      { title: 'Best Practices', score: 0.8, id: 'best-practices' },
      { title: 'SEO', score: 0.7, id: 'seo' },
      { title: 'PWA', score: 0.6, id: 'pwa' },
    ];

    it('should return a shortSummary containing scores if available', () => {
      const shortSummary = formatShortSummary(categories);
      expect(shortSummary).toEqual(
        'Performance: 100, Accessibility: 90, Best Practices: 80, SEO: 70, PWA: 60',
      );
    });
  });

  describe('formatResults', () => {
    const getResults = () => ({
      lhr: {
        lighthouseVersion: '9.6.3',
        requestedUrl: 'http://localhost:5100/404.html',
        finalUrl: 'http://localhost:5100/404.html',
        audits,
        configSettings: {},
        categories: getCategories({ score: 0.5 }),
      },
      artifacts: {},
      report: '<!doctype html>\n' + '<html lang="en">Hi</html>\n',
    });

    it('should return formatted results', () => {
      expect(formatResults({ results: getResults(), thresholds: {} })).toEqual({
        details: {
          formFactor: undefined,
          installable: false,
          locale: undefined,
        },
        errors: [],
        report: '<!doctype html><html lang=en>Hi',
        shortSummary: 'Performance: 50',
        summary: [{ id: 'performance', score: 0.5, title: 'Performance' }],
      });
    });

    it('should return formatted results with passing thresholds', () => {
      const thresholds = {
        performance: 0.1,
      };
      const formattedResults = formatResults({
        results: getResults(),
        thresholds,
      });
      expect(formattedResults.errors).toEqual([]);
      expect(formattedResults.summary).toEqual([
        {
          id: 'performance',
          score: 0.5,
          title: 'Performance',
          threshold: 0.1,
        },
      ]);
    });

    it('should return formatted results with failing thresholds', () => {
      const thresholds = {
        performance: 1,
      };
      const formattedResults = formatResults({
        results: getResults(),
        thresholds,
      });
      expect(stripAnsiCodes(formattedResults.errors[0].message)).toEqual(
        formattedError.message,
      );
      expect(stripAnsiCodes(formattedResults.errors[0].details)).toEqual(
        formattedError.details,
      );
      expect(formattedResults.summary).toEqual([
        {
          id: 'performance',
          score: 0.5,
          title: 'Performance',
          threshold: 1,
        },
      ]);
    });

    it('should use supplied config settings and data to populate `details`', () => {
      const results = getResults();
      results.lhr.configSettings = {
        locale: 'es',
        formFactor: 'desktop',
      };
      results.lhr.audits['installable-manifest'] = {
        id: 'installable-manifest',
        score: 1,
      };

      const formattedResults = formatResults({ results, thresholds: {} });
      expect(formattedResults.details).toEqual({
        formFactor: 'desktop',
        installable: true,
        locale: 'es',
      });
    });
  });
});
