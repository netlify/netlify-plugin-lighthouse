import puppeteer from 'puppeteer';
import lighthouse from 'lighthouse';
import log from 'lighthouse-logger';
import chromeLauncher from 'chrome-launcher';

export const getBrowserPath = async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage']
  });
  const path = browser.process().spawnfile;
  await browser.close();
  console.log('got browser path : ', path);
  return path;
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
