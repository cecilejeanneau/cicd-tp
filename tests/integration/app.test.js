const request = require("supertest");
const app = require("../../src/server");

describe("GET /hello", () => {
  it("should return Hello world", async () => {
    const res = await request(app).get("/hello");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hello world!");
  });

  it("should return personalized greeting", async () => {
    const res = await request(app).get("/hello/Alice");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hello world! From Alice");
  });

  it("should handle empty name parameter", async () => {
    const res = await request(app).get("/hello/");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hello world!");
  });

  it("should handle multiple name parameters", async () => {
    const res = await request(app).get("/hello/Alice/Bob");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hello world! From Alice");
  });
});

describe("POST /hello", () => {
  it("should return Hello world when no name header", async () => {
    const res = await request(app).post("/hello");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hello world!");
  });

  it("should return personalized greeting when name header provided", async () => {
    const res = await request(app)
      .post("/hello")
      .set('x-name', 'Bob');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hello world! From Bob");
  });

  it("should handle empty name header", async () => {
    const res = await request(app)
      .post("/hello")
      .set('x-name', '');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hello world!");
  });

  it("should handle multiple name headers", async () => {
    const res = await request(app)
      .post("/hello")
      .set('x-name', 'Alice')
      .set('x-name', 'Bob');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hello world! From Alice");
  });
});
