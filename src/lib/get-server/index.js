import express from 'express';
import compression from 'compression';
import chalk from 'chalk';

const getServer = ({ serveDir, auditUrl }) => {
  if (auditUrl) {
    // return a mock server for readability
    const server = {
      listen: async (func) => {
        console.log(`Scanning url ${chalk.magenta(auditUrl)}`);
        await func();
      },
      close: () => undefined,
      url: auditUrl,
    };
    return { server };
  }

  if (!serveDir) {
    throw new Error('Empty publish dir');
  }

  const app = express();
  app.use(compression());
  app.use(express.static(serveDir));

  const port = 5100;
  const host = 'localhost';

  const server = {
    listen: (func) => {
      console.log(
        `Serving and scanning site from directory ${chalk.magenta(serveDir)}`,
      );
      return app.listen(port, host, func);
    },
    close: (instance) => instance.close(),
    url: `http://${host}:${port}`,
  };
  return { server };
};

export default getServer;
