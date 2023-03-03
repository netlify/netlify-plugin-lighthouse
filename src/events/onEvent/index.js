import chalk from 'chalk';

import getSettings from '../../lib/get-settings/index.js';
import processResults from '../../lib/process-results/index.js';
import runAudit from '../../lib/run-audit/index.js';
import runAuditWithServer from '../../lib/run-audit-with-server/index.js';

const onEvent = async ({ auditConfigs, inputs, onFail, onSuccess } = {}) => {
  console.log(
    `Generating Lighthouse report${
      auditConfigs.length > 1 ? 's' : ''
    }. This may take a minute…`,
  );

  let errorMetadata = [];

  try {
    const settings = getSettings(inputs?.settings);

    const allErrors = [];
    const data = [];

    let i = 0;
    for (const auditConfig of auditConfigs) {
      i++;

      const { serveDir, path, url, thresholds, output_path } = auditConfig;
      const fullPath = [serveDir, path].join('/');

      let countMessage = '';
      if (auditConfigs.length > 1) {
        countMessage = ` (${i}/${auditConfigs.length})`;
      }

      console.log(`\nRunning Lighthouse on ${fullPath}${countMessage}`);

      const runner = serveDir ? runAuditWithServer : runAudit;
      const { errors, summary, shortSummary, details, report, runtimeError } =
        await runner({
          serveDir,
          path,
          url,
          thresholds,
          output_path,
          settings,
        });

      if (summary && !runtimeError) {
        console.log(' ');
        console.log(chalk.cyan.bold(`Lighthouse scores for ${fullPath}`));
        summary.map((item) => {
          console.log(`- ${item.title}: ${Math.floor(item.score * 100)}`);
        });
        console.log(' ');
      }

      if (runtimeError) {
        console.log({ runtimeError });
      }

      if (Array.isArray(errors) && errors.length > 0) {
        allErrors.push({ serveDir, url, errors });
      }

      data.push({
        path: fullPath,
        url,
        summary,
        shortSummary,
        details,
        report,
        runtimeError,
      });
    }

    const { error, summary, extraData } = processResults({
      data,
      errors: allErrors,
      show: onSuccess,
    });
    errorMetadata.push(...extraData);

    if (error && Object.keys(error).length !== 0) {
      throw error;
    }

    onSuccess({ summary, extraData });
  } catch (error) {
    if (error.details) {
      console.error(error.details);
      onFail(`${chalk.red('Failed with error:\n')}${error.message}`, {
        errorMetadata,
      });
    } else {
      onFail(`${chalk.red('Failed with error:\n')}`, {
        error,
        errorMetadata,
      });
    }
  }
};

export default onEvent;
