import prefixString from '../prefix-string/index.js';

const processResults = ({ data, errors }) => {
  const err = {};
  if (errors.length > 0) {
    const error = errors.reduce(
      (acc, { path, url, errors }) => {
        const message = prefixString({
          path,
          url,
          str: errors.map((e) => e.message).join('\n'),
        });
        const details = prefixString({
          path,
          url,
          str: errors.map((e) => `${e.message}\n${e.details}`).join('\n'),
        });

        return {
          message: `${acc.message}\n${message}`,
          details: `${acc.details}\n${details}`,
        };
      },
      {
        message: '',
        details: '',
      },
    );
    err.message = error.message;
    err.details = error.details;
  }
  const reports = [];
  return {
    error: err,
    summary: data
      .map(
        ({
          path,
          url,
          summary,
          shortSummary,
          details,
          report,
          runtimeError,
        }) => {
          const obj = { report, details };

          if (!runtimeError && summary) {
            obj.summary = summary.reduce((acc, item) => {
              acc[item.id] = Math.round(item.score * 100);
              return acc;
            }, {});
          }

          if (runtimeError) {
            reports.push(obj);
            return `Error testing '${path || url}': ${runtimeError.message}`;
          }

          if (path) {
            obj.path = path;
            reports.push(obj);
            return `Summary for path '${path}': ${shortSummary}`;
          }
          if (url) {
            obj.url = url;
            reports.push(obj);
            return `Summary for url '${url}': ${shortSummary}`;
          }
          return `${shortSummary}`;
        },
      )
      .join('\n'),
    extraData: reports,
  };
};

export default processResults;
