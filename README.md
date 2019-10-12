# Boilerplate

The Boilerplate is a professional backend template for building fast, robust, and adaptable Node.js Application.

## Quick start

1. Clone the git repo
2. Install dependencies with: `npm ci`
3. Build & start the server with: `npm start`

### Advanced scripts

- `npm test`: run tests
- `npm run lint`: lint with auto-fixing
- `npm run build`: build without execution
- `npm run dev`: dev with hot reloading (provided by [`nodemon`](https://github.com/remy/nodemon) & [`babel-node`](https://github.com/babel/babel/tree/master/packages/babel-node))

## Features

- Production ready. Use newest features without worrying about any incompatibility.
- Includes:
  - [`koa`](https://koajs.com/)
  - [`Jest`](https://github.com/facebook/jest)
- Hierarchical config with [`nconf`](https://github.com/indexzero/nconf)
- Logging elegantly with [`winston`](https://github.com/winstonjs/winston)
- [`Babel`](https://babeljs.io/) to transpile the source code
- Lint the code with airbnb based [`ESLint`](https://github.com/eslint/eslint) config & [`Prettier`](https://github.com/prettier/prettier)
- Code quality protection by linting with git hook
