import { formatResults } from '../../format';
import { runLighthouse, getBrowserPath } from '../../lighthouse';
import persistResults from '../persist-results';
import { join } from 'path';
import getServer from '../get-server';

const runAudit = async ({
  serveDir,
  path = '',
  url,
  thresholds,
  output_path,
  settings,
}) => {
  try {
    const { server } = getServer({ serveDir: serveDir, auditUrl: url });
    const browserPath = await getBrowserPath();
    const { error, results } = await new Promise((resolve) => {
      const instance = server.listen(async () => {
        try {
          const fullPath = path ? `${server.url}/${path}` : server.url;
          const results = await runLighthouse(browserPath, fullPath, settings);
          resolve({ error: false, results });
        } catch (error) {
          resolve({ error });
        } finally {
          server.close(instance);
        }
      });
    });

    if (error) {
      return { error };
    } else {
      const { summary, shortSummary, details, report, errors, runtimeError } =
        formatResults({
          results,
          thresholds,
        });

      if (output_path) {
        await persistResults({ report, path: join(serveDir, output_path) });
      }

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

export default runAudit;
