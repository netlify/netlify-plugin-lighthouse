module.exports = {
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.+(ts|js)', '**/?(*.)+(spec|test).+(ts|js)'],
  setupFiles: ['<rootDir>/test/setup.js'],
  transform: {},
  collectCoverageFrom: ['**/*.js'],
};
