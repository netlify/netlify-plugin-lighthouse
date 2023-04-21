import puppeteer from 'puppeteer';
import lighthouse from 'lighthouse';
import log from 'lighthouse-logger';
import chromeLauncher from 'chrome-launcher';

export const getBrowserPath = async () => {
  const browserFetcher = puppeteer.createBrowserFetcher();
  const revisions = await browserFetcher.localRevisions();
  if (revisions.length <= 0) {
    throw new Error('Could not find local browser');
  }
  const info = await browserFetcher.revisionInfo(revisions[0]);
  return info.executablePath;
};

export const runLighthouse = async (browserPath, url, settings) => {
  let chrome;
  try {
    const logLevel = 'error';
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
      await chrome.kill();
    }
  }
};
