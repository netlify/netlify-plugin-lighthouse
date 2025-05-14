import fs from 'fs';

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

    // Launch Chrome using puppeteer
    try {
      console.log('Launching Chrome with puppeteer...');
      
      // Set Puppeteer browser path to a writable location
      const browserPath = '/tmp/puppeteer/chrome/linux-136.0.7103.92/chrome-linux64/chrome';
      process.env.PUPPETEER_BROWSER_PATH = browserPath;
      console.log('Setting Puppeteer browser path:', process.env.PUPPETEER_BROWSER_PATH);
      
      // Create the directory structure if it doesn't exist
      try {
        await fs.promises.mkdir('/tmp/puppeteer/chrome/linux-136.0.7103.92/chrome-linux64', { recursive: true });
        console.log('Browser directory structure created');
      } catch (err) {
        console.error('Error creating browser directory:', err.message);
      }
      
      // Verify the browser path exists
      try {
        await fs.promises.access(browserPath);
        console.log('Browser exists at:', browserPath);
        launchOptions.chromePath = browserPath;
      } catch (err) {
        console.log('Browser not found at configured path, will use default');
      }
      
      // Launch browser for Lighthouse with specific configuration for Netlify
      let browser;
      try {
        const launchConfig = {
          headless: 'new',
          args: [
            '--no-sandbox',
            '--disable-gpu',
            '--disable-dev-shm-usage',
            '--disable-software-rasterizer',
            '--disable-setuid-sandbox',
            '--no-zygote'
          ]
        };
        
        console.log('Launching browser with config:', launchConfig);
        browser = await puppeteer.launch(launchConfig);
        console.log('Browser launched successfully');
        
        const wsEndpoint = browser.wsEndpoint();
        console.log('Browser WebSocket endpoint:', wsEndpoint);
      } finally {
        if (browser) {
          try {
            await browser.close();
            console.log('Browser closed successfully');
          } catch (err) {
            console.warn('Error closing browser:', err);
          }
        }
      }
    } catch (error) {
      console.error('Error launching Chrome with puppeteer:', error);
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
