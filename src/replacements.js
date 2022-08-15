/*
 * Lighthouse only runs the theme checking function on load if a user is using
 * a dark theme. This change modifies the check to _always_ pass regardless of
 * theme preference.
 *
 * This ensures we always run the function on load, where we add additional
 * custom logic to test if a preferred theme was set as a querystring parameter,
 * falling back to a standard dark theme check.
 */
const forceThemeChecking = {
  source: `(prefers-color-scheme: dark)`,
  replacement: `(prefers-color-scheme)`,
};

/*
 * Relative line numbers of the replacements:
 * 1. Ensure original source line is retained
 * 2-3. We only want to trigger this on first run. This function is also run
 *    each time the theme is manually toggled using the dropdown menu and
 *    we don't want to interfere.
 * 4. Check the URL querystring for a light/dark theme preference.
 * 5-7. If we recognise the value, use it to set/remove the theme class.
 * 8-9. We made a change to the Lighthouse-supplied matchMedia check which
 *    runs on page load, to always trigger this function regardless of theme.
 *    This means we can't rely on the second parameter being passed to this
 *    function being accurate. If we make it this far, we need to run our own
 *    check to replicate that original functionality.
 */
const enableQuerystringThemeCheck = {
  source: `const n=e.rootEl;`,
  replacement: `const n=e.rootEl;
    if (!window.qsThemeChecked) {
      window.qsThemeChecked = true;
      const qsTheme = new URLSearchParams(window.location.search).get('theme');
      if (qsTheme === 'dark' || qsTheme === 'light') {
        return n.classList.toggle('lh-dark', qsTheme === 'dark');
      }
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return n.classList.toggle('lh-dark', prefersDark);
    }`,
};

const replacements = [forceThemeChecking, enableQuerystringThemeCheck];

const makeReplacements = (str) => {
  return replacements.reduce((acc, { source, replacement }) => {
    return acc.replace(source, replacement);
  }, str);
};

module.exports = { makeReplacements };
