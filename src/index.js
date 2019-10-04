import 'source-map-support/register';
import Koa from 'koa';
import koaLogger from 'koa-logger';
import bodyParser from 'koa-body';
import config from './config';
import logger from './logger';
import router from './routes';
import { errorCacher, errorLogger } from './middlewares';

const PORT = config.get('PORT') ?? 3000;
const IS_TEST = !!module.parent;

const server = new Koa();

server.proxy = true;
server.use(errorCacher);
server.on('error', errorLogger);

server.use(bodyParser({ multipart: true }));

if (!IS_TEST) {
  server.use(koaLogger());
  server.listen(PORT, () => {
    logger.info(`Server listening on port ${PORT}`);
  });
}

server.use(router.routes());
server.use(router.allowedMethods());

export default server;
