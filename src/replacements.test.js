const { makeReplacements } = require('./replacements');

describe('replacements', () => {
  it('should make forceThemeChecking replacement', () => {
    const data = 'window.matchMedia("(prefers-color-scheme: dark)").matches';
    const result = 'window.matchMedia("(prefers-color-scheme)").matches';
    expect(makeReplacements(data)).toEqual(result);
  });

  it('should make enableQuerystringThemeCheck replacement', () => {
    const data = 'prepended;const n=e.rootEl;appended';
    expect(makeReplacements(data)).toContain('prepended;const n=e.rootEl;');
    expect(makeReplacements(data)).toContain(
      'URLSearchParams(window.location.search)',
    );
    expect(makeReplacements(data)).toContain('appended');
  });
});
