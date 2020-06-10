const httpServer = require('http-server');
const puppeteer = require('puppeteer');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
require('dotenv').config();

const getServer = (url, serveDir) => {
  if (url) {
    console.log(`Scanning url '${url}'`);
    // return a mock server for readability
    const server = {
      listen: async (func) => {
        await func();
      },
      close: () => undefined,
    };
    return { server, url };
  }

  if (!serveDir) {
    throw new Error('Empty publish dir');
  }

  console.log(`Serving and scanning site from directory '${serveDir}'`);
  const s = httpServer.createServer({ root: serveDir });
  const port = 5000;
  const host = 'localhost';
  const server = {
    listen: (func) => s.listen(port, host, func),
    close: () => s.close(),
  };
  return { url: `http://${host}:${port}`, server };
};

const belowThreshold = (id, expected, results) => {
  const category = results.find((c) => c.id === id);
  if (!category) {
    console.warn('Could not find category', id);
  }
  const actual = category ? category.score : Number.MAX_SAFE_INTEGER;
  return actual < expected;
};

const getError = (id, expected, results) => {
  const category = results.find((c) => c.id === id);
  return `Expected category '${category.title}' to be greater or equal to '${expected}' but got '${category.score}'`;
};

module.exports = {
  onSuccess: async ({
    constants: { PUBLISH_DIR: serveDir = process.env.PUBLISH_DIR } = {},
    utils,
    inputs: {
      audit_url: auditUrl = process.env.AUDIT_URL,
      thresholds = process.env.THRESHOLDS || {},
    } = {},
  } = {}) => {
    try {
      utils = utils || {
        build: {
          failBuild: () => {
            process.exit(1);
          },
        },
        status: {
          show: () => undefined,
        },
      };

      if (typeof thresholds === 'string') {
        thresholds = JSON.parse(thresholds);
      }

      const { server, url } = getServer(auditUrl, serveDir);
      const browserFetcher = puppeteer.createBrowserFetcher();
      const revisions = await browserFetcher.localRevisions();
      if (revisions.length <= 0) {
        throw new Error('Could not find local browser');
      }
      const info = await browserFetcher.revisionInfo(revisions[0]);

      const { error, results } = await new Promise((resolve) => {
        server.listen(async () => {
          let chrome;
          try {
            chrome = await chromeLauncher.launch({
              chromePath: info.executablePath,
              chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu'],
            });
            const results = await lighthouse(url, {
              port: chrome.port,
            });
            if (results.lhr.runtimeError) {
              resolve({ error: new Error(results.lhr.runtimeError.message) });
            }
            resolve({ error: false, results });
          } catch (error) {
            resolve({ error });
          } finally {
            if (chrome) {
              await chrome.kill().catch(() => undefined);
            }
            server.close();
          }
        });
      });
      if (error) {
        throw error;
      } else {
        const categories = Object.values(
          results.lhr.categories,
        ).map(({ title, score, id }) => ({ title, score, id }));

        const errors = Object.entries(thresholds)
          .filter(([id, expected]) => belowThreshold(id, expected, categories))
          .map(([id, expected]) => getError(id, expected, categories));

        const summary = JSON.stringify({ results: categories }, null, 2);
        console.log(summary);
        utils.status.show({
          summary,
        });

        if (errors.length > 0) {
          throw new Error(errors.join('\n'));
        }
      }
    } catch (error) {
      console.error(`\nError: ${error.message}\n`);
      utils.build.failBuild(`failed with error: ${error.message}`);
    }
  },
};
