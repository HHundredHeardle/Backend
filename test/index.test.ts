// index.test.ts
import request from 'supertest';
import app from '../src/index';

describe('GET /', () => {

  it('should return Hello, world!', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello, world!');
  });

  // You can add more test cases here
  it('should return correct content type', async () => {
    const response = await request(app).get('/');

    expect(response.headers['content-type']).toContain('text/html');
  });
});
