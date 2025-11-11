import { execSync } from 'child_process';

import chromeLauncher from 'chrome-launcher';
import lighthouse from 'lighthouse';
import log from 'lighthouse-logger';
import puppeteer from 'puppeteer';

export const getBrowserPath = async () => {
  // First, try to find Chrome using chromeLauncher
  // This works well on CI environments like Netlify
  try {
    const installations = chromeLauncher.getChromePath();
    if (installations) {
      return installations;
    }
  } catch (error) {
    // chromeLauncher.getChromePath() failed, continue to next method
  }

  // Try to find Chrome using common paths
  try {
    const chromePath = execSync(
      'which google-chrome || which chromium-browser || which chromium',
      {
        encoding: 'utf8',
        stdio: ['pipe', 'pipe', 'ignore'],
      },
    ).trim();
    if (chromePath) {
      return chromePath;
    }
  } catch (error) {
    // which command failed, continue to next method
  }

  // Fall back to using puppeteer's bundled Chrome (if available)
  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'],
    });
    const path = browser.process().spawnfile;
    await browser.close();
    return path;
  } catch (error) {
    throw new Error(
      'Could not find Chrome. Please ensure Chrome is installed on the system.',
    );
  }
};

export const runLighthouse = async (browserPath, url, settings) => {
  let chrome;
  try {
    const logLevel = 'error';
    log.setLevel(logLevel);
    chrome = await chromeLauncher.launch({
      chromePath: browserPath,
      chromeFlags: [
        '--headless',
        '--no-sandbox',
        '--disable-gpu',
        '--disable-dev-shm-usage',
      ],
      logLevel,
    });
    const results = await lighthouse(
      url,
      {
        port: chrome.port,
        output: 'html',
        logLevel,
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
