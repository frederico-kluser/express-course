const request = require("supertest");
const { app } = require(".");

describe("Test the root path", () => {
  test("It should response the GET method", async () => {
    const response = await request(app).get("/test");
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe("Hello World");
  });
});