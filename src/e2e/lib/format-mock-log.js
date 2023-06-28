import stripAnsi from 'strip-ansi';

const formatMockLog = (log) => {
  return log.flat().map(stripAnsi);
};

export default formatMockLog;
