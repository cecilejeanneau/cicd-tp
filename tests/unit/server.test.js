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

  it('should have a listen method', () => {
    expect(typeof app.listen).toBe('function');
  });

  it('should start the server when run directly', () => {
    // Mock console.log to verify it's called
    const originalLog = console.log;
    console.log = jest.fn();

    // Mock require.main to simulate direct execution
    const originalMain = require.main;
    require.main = module;

    // Re-require the module to trigger the if block
    const modulePath = require.resolve('../../src/server');
    delete require.cache[modulePath];
    require(modulePath);

    // Verify console.log was called with the expected message
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Server listening on port'));

    // Restore original values
    console.log = originalLog;
    require.main = originalMain;
  });
});
