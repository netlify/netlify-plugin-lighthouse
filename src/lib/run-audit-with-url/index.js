import { formatResults } from '../../format.js';
import { runLighthouse, getBrowserPath } from '../../run-lighthouse.js';

const runAuditWithUrl = async ({ path = '', url, thresholds, settings }) => {
  try {
    const browserPath = await getBrowserPath();

    const getResults = async () => {
      const fullPath = path ? `${url}/${path}` : url;
      const results = await runLighthouse(browserPath, fullPath, settings);

      try {
        return { results };
      } catch (error) {
        return new Error({ error });
      }
    };

    const { error, results } = await getResults();

    if (error) {
      return { error };
    } else {
      const { summary, shortSummary, details, report, errors, runtimeError } =
        formatResults({
          results,
          thresholds,
        });

      return {
        summary,
        shortSummary,
        details,
        report,
        errors,
        runtimeError,
      };
    }
  } catch (error) {
    return { error };
  }
};

export default runAuditWithUrl;
