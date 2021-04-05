import expressSession from 'express-session';
import mongodbStore from 'connect-mongodb-session';
import logger from './logger';

import {
   MONGODB_URI,
   MONGODB_NAME,
   MONGODB_SESSION,
   SESSION_SECRET,
} from './secrets';

const MongoDBStore = mongodbStore(expressSession);
const sessionStore = new MongoDBStore({
   uri: MONGODB_URI || '',
   databaseName: MONGODB_NAME as string,
   collection: MONGODB_SESSION as string,
});

sessionStore.on('error', (error) => {
   logger.error(`MongoDB session error: ${error}`);
});

const session = expressSession({
   secret: SESSION_SECRET as string,
   cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }, // 1 week to be expired
   store: sessionStore,
   resave: true,
   saveUninitialized: true,
});

logger.info('Initialize mongoDB to store Express app session');

export default session;
