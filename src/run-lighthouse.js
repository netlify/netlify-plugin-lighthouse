import lighthouse from 'lighthouse';
import puppeteer from 'puppeteer';
import log from 'lighthouse-logger';

export const runLighthouse = async (url, settings) => {
  let browser;
  try {
    const logLevel = settings?.logLevel || 'error';
    log.setLevel(logLevel);

    // Launch Chrome using Puppeteer with CI-friendly flags
    browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--disable-software-rasterizer',
        '--disable-setuid-sandbox',
        '--no-zygote',
        '--disable-web-security',
        '--allow-running-insecure-content',
        '--disable-features=IsolateOrigins,site-per-process',
      ],
      ignoreDefaultArgs: ['--enable-automation'],
    });

    // Get the browser's websocket endpoint and extract the port
    const browserWSEndpoint = browser.wsEndpoint();
    const port = parseInt(browserWSEndpoint.split(':')[2].split('/')[0], 10);

    const results = await lighthouse(
      url,
      {
        port,
        output: 'html',
        logLevel,
        onlyCategories: settings?.onlyCategories,
        locale: settings?.locale || 'en-US',
        formFactor: settings?.preset === 'desktop' ? 'desktop' : 'mobile',
      },
      settings,
    );
    return results;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};
