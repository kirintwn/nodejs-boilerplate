import { createLogger, format, transports } from 'winston';

const { NODE_ENV } = process.env;

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
  ),
});

if (NODE_ENV === 'test') {
  logger.add(
    new transports.Console({
      level: 'error',
      format: format.combine(format.colorize(), format.simple()),
    }),
  );
} else if (NODE_ENV === 'production' || NODE_ENV === 'staging') {
  logger.add(
    new transports.Console({
      format: format.simple(),
    }),
  );
} else {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    }),
  );
}

const koaErrorCatcher = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
  }
};

const koaErrorLogger = (err, ctx) => {
  if (ctx.response.status < 500) {
    logger.warn(
      `${ctx.response.status} ${err.message}: ${ctx.request.method} ${ctx.request.url}`,
    );
    return;
  }
  logger.error(
    `[Request]: ${ctx.request.method} ${ctx.request.url} => ${ctx.response.status}`,
  );
  logger.error(`${ctx.message} ${err.stack}`);
};

export { logger, koaErrorCatcher, koaErrorLogger };
