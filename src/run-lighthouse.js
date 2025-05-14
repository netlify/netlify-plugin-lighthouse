import lighthouse from 'lighthouse';
import chromeLauncher from 'chrome-launcher';
import log from 'lighthouse-logger';
import puppeteer from 'puppeteer-core';

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

    // Launch Chrome using puppeteer-core
    try {
      console.log('Launching Chrome with puppeteer-core...');
      const browser = await puppeteer.launch({
        channel: 'chrome',
        headless: 'new',
        args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage']
      });

      const browserPath = browser.executablePath();
      await browser.close();

      console.log(`Found Chrome at: ${browserPath}`);
      launchOptions.chromePath = browserPath;
    } catch (error) {
      console.log('Error launching Chrome with puppeteer:', error.message);
      if (process.env.CHROME_PATH) {
        console.log(`Falling back to CHROME_PATH: ${process.env.CHROME_PATH}`);
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
