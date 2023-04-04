import { formatStartMessage } from './helpers.js';

describe('formatStartMessage', () => {
  it('should format a message using only the path', () => {
    const result = formatStartMessage({ path: 'https://example.com/path' });
    expect(result).toEqual('Running Lighthouse on https://example.com/path');
  });

  it('should format a message using only the path and count', () => {
    const result = formatStartMessage({
      count: { i: 1, total: 2 },
      path: 'https://example.com/path',
    });
    expect(result).toEqual(
      'Running Lighthouse on https://example.com/path (1/2)',
    );
  });

  it('should format a message using a single feature', () => {
    const result = formatStartMessage({
      path: 'https://example.com/path',
      formFactor: 'desktop',
    });
    expect(result).toEqual(
      'Running Lighthouse on https://example.com/path using the “desktop” preset',
    );
  });

  it('should format a message using multiple features', () => {
    const result = formatStartMessage({
      path: 'https://example.com/path',
      formFactor: 'desktop',
      locale: 'de',
    });
    expect(result).toEqual(
      'Running Lighthouse on https://example.com/path using the “de” locale and the “desktop” preset',
    );
  });

  it('should format a message using all available inputs', () => {
    const result = formatStartMessage({
      count: { i: 1, total: 2 },
      path: 'https://example.com/path',
      formFactor: 'desktop',
      locale: 'es',
    });
    expect(result).toEqual(
      'Running Lighthouse on https://example.com/path using the “es” locale and the “desktop” preset (1/2)',
    );
  });
});
