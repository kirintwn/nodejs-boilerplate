import supertest from 'supertest';
import server from '../src/server';

const PORT = 4001;
let listener;
let request;

beforeAll(() => {
  listener = server.listen(PORT);
  request = supertest(listener);
});
afterAll(async () => {
  await listener.close();
});

test('Koa Server Health Check', async () => {
  const res = await request.get('/healthcheck');
  expect(res.status).toEqual(200);
  expect(res.text).toBe('OK');
});
