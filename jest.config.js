module.exports = {
   globals: {
      'ts-jest': {
         tsconfig: 'tsconfig.json',
      },
   },
   moduleFileExtensions: ['ts', 'js'],
   transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
   },
   testMatch: ['**/test/**/*.test.(ts|js)'],
   testEnvironment: 'node',
   coverageDirectory: 'reports/jest/',
   reporters: [
      'default',
      ['jest-junit', { outputDirectory: 'reports/jest-junit' }],
      [
         'jest-html-reporters',
         {
            publicPath: 'reports/jest-html-reports',
            filename: 'index.html',
            expand: true,
            openReport: true,
         },
      ],
      [
         'jest-stare',
         {
            resultDir: 'reports/jest-stare',
            reportTitle: 'jest-stare!',
            additionalResultsProcessors: ['jest-junit', 'jest-html-reports'],
            coverageLink: '../jest/lcov-report/index.html',
            jestStareConfigJson: 'jest-stare.json',
            jestGlobalConfigJson: 'globalStuff.json',
         },
      ],
   ],
};
