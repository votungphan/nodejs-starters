module.exports = {
   root: true,
   env: {
      browser: true,
      es2021: true,
      node: true,
   },
   extends: ['airbnb-base', 'airbnb-typescript/base', 'prettier'],
   parser: 'eslint-multiple-parsers', // REF: alternative overrides (https://github.com/techatpark/npm-scripts-static-ref/blob/main/.eslintrc.js)
   parserOptions: {
      ecmaVersion: 2021,
      parsers: [
         {
            test: /\.js(x)?$/,
            path: '@babel/eslint-parser', // REF: babel eslint parser (https://github.com/babel/babel/tree/main/eslint/babel-eslint-parser)
         },
         {
            test: /\.ts(x)?$/,
            path: '@typescript-eslint/parser',
         },
      ],
   },
   plugins: ['@babel', '@typescript-eslint', 'prettier'], // REF: babel eslint plugin (https://github.com/babel/babel/tree/main/eslint/babel-eslint-plugin)
   rules: {
      'prettier/prettier': 'error',
      'arrow-body-style': 'off',
      'prefer-arrow-callback': 'off',
      // REF: resolve import/no-extraneous-dependencies for multiple webpack config files (https://github.com/benmosher/eslint-plugin-import/issues/1694)
      'import/no-extraneous-dependencies': [
         'error',
         {
            devDependencies: [
               'webpack.common.js',
               'webpack.base.js',
               'webpack.dev.js',
               'webpack.prod.js',
               'webpack.config.js',
            ],
         },
      ],
   },
   globals: {
      OAuth1: true,
      OAuth2: true,
      FirebaseApp: true,
   },
};
