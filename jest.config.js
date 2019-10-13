module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.test.js'],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  verbose: true,
};
