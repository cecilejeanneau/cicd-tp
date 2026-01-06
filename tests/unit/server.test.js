const request = require('supertest');
const app = require('../../src/server');

describe('GET /hello', () => {
  it('should return "Hello world!" when no name is provided', async () => {
    const res = await request(app).get('/hello');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe('Hello world!');
  });

  it('should return personalized greeting when name is provided', async () => {
    const res = await request(app).get('/hello/John');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe('Hello world! From John');
  });

  it('should handle 404 for unknown routes', async () => {
    const res = await request(app).get('/unknown');
    expect(res.statusCode).toEqual(404);
  });
});

describe('POST /hello', () => {
  it('should return "Hello world!" when no name header is provided', async () => {
    const res = await request(app).post('/hello');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe('Hello world!');
  });

  it('should return personalized greeting when name header is provided', async () => {
    const res = await request(app)
      .post('/hello')
      .set('x-name', 'Jane');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe('Hello world! From Jane');
  });
});

describe('Server startup', () => {
  it('should export the app', () => {
    expect(app).toBeDefined();
  });
});
