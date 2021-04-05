import { resolve as resolvePath } from 'path';
import express from 'express';
import * as eta from 'eta';

import logger from './util/logger';
import session from './util/session';

// Controllers route handlers
import * as homeController from './controllers/home';

logger.info('Eta configuration');
eta.configure({ cache: false, async: true });

logger.info('Initialize the Express app');
const app = express();
const isProduction = app.get('env') === 'production';

logger.info('Initialize Express app session');
app.use(session);

logger.info('Configure where to look for the app views');
app.set('views', resolvePath(process.cwd(), 'src/views'));

logger.info('Register Eta as the app engine');
app.engine('.eta', eta.renderFileAsync);

logger.info('Register the .eta ext as the app view engine');
app.set('view engine', 'eta');

if (!isProduction) {
   logger.info('Disable views caching in the %s mode', app.get('env'));
   app.set('view cache', false);
}

// Route the Home page as @route GET /
app.get('/', homeController.default);

export default app;
