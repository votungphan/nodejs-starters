import dotenv from 'dotenv';
import { existsSync } from 'fs';
import { resolve as resolvePath } from 'path';
import logger from './logger';

export const isProduction = process.env.NODE_ENV === 'production';

if (isProduction && existsSync(resolvePath(process.cwd(), '.env'))) {
   logger.info('Using .env file in the production mode');
   dotenv.config({ path: resolvePath(process.cwd(), '.env') });
} else if (
   !isProduction &&
   existsSync(resolvePath(process.cwd(), '.env.example'))
) {
   logger.info('Using .env.example file in the development mode');
   dotenv.config({ path: resolvePath(process.cwd(), '.env.example') });
} else if (!isProduction && existsSync(resolvePath(process.cwd(), '.env'))) {
   logger.info('Using .env file in the pre-production mode');
   dotenv.config({ path: resolvePath(process.cwd(), '.env') });
} else {
   logger.info('Neither .env nor .env.example file is specified');
}

export const { ENVIRONMENT } = process.env;
logger.info('ENVIRONMENT is specify as %s', ENVIRONMENT);

export const { MONGODB_URI } = process.env;
export const { MONGODB_NAME } = process.env;
export const { MONGODB_SESSION } = process.env;
export const { SESSION_SECRET } = process.env;

/*
export const MONGODB_URI = 'mongodb://localhost:27017';
export const MONGODB_NAME = 'NodeExpressAppStarter';
export const MONGODB_SESSION = 'Sessions';
export const SESSION_SECRET = 'This is a secret';
*/
