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
      console.log('Puppeteer package:', JSON.stringify({
        version: puppeteer.version,
        browserRevision: puppeteer._preferredRevision
      }));
      
      try {
        console.log('Default browser path:', await puppeteer.executablePath());
      } catch (err) {
        console.log('Error getting default browser path:', err.message);
      }
      
      try {
        const browserFetcher = puppeteer.createBrowserFetcher();
        const revisionInfo = await browserFetcher.download();
        console.log('Browser download info:', revisionInfo);
      } catch (err) {
        console.log('Error downloading browser:', err.message);
      }
      
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
        
        try {
          const execPath = await puppeteer.resolveExecutablePath();
          console.log('Resolved executable path:', execPath);
          launchConfig.executablePath = execPath;
        } catch (err) {
          console.log('Error resolving executable path:', err.message);
        }
        
        // Add product and channel settings
        launchConfig.product = 'chrome';
        launchConfig.channel = 'chrome';
        
        console.log('Final launch config:', launchConfig);
        browser = await puppeteer.launch(launchConfig);

        // Get browser information
        console.log('Browser launched successfully');
        
        const wsEndpoint = browser.wsEndpoint();
        console.log('Browser WebSocket endpoint:', wsEndpoint);
        
        // Use the launch config's executable path for chrome-launcher
        if (launchConfig.executablePath) {
          console.log(`Using Chrome at: ${launchConfig.executablePath}`);
          launchOptions.chromePath = launchConfig.executablePath;
        } else {
          console.log('Using default Chrome path');
        }
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
