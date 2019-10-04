import { createLogger, format, transports } from 'winston';

const { NODE_ENV } = process.env;
const TIME_FORMAT = 'YYYY/MM/DD-HH:mm:ss';

const getLoggerLevel = (env) => {
  switch (env) {
    case 'test':
      return 'error';
    case 'production':
      return 'info';
    default:
      return 'debug';
  }
};
const logFormat = format.printf(({ timestamp, level, message }) => {
  let content = message;
  if (message != null && typeof message === 'object') {
    content = JSON.stringify(message, null, 2)
      .split('\n')
      .map((line, index) =>
        index !== 0 ? `${' '.repeat(TIME_FORMAT.length + 1)}${line}` : line,
      )
      .join('\n');
  }
  return `${timestamp} ${level} ${content}`;
});

const logger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.splat(),
    format.simple(),
  ),
});
logger.add(
  new transports.Console({
    level: getLoggerLevel(NODE_ENV),
    format: format.combine(
      format.timestamp({
        format: TIME_FORMAT,
      }),
      format.colorize(),
      format.prettyPrint(),
      logFormat,
    ),
  }),
);

export default logger;
