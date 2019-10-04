import logger from '../logger';

export default (err, ctx) => {
  if (ctx.response.status >= 500) {
    logger.error(err);
  } else {
    logger.debug(err.message);
  }
};
