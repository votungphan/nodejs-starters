import dotenv from 'dotenv';
import { existsSync } from 'fs';
import { resolve as resolvePath } from 'path';
import logger from './logger';

export const isProduction = process.env.NODE_ENV === 'production';
export const ENVIRONMENT = isProduction ? 'production' : 'development';

/*
 * TODO: need to update the path if running with the built package
 */
const pathSafeENV = resolvePath(process.cwd(), '.env.example');
const pathProdENV = resolvePath(process.cwd(), '.env');

const safeENV = existsSync(pathSafeENV);
const prodENV = existsSync(pathProdENV);

/*
 * Load env variables with or without SAFE_ENV
 * for both of the development and the production modes
 */
const { SAFE_ENV } = process.env;

if (!SAFE_ENV && prodENV) {
   logger.info(
      'Using .env for the %s mode with SAFE_ENV as %s',
      ENVIRONMENT,
      SAFE_ENV,
   );
   dotenv.config({ path: pathProdENV });
} else if (SAFE_ENV && safeENV) {
   logger.info(
      'Using .env.example for the %s mode with SAFE_ENV=%s',
      ENVIRONMENT,
      SAFE_ENV,
   );
   dotenv.config({ path: pathSafeENV });
} else {
   logger.info('Neither .env nor .env.example file is specified');
}

export const { MONGODB_URI } = process.env;
export const { MONGODB_NAME } = process.env;
export const { MONGODB_SESSION } = process.env;
export const { SESSION_SECRET } = process.env;

/*
 * TODO: need to validate required environment variables
 * Example: SESSION_SECRET is required if MONGODB_URI specified
 */
