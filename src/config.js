const chalk = require('chalk');
const { join } = require('path');

const getServePath = (dir, path) => {
  if (typeof path !== 'string' || typeof dir !== 'string') {
    return { path: undefined };
  }

  const resolvedPath = join(dir, path);
  if (!resolvedPath.startsWith(dir)) {
    throw new Error(
      chalk.red(
        `resolved path for ${chalk.red(
          path,
        )} is outside publish directory ${chalk.red(dir)}`,
      ),
    );
  }

  return { path: resolvedPath };
};

const getConfiguration = ({ constants, inputs } = {}) => {
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
    audits = [{ path: serveDir, url: auditUrl, thresholds }];
  } else {
    audits = audits.map((a) => {
      return {
        ...a,
        thresholds: a.thresholds || thresholds,
        ...getServePath(serveDir, a.path),
      };
    });
  }

  return { audits };
};

module.exports = {
  getConfiguration,
};
