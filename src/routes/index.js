import Router from 'koa-router';

const router = new Router();

router.get('/health', async (ctx) => {
  ctx.body = 'OK';
  ctx.status = 200;
});

export default router;
