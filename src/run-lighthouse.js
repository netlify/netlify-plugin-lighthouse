import puppeteer from 'puppeteer';
import lighthouse from 'lighthouse';
import log from 'lighthouse-logger';


export const runLighthouse = async (url, settings) => {
  let chrome;
  try {
    const logLevel = 'error';
    log.setLevel(logLevel);
    chrome = await puppeteer.launch({
      args: [
        '--headless=new',
        '--no-sandbox',
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--remote-debugging-port=0',
        '--disable-software-rasterizer',
        '--disable-setuid-sandbox',
        '--no-zygote',
      ],
      logLevel,
      ignoreDefaultArgs: ['--disable-extensions'],
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
