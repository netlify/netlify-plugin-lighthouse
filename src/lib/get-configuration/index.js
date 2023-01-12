const chalk = require('chalk');
const getServePath = require('../get-serve-path');

const getConfiguration = ({ constants, inputs } = {}) => {
  const serveDir =
    (constants && constants.PUBLISH_DIR) || process.env.PUBLISH_DIR;

  const auditUrl = (inputs && inputs.audit_url) || process.env.AUDIT_URL;

  const output_path = (inputs && inputs.output_path) || process.env.OUTPUT_PATH;

  if (auditUrl) {
    console.warn(
      `${chalk.yellow(
        'inputs.audit_url',
      )} is deprecated, please use ${chalk.green('inputs.audits')}`,
    );
  }

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

  if (!Array.isArray(audits)) {
    audits = [{ serveDir, url: auditUrl, thresholds, output_path }];
  } else {
    audits = audits.map((a) => {
      return {
        ...a,
        thresholds: a.thresholds || thresholds,
        output_path: a.output_path || output_path,
        ...getServePath(serveDir, a.serveDir ?? ''),
      };
    });
  }

  return { audits };
};

module.exports = getConfiguration;
