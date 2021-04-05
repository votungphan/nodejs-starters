import { existsSync, mkdirSync, createWriteStream } from 'fs';
import { resolve as resolvePath } from 'path';
import pinoms from 'pino-multi-stream';

/*
 * REF: check https://github.com/pinojs/pino/blob/master/docs/help.md
 * Log from the error level for the production, otherwise from the debug level
 * Log into both logs/logger.log and process.stdout
 */
const logLevel = process.env.NODE_ENV === 'production' ? 'error' : 'debug';

// Resolve the log directory under root directory of the application
// TODO: log path for the development and the production is different
const logDir = resolvePath(process.cwd(), 'logs');
if (!existsSync(logDir)) {
   mkdirSync(logDir);
}

/*
 * TODO: implement logging rotation as the extend of Writable from stream
 * REF: https://www.npmjs.com/package/rotating-file-stream
 */
const streams: pinoms.Streams = [
   { stream: pinoms.prettyStream() },
   {
      stream: createWriteStream(resolvePath(logDir, 'logger.log'), {
         flags: 'a',
      }),
   },
];

const logger = pinoms({ streams, level: logLevel });

if (process.env.NODE_ENV !== 'production') {
   logger.info('Logger is initialized at the debug level');
} else {
   logger.info('Logger is initialized at the error level');
}

export default logger;
