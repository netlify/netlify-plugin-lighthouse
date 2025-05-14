import lighthouse from 'lighthouse';
import chromeLauncher from 'chrome-launcher';
import log from 'lighthouse-logger';
import puppeteer from 'puppeteer';

export const runLighthouse = async (url, settings) => {
  let chrome;
  try {
    const logLevel = settings?.logLevel || 'error';
    log.setLevel(logLevel);

    console.log('Launching Chrome...');
    // Launch Chrome with minimal flags
    const launchOptions = {
      chromeFlags: [
        '--headless=new',
        '--no-sandbox',
        '--disable-gpu',
        '--disable-dev-shm-usage',
      ],
      logLevel,
      handleSIGINT: true,
    };

    // Get browser executable from puppeteer
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage']
    });
    
    try {
      const browserPath = browser.executablePath();
      console.log(`Using Chrome from puppeteer: ${browserPath}`);
      launchOptions.chromePath = browserPath;
      await browser.close();
    } catch (error) {
      await browser.close();
      // Fallback to environment variable if puppeteer's Chrome is not available
      if (process.env.CHROME_PATH) {
        console.log(`Using Chrome from environment: ${process.env.CHROME_PATH}`);
        launchOptions.chromePath = process.env.CHROME_PATH;
      } else {
        console.log('Letting chrome-launcher find Chrome...');
      }
    }

    chrome = await chromeLauncher.launch(launchOptions);
    console.log('Chrome launched on port:', chrome.port);
    console.log('Starting Lighthouse audit for URL:', url);
    const results = await lighthouse(
      url,
      {
        port: chrome.port,
        output: 'html',
        logLevel,
        onlyCategories: settings?.onlyCategories,
        locale: settings?.locale || 'en-US',
        formFactor: settings?.preset === 'desktop' ? 'desktop' : 'mobile',
      },
      settings,
    );
    console.log('Lighthouse audit completed');
    return results;
  } catch (error) {
    console.error('Error during Lighthouse run:', error);
    throw error;
  } finally {
    if (chrome) {
      console.log('Cleaning up Chrome...');
      await chrome.kill();
    }
  }
};
