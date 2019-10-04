import config from '../config';

const NODE_ENV = config.get('NODE_ENV');

export default async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    if (ctx.status >= 500 && NODE_ENV === 'production') {
      ctx.body = 'Internal Server Error';
    } else {
      ctx.body = err.message;
    }

    ctx.app.emit('error', err, ctx);
  }
};
