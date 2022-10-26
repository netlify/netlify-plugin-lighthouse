const chalk = require('chalk');
const { minify } = require('html-minifier');
const { makeReplacements } = require('./replacements');

const belowThreshold = (id, expected, categories) => {
  const category = categories.find((c) => c.id === id);
  if (!category) {
    console.warn(`Could not find category ${chalk.yellow(id)}`);
  }
  const actual = category ? category.score : Number.MAX_SAFE_INTEGER;
  return actual < expected;
};

const getError = (id, expected, categories, audits) => {
  const category = categories.find((c) => c.id === id);

  const categoryError = `Expected category ${chalk.cyan(
    category.title,
  )} to be greater or equal to ${chalk.green(expected)} but got ${chalk.red(
    category.score !== null ? category.score : 'unknown',
  )}`;

  const categoryAudits = category.auditRefs
    .filter(({ weight, id }) => weight > 0 && audits[id].score < 1)
    .map((ref) => {
      const audit = audits[ref.id];
      return `   '${chalk.cyan(
        audit.title,
      )}' received a score of ${chalk.yellow(audit.score)}`;
    })
    .join('\n');

  return { message: categoryError, details: categoryAudits };
};

const formatShortSummary = ({ categories, runtimeError }) => {
  if (runtimeError) {
    return runtimeError.message;
  }
  return categories
    .map(({ title, score }) => `${title}: ${Math.round(score * 100)}`)
    .join(', ');
};

const formatResults = ({ results, thresholds }) => {
  const hasScores = !results.lhr.runtimeError;

  const categories = Object.values(results.lhr.categories).map(
    ({ title, score, id, auditRefs }) => ({ title, score, id, auditRefs }),
  );

  const categoriesBelowThreshold =
    hasScores &&
    Object.entries(thresholds).filter(([id, expected]) =>
      belowThreshold(id, expected, categories),
    );

  const errors =
    hasScores &&
    categoriesBelowThreshold.map(([id, expected]) =>
      getError(id, expected, categories, results.lhr.audits),
    );

  const summary =
    hasScores &&
    categories.map(({ title, score, id }) => ({
      title,
      score,
      id,
      ...(thresholds[id] ? { threshold: thresholds[id] } : {}),
    }));

  const shortSummary = formatShortSummary({
    categories,
    runtimeError: results.lhr.runtimeError,
  });

  const formattedReport = makeReplacements(results.report);

  // Pull some additional details to pass to App
  const { formFactor, locale } = results.lhr.configSettings;
  const installable = results.lhr.audits['installable-manifest']?.score === 1;
  const details = { installable, formFactor, locale };

  const report = minify(formattedReport, {
    removeAttributeQuotes: true,
    collapseWhitespace: true,
    removeRedundantAttributes: true,
    removeOptionalTags: true,
    removeEmptyElements: true,
    minifyCSS: true,
    minifyJS: true,
  });

  return { summary, shortSummary, details, report, errors };
};

module.exports = {
  belowThreshold,
  getError,
  formatShortSummary,
  formatResults,
};
