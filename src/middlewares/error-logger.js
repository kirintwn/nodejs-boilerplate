import logger from '../logger';

export default (err, ctx) => {
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
