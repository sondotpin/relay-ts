import * as express from 'express';
import { json, urlencoded } from 'body-parser';

import { logger, weblogger } from './utils/logger';
import { Routes } from './routes';

class App {
  public express: express.Express;

  public constructor() {
    logger.info('Starting App');

    this.express = express();
    this.express.use(json()); // for parsing application/json
    this.express.use(urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
    this.express.use(weblogger);

    this.mountRoutes().then((): void => {
      logger.info('Routes ready!');
    });
  }

  private async mountRoutes(): Promise<void> {
    const router = Routes.initialize(express.Router());
    this.express.use('/', router);
  }
}

export default App;