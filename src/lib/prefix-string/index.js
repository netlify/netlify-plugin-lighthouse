import chalk from 'chalk';

const prefixString = ({ path, url, str }) => {
  if (path) {
    return `\n${chalk.red('Error')} for directory '${chalk.cyan(
      path,
    )}':\n${str}`;
  } else if (url) {
    return `\n${chalk.red('Error')} for url '${chalk.cyan(url)}':\n${str}`;
  } else {
    return `\n${str}`;
  }
};

export default prefixString;
