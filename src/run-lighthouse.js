import lighthouse from 'lighthouse';
import chromeLauncher from 'chrome-launcher';
import log from 'lighthouse-logger';

export const runLighthouse = async (url, settings) => {
  let chrome;
  try {
    const logLevel = settings?.logLevel || 'error';
    log.setLevel(logLevel);

    // Launch Chrome using chrome-launcher
    chrome = await chromeLauncher.launch({
      chromeFlags: [
        '--headless=new',
        '--no-sandbox',
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--disable-software-rasterizer',
        '--disable-setuid-sandbox',
        '--no-zygote',
      ],
      logLevel,
      handleSIGINT: true,
    });

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
    return results;
  } finally {
    if (chrome) {
      await chrome.kill();
    }
  }
};
