import puppeteer  from 'puppeteer';
import lighthouse from 'lighthouse';
import log from 'lighthouse-logger';

export const getBrowserPath = async () => {
  // In newer Puppeteer versions, we can get the executable path directly
  return puppeteer.executablePath();
};

export const runLighthouse = async (browserPath, url, settings) => {
  let chrome;
  try {
    const logLevel = 'error';
    log.setLevel(logLevel);
    chrome = await puppeteer.launch({
      executablePath: browserPath,
      args: [
        '--headless',
        '--no-sandbox',
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--remote-debugging-port=0'
      ],
      logLevel,
    });

    // Get the debugging port from the browser's websocket endpoint
    const browserWSEndpoint = chrome.wsEndpoint();
    const port = parseInt(browserWSEndpoint.split(':')[2].split('/')[0], 10);

    const results = await lighthouse(
      url,
      {
        port,
        output: 'html',
        logLevel,
      },
      settings,
    );
    return results;
  } finally {
    if (chrome) {
      await chrome.close();
    }
  }
};
