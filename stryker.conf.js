module.exports = function(config) {
  config.set({
    mutator: 'typescript',
    packageManager: 'npm',
    reporters: ['html', 'clear-text', 'progress'],
    testRunner: 'jest',
    transpilers: [],
    coverageAnalysis: 'off',
    tsconfigFile: 'tsconfig.json',
    mutate: ['src/**/*.ts', '!src/**/*.spec.ts', '!src/**/*-enums.ts', '!src/**/*.module.ts', '!src/**/*.swagger.ts'],
    maxConcurrentTestRunners: 4,
    jest: {
      config: require('./jest-mutation.config.js'),
    },
  });
};
