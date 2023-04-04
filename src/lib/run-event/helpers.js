export const formatStartMessage = ({ count, path, formFactor, locale }) => {
  const message = ['Running Lighthouse on', path];

  // Build a list of settings used for this run.
  const settings = [];
  if (locale) {
    settings.push(`the “${locale}” locale`);
  }
  if (formFactor === 'desktop') {
    settings.push('the “desktop” preset');
  }
  if (settings.length) {
    message.push(`using ${settings.join(' and ')}`);
  }

  if (count?.total > 1) {
    message.push(`(${count.i}/${count.total})`);
  }

  return message.join(' ');
};
