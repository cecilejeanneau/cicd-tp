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

  it('should return personalized greeting with special characters', async () => {
    const res = await request(app).get('/hello/John%20Doe');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe('Hello world! From John Doe');
  });

  it('should return personalized greeting with unicode characters', async () => {
    const name = 'José';
    const res = await request(app).get('/hello/' + encodeURIComponent(name));
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe('Hello world! From José');
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

  it('should return personalized greeting with special characters in header', async () => {
    const res = await request(app)
      .post('/hello')
      .set('x-name', 'John Doe');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe('Hello world! From John Doe');
  });

  it('should return personalized greeting with unicode characters in header', async () => {
    const res = await request(app)
      .post('/hello')
      .set('x-name', 'José');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe('Hello world! From José');
  });
});

describe('Server startup', () => {
  it('should export the app', () => {
    expect(app).toBeDefined();
  });

  it('should have a listen method', () => {
    expect(typeof app.listen).toBe('function');
  });

  it('should respond to /hello route', async () => {
    const res = await request(app).get('/hello/World');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('Hello');
  });

  it('should handle multiple requests', async () => {
    const res1 = await request(app).get('/hello/Alice');
    const res2 = await request(app).get('/hello/Bob');
    expect(res1.statusCode).toEqual(200);
    expect(res2.statusCode).toEqual(200);
    expect(res1.text).toBe('Hello world! From Alice');
    expect(res2.text).toBe('Hello world! From Bob');
  });
});
