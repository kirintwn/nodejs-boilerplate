module.exports = {
  verbose: true,
  collectCoverage: false,
  testMatch: ['**/test/**/*.js'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
};
