module.exports = {
  verbose: true,
  collectCoverage: false,
  testMatch: ['**/test/**/*.test.js'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
};
