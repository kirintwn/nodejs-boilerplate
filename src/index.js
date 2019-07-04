import 'source-map-support/register';
import Koa from 'koa';
import koaLogger from 'koa-logger';
import bodyParser from 'koa-body';
import mongoose from 'mongoose';
import config from './config';
import router from './routes/root';
import { logger, koaErrorCatcher, koaErrorLogger } from './logger';

const { PORT = 3000 } = process.env;
const MONGOOSE_OPTS = config.get('MONGOOSE_OPTS');
const MONGODB_URI = config.get('MONGODB_URI');
const isTest = !!module.parent;

const server = new Koa();

server.proxy = true;
server.use(koaErrorCatcher);
server.on('error', koaErrorLogger);

server.use(bodyParser({ multipart: true }));

if (!isTest) {
  if (MONGODB_URI) {
    logger.info('Connecting to database');
    mongoose.connect(MONGODB_URI, MONGOOSE_OPTS, (err) => {
      if (err) logger.error(`Mongoose Error: ${err}`);
      else logger.info('MongoDB Connected');
    });
  }
  server.use(koaLogger());
  server.listen(PORT, () => {
    logger.info(`Server Listens on port: ${PORT}`);
  });
}

server.use(router.routes());
server.use(router.allowedMethods());

export default server;
