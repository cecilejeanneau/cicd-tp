const axios = require("axios");
const app = require("../../src/server");
let server;
let baseURL;

beforeAll((done) => {
  server = app.listen(0, () => {
    const { port } = server.address();
    baseURL = `http://127.0.0.1:${port}`;
    done();
  });
});

afterAll((done) => {
  server.close(done);
});

describe("E2E GET /hello", () => {
  it("responds with Hello world", async () => {
    const res = await axios.get(`${baseURL}/hello`);
    expect(res.status).toBe(200);
    expect(res.data).toBe("Hello world!");
  });

  it("responds with personalized greeting", async () => {
    const res = await axios.get(`${baseURL}/hello/John`);
    expect(res.status).toBe(200);
    expect(res.data).toBe("Hello world! From John");
  });
});

describe("E2E POST /hello", () => {
  it("responds with Hello world when no name header", async () => {
    const res = await axios.post(`${baseURL}/hello`);
    expect(res.status).toBe(200);
    expect(res.data).toBe("Hello world!");
  });

  it("responds with personalized greeting when name header provided", async () => {
    const res = await axios.post(`${baseURL}/hello`, {}, {
      headers: { 'x-name': 'Jane' }
    });
    expect(res.status).toBe(200);
    expect(res.data).toBe("Hello world! From Jane");
  });
});
