import Router from 'koa-router';
import send from 'koa-send';

const router = new Router();

router.get('/test', async (ctx) => {
  ctx.body = { data: 'it works!' };
  ctx.status = 200;
});

router.get('/*', async (ctx) => {
  await send(ctx, './dist/index.html');
});

export default router;
