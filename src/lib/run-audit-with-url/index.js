import { formatResults } from '../../format.js';
import { runLighthouse } from '../../run-lighthouse.js';

const runAuditWithUrl = async ({ path = '', url, thresholds, settings }) => {
  try {
    const getResults = async () => {
      const fullPath = path ? `${url}/${path}` : url;
      const results = await runLighthouse(fullPath, settings);

      try {
        return { results };
      } catch (error) {
        return new Error({ error });
      }
    };

    const { error, results } = await getResults();

    if (error) {
      console.log("error line 22 run audit with url", error)
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
    console.log("error line 41 run audit with url", error)
    return { error };
  }
};

export default runAuditWithUrl;
