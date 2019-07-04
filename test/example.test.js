/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-unused-vars */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import supertest from 'supertest';
import server from '../src';

const { PORT = 3001 } = process.env;
let listener;
let request;

beforeAll(async () => {
  listener = server.listen(PORT);
  request = supertest(listener);
});

afterAll(async () => {
  await listener.close();
});

beforeEach(async () => {
  // Add Smth
});

afterEach(async () => {
  // Add Smth
});

describe('test koa server', () => {
  test('should respond as expected', async () => {
    const response = await request.get('/test');
    expect(response.status).toEqual(200);
    expect(response.body.data).toMatchSnapshot();
  });
});
