import winston from 'winston';
import { SystemError } from '../errors';

export default class Logger {
  static logLevel;

  static MAX_LEVEL_WITH_COLOR_LENGTH = 17;

  static MAX_LABEL_LENGTH = 15;

  static initializeLogger(logLevel) {
    Logger.logLevel = logLevel;
    // reset existing loggers' level
    for (const logger of winston.loggers.loggers.values()) {
      logger.level = Logger.logLevel;
    }
  }

  static getLogger(label) {
    if (!winston.loggers.has(label)) {
      winston.loggers.add(label, {
        levels: winston.config.npm.levels,
        transports: [Logger.consoleTransport()],
        format: winston.format.label({ label }),
      });
    }
    return winston.loggers.get(label);
  }

  static logFormatTemplate(info) {
    if (typeof info.label !== 'string') {
      throw new SystemError('logger', 'Missing required field: label');
    }
    const levelWithPadding = info.level.padEnd(Logger.MAX_LEVEL_WITH_COLOR_LENGTH);
    const labelWithPadding = `[${info.label}]`.padEnd(Logger.MAX_LABEL_LENGTH);

    const log = `${info.timestamp} ${levelWithPadding} ${labelWithPadding} ${info.message}`;
    return info.stack ? `${log}\n${info.stack}` : log;
  }

  static consoleTransport() {
    return new winston.transports.Console({
      level: Logger.logLevel,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.colorize(),
        winston.format.printf(Logger.logFormatTemplate),
      ),
    });
  }
}

// Logger.getLogger('maxmind').info('Message with label: maxmind');
// Logger.getLogger('system').info('Message with label: system');
// Logger.getLogger('maxmind').silly('Message with label: maxmind');
// Logger.getLogger('maxmind').debug('Message with label: maxmind');
// Logger.getLogger('system').verbose('Message with label: system');
// Logger.getLogger('authenticator').http('Message with label: authenticator');
// Logger.getLogger('system').info('Message with label: system');
// Logger.getLogger('system').warn('Message with label: system');
// Logger.getLogger('system').error('Message with label: system');
// const x = new Error('123');
// Logger.getLogger('system').error('Fatal error:', x);
