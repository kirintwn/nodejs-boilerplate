import Koa from 'koa';
import koaLogger from 'koa-logger';
import bodyParser from 'koa-body';
import router from './routes';

const server = new Koa();
server.proxy = true;
server.use(bodyParser({ multipart: true }));

server.use(koaLogger());

server.use(router.routes());

export default server;
