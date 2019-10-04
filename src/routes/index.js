import Router from 'koa-router';

const router = new Router();

router.get('/healthcheck', async (ctx) => {
  ctx.body = 'OK';
  ctx.status = 200;
});

export default router;
