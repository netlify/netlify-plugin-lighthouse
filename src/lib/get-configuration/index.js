import chalk from 'chalk';

import getServePath from '../get-serve-path/index.js';

const getConfiguration = ({ constants, inputs, deployUrl } = {}) => {
  const useDeployUrl = !!deployUrl;

  const serveDir =
    (constants && constants.PUBLISH_DIR) || process.env.PUBLISH_DIR;

  const auditUrl = (inputs && inputs.audit_url) || process.env.AUDIT_URL;

  if (auditUrl) {
    console.warn(
      `${chalk.yellow(
        'inputs.audit_url',
      )} is deprecated, please use ${chalk.green('inputs.audits')}`,
    );
  }

  const output_path = (inputs && inputs.output_path) || process.env.OUTPUT_PATH;

  let thresholds =
    (inputs && inputs.thresholds) || process.env.THRESHOLDS || {};

  if (typeof thresholds === 'string') {
    try {
      thresholds = JSON.parse(thresholds);
    } catch (e) {
      throw new Error(`Invalid JSON for 'thresholds' input: ${e.message}`);
    }
  }

  let audits = (inputs && inputs.audits) || process.env.AUDITS;
  if (typeof audits === 'string') {
    try {
      audits = JSON.parse(audits);
    } catch (e) {
      throw new Error(`Invalid JSON for 'audits' input: ${e.message}`);
    }
  }

  let auditConfigs = [];

  /** TODO: Simplify this…
   *  When using a deployUrl (testing against the live deployed site), we don't
   *  need to serve the site, so we can skip the serveDir and output_path
   */

  if (!Array.isArray(audits)) {
    auditConfigs = [
      {
        serveDir: useDeployUrl ? undefined : serveDir,
        url: useDeployUrl ? deployUrl : auditUrl,
        thresholds,
        output_path: useDeployUrl ? undefined : output_path,
      },
    ];
  } else {
    auditConfigs = audits.map((a) => {
      return {
        ...a,
        thresholds: a.thresholds || thresholds,
        output_path: useDeployUrl ? undefined : a.output_path || output_path,
        url: useDeployUrl ? deployUrl : a.url,
        serveDir: useDeployUrl
          ? undefined
          : getServePath(serveDir, a.serveDir ?? ''),
      };
    });
  }

  return { auditConfigs };
};

export default getConfiguration;
