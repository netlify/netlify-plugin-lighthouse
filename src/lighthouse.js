// we set DEBUG_COLORS = 'true' to prevent the logger from prefixing a date when running in tty
// keep the old DEBUG_COLORS value so we can return it to the original value
let debugColorsSet = false;
let debugColorsOriginalValue;
if ('DEBUG_COLORS' in process.env) {
  debugColorsSet = true;
  debugColorsOriginalValue = process.env.DEBUG_COLORS;
}
process.env.DEBUG_COLORS = 'true';

const puppeteer = require('puppeteer');
const lighthouse = require('lighthouse');
const log = require('lighthouse-logger');
const chromeLauncher = require('chrome-launcher');

// we can return the original value after requiring the dependencies
if (debugColorsSet) {
  process.env.DEBUG_COLORS = debugColorsOriginalValue;
} else {
  delete process.env.DEBUG_COLORS;
}

const getBrowserPath = async () => {
  console.log('GETTING BROWSER PATH');
  const browserFetcher = puppeteer.createBrowserFetcher({
    path: '~/.cache/puppeteer',
  });
  const revisionInfo = await await browserFetcher.download('1069273');
  console.log('LOCAL REVISISIONS', revisionInfo);
  if (!revisionInfo) {
    throw new Error('Could not find local browser');
  }
  // const info = await browserFetcher.revisionInfo(revisions[0]);
  return revisionInfo.executablePath;
};

const runLighthouse = async (browserPath, url, settings) => {
  let chrome;
  try {
    const logLevel = 'info';
    log.setLevel(logLevel);
    chrome = await chromeLauncher.launch({
      chromePath: browserPath,
      chromeFlags: [
        '--headless',
        '--no-sandbox',
        '--disable-gpu',
        '--disable-dev-shm-usage',
      ],
      logLevel,
    });
    const results = await lighthouse(
      url,
      {
        port: chrome.port,
        output: 'html',
        logLevel,
      },
      settings,
    );
    return results;
  } finally {
    if (chrome) {
      await chrome.kill().catch(() => undefined);
    }
  }
};

module.exports = {
  getBrowserPath,
  runLighthouse,
};
