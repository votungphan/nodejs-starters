# Default Node.js Starter Development Guide

## Selected Tools

The default Node.js Starter Kit is with following selected tools:

-  [Node.js](https://nodejs.org/en/) JavaScript runtime
-  [ExpressJS](https://expressjs.com/) Node.js web application framework
-  [TypeScript](https://www.typescriptlang.org/) open-source language
-  [ESLint](https://eslint.org/) JavaScript Linter
-  [Airbnb](https://github.com/airbnb/javascript) style guide
-  [Prettier](https://prettier.io/docs/en/integrating-with-linters.html) code formatter
-  [Babel](https://babeljs.io/blog/2020/07/13/the-state-of-babel-eslint) JavaScript compiler
-  [pino](https://github.com/pinojs/pino) for logging
-  [dotenv-safe](https://www.npmjs.com/package/dotenv-safe) for environment variables
-  [Bootstrap](https://getbootstrap.com/) front-end framework
-  [Eta](https://eta.js.org/) template engine
-  [Nodemon](https://nodemon.io/) tool to restart node app automatically
-  [Browsersync](https://browsersync.io/) tool to synchronize browser
-  [Jest](https://jestjs.io/) JavaScript Testing Framework
-  [SuperTest](https://github.com/visionmedia/supertest) for testing HTTP

## The Step by Step Guide

Here is the basic steps to create the Default Node.js Starter for a modern web app development with above selected tools:

-  Node.js and ExpressJS project initialization:

```bash
# Fill out the prompts to initialize a package.json
npm init
# Install ExpressJS as NodeJS web application framework
npm install express --save-dev
```

-  ExpressJS Installation:

```bash
npm install express
```

-  Enable to support TypeScript:

```bash
# Install TypeScript and declaration for Node.js
npm install typescript ts-node @types/node @types/express --save-dev
# Fill out the prompts to initialize a tsconfig.json
npx tsc --init
```

-  Enable ESLint and Prettier following the good [reference](https://gist.github.com/bradtraversy/aab26d1e8983d9f8d79be1a9ca894ab4):

```bash
# Install ESLint and useful modules
npm install eslint eslint-plugin-import --save-dev
npm install eslint-config-airbnb-base eslint-config-airbnb-typescript --save-dev
# Install Prettier and ESLint integration
npm install prettier eslint-plugin-prettier eslint-config-prettier --save-dev
# Fill out the prompts to initialize a .eslintrc.js
npx eslint --init
# ESLint to support TypeScript
npm install @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
```

```javascript
// Prettier configuration file .prettierrc.js
module.exports = {
   tabWidth: 3,
   semi: true,
   singleQuote: true,
   trailingComma: 'all',
   printWidth: 80,
};
```

```javascript
// ESLint configuration file .eslintrc.js
module.exports = {
   extends: [
      'eslint:recommended',
      'airbnb-base',
      'plugin:prettier/recommended',
   ],
   plugins: ['prettier'],
   overrides: [
      {
         files: ['**.js'],
         parser: '@babel/eslint-parser',
         plugins: ['@babel', 'prettier'],
      },
      {
         files: ['**.ts'],
         parser: '@typescript-eslint/parser',
         extends: [
            'airbnb-typescript/base',
            'plugin:@typescript-eslint/recommended',
            'plugin:prettier/recommended',
         ],
         plugins: ['@typescript-eslint', 'prettier'],
         parserOptions: {
            project: './tsconfig.json',
         },
      },
   ],
};
```

-  Enable Babel compiler supporting ESLint, Prettier, TypeScript:

```bash
# Install Babel and useful plugins
npm install @babel/core @babel/plugin-proposal-class-properties @babel/plugin-proposal-object-rest-spread --save-dev
# Enable TypeScript support
npm install @babel/preset-env --save-dev
# Integrate into ESLint, Airbnb
npm install babel-preset-airbnb @babel/eslint-parser @babel/eslint-plugin --save-dev
```

```javascript
// Minimal Babel javascript configuration file (.babelrc.js)
module.exports = {
   presets: ['airbnb', '@babel/preset-env'],
   plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-object-rest-spread',
   ],
};
```

-  Create the "Hello, World!" Express application:

```typescript
// src/app.ts
import express from 'express';

const app = express();

app.get('/', (req, res) => {
   res.send('Hello, World! from Express First App');
});

export default app;
```

```typescript
// src/server.ts
import app from './app';

app.set('port', 3000);

const server = app.listen(app.get('port'), () => {
   console.log(
      'App is running at http://localhost:%d in %s mode',
      app.get('port'),
      app.get('env'),
   );
});

export default server;
```

```bash
# Add script "server-ts": "npx ts-node src/server.ts" into package.json
npm run server-ts
```

-  Enable Nodemon to watch for changes to compile automatically:

```json
// src/config/nodemon.json
{
   "restartable": "rs",
   "ignore": [".git", "node_modules/", "dist/"],
   "verbose": true,
   "execMap": {
      "ts": "node -r ts-node/register"
   },
   "watch": ["src/"],
   "env": {
      "NODE_ENV": "development"
   },
   "ext": "js,jsx,json,ts,tsx,html,css,eta"
}
```

```bash
# Add script "watch-ts": "npx nodemon --config src/config/nodemon.json src/server.ts" into package.json
npm install nodemon --save-dev
npm run watch-ts
```

-  Enable Browsersync to synchronize browser automatically with Nodemon:

```typescript
// Update src/server.ts to use Browsersync
import app from './app';

import browserSync from 'browser-sync';

app.set('port', 3000);

const server = app.listen(app.get('port'), () => {
   browserSync({
      proxy: 'localhost:' + app.get('port'),
      files: ['./src/**.*'],
   });
   console.log(
      'App is running at http://localhost:%d in %s mode',
      app.get('port'),
      app.get('env'),
   );
   console.log('  Press CTRL-C to stop\n');
});

export default server;
```

```bash
# Install browsersync
npm install browser-sync @types/browser-sync --save-dev
npm run watch-ts
```

-  Enable Jest and Supertest for testing

```typescript
// test/jest/home.test.ts to test the home page
import request from 'supertest';
import app from '../../src/app';

describe('GET /', () => {
   it('should return 200 OK', (done) => {
      request(app).get('/').expect(200, done);
   });
});
```

```bash
npm install jest ts-jest @types/jest supertest @types/supertest --save-dev
# Initialize a jest.config.js then update to support TypeScript
npx jest --init
# Add "test:jest": "npx jest --forceExit --coverage --verbose"
npm run test:jest
```

-  Implement a simple logger for logging and removing the eslint no-console failures:

```bash
# Install required packages
npm install pino-pretty pino-multi-stream @types/pino-multi-stream --save-prod
```

```typescript
// file: src/util/logger.ts
import fs from 'fs';
import pinoms from 'pino-multi-stream';

const streams: pinoms.Streams = [
   { stream: pinoms.prettyStream() },
   { stream: fs.createWriteStream('logger.log', { flags: 'a' }) },
];
const logger = pinoms({ streams, level: logLevel });

export default logger;
```

-  Enable Bootstrap 5 and Eta template engine

```bash
# Install Eta template engine
npm install eta --save-prod

# Download Bootstrap 5 starter to update as below
src/views/
├── home/
│   ├── home.css
│   └── home.eta
└── partials/
    ├── footer.eta
    ├── head.eta
    ├── header.eta
    └── layout.eta
```

```typescript
// Update the Home page controller: src/controllers/home.ts
const home = (req: Request, res: Response): unknown => {
   return res
      .status(200)
      .set('cache-control', 'no-store')
      .render('home/home', etaVariables);
};
```

```typescript
// Update the Express app to enable Eta: src/app.ts
import * as eta from 'eta';

// Configure where to look for the app views (.eta files)
app.set('views', resolvePath(process.cwd(), 'src/views'));

// Register Eta as the app engine
app.engine('.eta', eta.renderFileAsync);

// Register the .eta file as the app view engine
app.set('view engine', 'eta');
```

-  Enable useful middleware and tools for NodeJS ExpressJS application:

```bash
# Install Error Handler for the fullstack error trace
# http://expressjs.com/en/resources/middleware/errorhandler.html
npm install errorhandler @types/errorhandler --save-dev
# Install dotenv and cross-env to manage environment variables
npm install dotenv cross-env --save-dev
```

```typescript
// Update src/server.ts
import errorHandler from 'errorhandler';
import app from './app';
if (app.get('env') !== 'production') {
   app.use(errorHandler());
}
```

```typescript
// Update src/util/secrets.ts to load the right env
import dotenv from 'dotenv';
import { existsSync } from 'fs';
import { resolve as resolvePath } from 'path';
import logger from './logger';

const pathSafeENV = resolvePath(process.cwd(), '.env.example');
const pathProdENV = resolvePath(process.cwd(), '.env');
const safeENV = existsSync(pathSafeENV);
const prodENV = existsSync(pathProdENV);

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
```

## Additional tools

Following tools are in the todo list:

-  [Webpack](https://webpack.js.org/guides/getting-started/)
-  [Husky](https://typicode.github.io/husky/#/)
-  [Swagger or OpenAPI](https://swagger.io/specification/)
-  [Mocha](https://mochajs.org/)
-  [Awesome Jest](https://github.com/jest-community/awesome-jest)
-  [Testing](https://spin.atomicobject.com/2020/04/22/jest-test-express-react/)
-  [Package Health Score](https://snyk.io/advisor/npm-package/pino)
-  [Package Trend and Stats](https://www.npmtrends.com/pino-vs-winston)
-  ExpressJS [ErrorHandler](https://github.com/expressjs/errorhandler) middleware for the full error stack traces
-  [NodeNotifier](https://github.com/mikaelbr/node-notifier) for sending cross platform native notification
-  [Built-in Express Middleware to skip body-parser](https://dev.to/taylorbeeston/you-probably-don-t-need-body-parser-in-your-express-apps-3nio)
-  [Built-in middleware function in Express](http://expressjs.com/en/5x/api.html)
-  [Guide to Redis Caching for NodeJS ExpressJS App](https://livecodestream.dev/post/beginners-guide-to-redis-and-caching-with-nodejs/)

## Tutorials

Following is a summary of great tutorial resources:

-  [Tech Altum Tutorial](https://tutorial.techaltum.com/nodejs.html)
-  [Secure an Express API](https://auth0.com/blog/node-js-and-typescript-tutorial-secure-an-express-api/#Register-a-Client-Application-with-Auth0)
-  [Marcos Blog](https://www.toptal.com/express-js/nodejs-typescript-rest-api-pt-1)
-  [SCOTCH Blog](https://scotch.io/courses/build-your-first-nodejs-website/getting-started)
-  [How to add Bootstrap to NodeJS](https://www.educative.io/edpresso/how-to-add-bootstrap-to-your-nodejs-project)
-  [TypeScript Express Tutorial](https://wanago.io/2019/02/04/typescript-express-testing/)
-  [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
-  [Node.js from Scratch to Production](https://github.com/losikov/api-example)
-  [TypeScript Node Starter](https://github.com/microsoft/TypeScript-Node-Starter)
-  [Hackathon Starter](https://github.com/sahat/hackathon-starter)
-  [GeekyAnts Starter](https://github.com/GeekyAnts/express-typescript)
-  [Best Practices for Rest API](https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/)
-  [Node Logging Guide](https://www.twilio.com/blog/guide-node-js-logging)
-  [Node Logging with Winston](https://www.digitalocean.com/community/tutorials/how-to-use-winston-to-log-node-js-applications)
-  [Node Logging IBM DEveloper Guide](https://developer.ibm.com/languages/node-js/articles/the-nodejs-debug-module-advanced-usage/)
-  [Node Logging Structure Guide](https://stackify.com/node-js-logging/)
