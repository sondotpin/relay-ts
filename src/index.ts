import App from './app';
import { logger } from './utils/logger';

const app = new App();

app.express.listen(3000, () => {
  logger.info('App listening on port 3000!')
});