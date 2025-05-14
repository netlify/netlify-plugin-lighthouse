import lighthouse from 'lighthouse';
import chromeLauncher from 'chrome-launcher';
import log from 'lighthouse-logger';

// Common Chrome paths in CI environments
const CI_CHROME_PATHS = [
  '/usr/bin/google-chrome',
  '/usr/bin/google-chrome-stable',
];

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

    // In CI, Chrome might be installed in a custom location
    if (process.env.CHROME_PATH) {
      console.log(`Using Chrome from: ${process.env.CHROME_PATH}`);
      launchOptions.chromePath = process.env.CHROME_PATH;
    } else {
      // Try common CI paths
      for (const path of CI_CHROME_PATHS) {
        try {
          const { execSync } = await import('child_process');
          execSync(`test -f ${path}`);
          launchOptions.chromePath = path;
          console.log(`Found Chrome at: ${path}`);
          break;
        } catch (e) {
          // Path doesn't exist, try next one
          continue;
        }
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
