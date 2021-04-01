# Default Node.js Starter Development Guide

The default Node.js Starter Kit is with following useful tools:

-  [Node.js](https://nodejs.org/en/) JavaScript runtime
-  [ExpressJS](https://expressjs.com/) Node.js web application framework
-  [TypeScript](https://www.typescriptlang.org/) open-source language
-  [ESLint](https://eslint.org/) JavaScript Linter
-  [Prettier](https://prettier.io/docs/en/integrating-with-linters.html) code formatter
-  [Babel](https://babeljs.io/blog/2020/07/13/the-state-of-babel-eslint) JavaScript compiler
-  [dotenv](https://www.npmjs.com/package/dotenv-safe) or [dotenv-safe](https://www.npmjs.com/package/dotenv-safe) module to load environment variables
-  [Bootstrap](https://getbootstrap.com/) front-end framework
-  [Eta](https://eta.js.org/) template engine
-  [Nodemon](https://nodemon.io/) tool to restart node app automatically
-  [Browsersync](https://browsersync.io/) tool to synchronize browser
-  ExpressJS [ErrorHandler](https://github.com/expressjs/errorhandler) middleware for the full error stack traces
-  [NodeNotifier](https://github.com/mikaelbr/node-notifier) for sending cross platform native notification
-  [Jest](https://jestjs.io/) JavaScript Testing Framework
-  [SuperTest](https://github.com/visionmedia/supertest) for testing HTTP

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
npm install eslint eslint-multiple-parsers eslint-plugin-import --save-dev
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
   parser: 'eslint-multiple-parsers',
   extends: ['airbnb-base', 'airbnb-typescript/base', 'prettier'],
   plugins: ['@babel', '@typescript-eslint', 'prettier'],
   // Other configuration
};
```

-  Enable Babel compiler supporting ESLint, Prettier, TypeScript:

```bash
# Install Babel and useful plugins
npm install @babel/core @babel/plugin-proposal-class-properties @babel/plugin-proposal-object-rest-spread --save-dev
# Enable TypeScript support
npm install @babel/preset-env @babel/preset-typescript --save-dev
# Integrate into ESLint, Airbnb
npm install babel-preset-airbnb @babel/eslint-parser @babel/eslint-plugin --save-dev
```

```javascript
// Minimal Babel javascript configuration file (.babelrc.js)
module.exports = {
   presets: ['airbnb', '@babel/preset-env', '@babel/preset-typescript'],
   plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-object-rest-spread',
   ],
};
```
