module.exports = {
  verbose: true,
  collectCoverage: false,
  collectCoverageFrom: ['src/**/*.js'],
  coverageReporters: ['text'],
  testMatch: ['**/test/**/*.js'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
};
