import { createLogger, format, transports } from 'winston';
import formatLogArgs from './formatLogArgs';

const { NODE_ENV } = process.env;

const getLoggerLevel = (env) => {
  switch (env) {
    case 'test':
      return 'info';
    case 'production':
      return 'info';
    default:
      return 'debug';
  }
};
const logFormat = format.printf(({ level, message }) => `${level} ${message}`);
const logger = createLogger();
logger.add(
  new transports.Console({
    level: getLoggerLevel(NODE_ENV),
    format: format.combine(format.colorize(), format.prettyPrint(), logFormat),
  }),
);

export default {
  debug: (...args) => logger.debug(...formatLogArgs(args, 'debug'.length)),
  info: (...args) => logger.info(...formatLogArgs(args, 'info'.length)),
  warn: (...args) => logger.warn(...formatLogArgs(args, 'warn'.length)),
  error: (...args) => logger.error(...formatLogArgs(args, 'error'.length)),
};
