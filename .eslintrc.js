module.exports = {
   root: true,
   env: {
      browser: true,
      es2021: true,
      node: true,
      jest: true,
   },
   extends: [
      'eslint:recommended',
      'airbnb-base',
      'plugin:prettier/recommended',
   ],
   plugins: ['prettier'],
   parserOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
   },
   rules: {
      'prettier/prettier': 'error',
      'arrow-body-style': 'off',
      'prefer-arrow-callback': 'off',
      'import/no-extraneous-dependencies': [
         'error',
         {
            devDependencies: true,
            optionalDependencies: true,
            peerDependencies: true,
            bundledDependencies: true,
            packageDir: __dirname,
         },
      ],
   },
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
   globals: {
      OAuth1: true,
      OAuth2: true,
      FirebaseApp: true,
   },
};
