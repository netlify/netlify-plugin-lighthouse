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
      // Check for Chrome in Netlify environment first
      const chromePaths = [
        '/opt/buildhome/.cache/puppeteer/chrome/linux-119.0.6045.105/chrome-linux64/chrome',
        '/usr/bin/google-chrome',
        '/usr/bin/chromium-browser'
      ];
      
      let executablePath;
      for (const path of chromePaths) {
        try {
          await fs.promises.access(path);
          executablePath = path;
          console.log('Found Chrome at:', path);
          break;
        } catch (err) {
          console.log(`Chrome not found at ${path}`);
        }
      }
      
      if (!executablePath) {
        console.log('No Chrome installation found, using bundled Chromium');
        // Let puppeteer use its bundled version
        executablePath = undefined;
      }
      
      // Use /tmp directory which should be writable in Netlify
      const cacheDirectory = '/tmp/puppeteer';
      console.log('Using cache directory:', cacheDirectory);
      
      // Ensure cache directory exists
      try {
        await fs.promises.mkdir(cacheDirectory, { recursive: true });
        console.log('Cache directory created/verified');
      } catch (err) {
        console.warn('Could not create cache directory:', err.message);
      }
      
      // Launch browser for Lighthouse with specific configuration for Netlify
      let browser;
      try {
        const launchConfig = {
          headless: 'new',
          ...(executablePath ? { executablePath } : {}),
          args: [
            '--no-sandbox',
            '--disable-gpu',
            '--disable-dev-shm-usage',
            '--disable-software-rasterizer',
            '--disable-setuid-sandbox',
            '--no-zygote'
          ],
          cacheDirectory
        };
        
        console.log('Launching browser with config:', launchConfig);
        browser = await puppeteer.launch(launchConfig);

        // Get browser information
        const browserPath = browser.executablePath();
        const wsEndpoint = browser.wsEndpoint();
        
        console.log('Browser launched successfully');
        console.log('Browser WebSocket endpoint:', wsEndpoint);
        console.log(`Found Chrome at: ${browserPath}`);
        
        launchOptions.chromePath = browserPath;
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
      throw error;
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
