import { createLogger, format, transports } from 'winston';
import formatLogArgs from './format-log-args';

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
  debug: (message) => {
    logger.debug(formatLogArgs(message, 'debug'.length));
  },
  info: (message) => {
    logger.info(formatLogArgs(message, 'info'.length));
  },
  warn: (message) => {
    logger.warn(formatLogArgs(message, 'warn'.length));
  },
  error: (message) => {
    logger.error(formatLogArgs(message, 'error'.length));
  },
};
