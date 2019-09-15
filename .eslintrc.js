module.exports = {
  parser: 'babel-eslint',
  env: {
    node: true,
    'jest/globals': true,
  },
  extends: ['airbnb', 'plugin:jest/recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['jest', 'prettier'],
  rules: {
    'import/prefer-default-export': 'off',
    'class-methods-use-this': 'off',
    'consistent-return': 'warn',
    'no-unused-vars': 'warn',
    'no-continue': 'off',
    'no-bitwise': 'off',
    'no-underscore-dangle': 'off',
    'no-param-reassign': ['error', { props: false }],
    'no-restricted-syntax': [
      'error',
      'ForInStatement',
      'LabeledStatement',
      'WithStatement',
    ],
    'prettier/prettier': [
      'error',
      {
        semi: true,
        trailingComma: 'all',
        singleQuote: true,
        arrowParens: 'always',
      },
    ],
  },
};
