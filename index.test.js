const request = require("supertest");
const { app } = require(".");

describe("Test Server Running", () => {
  test("It should response the GET method", async () => {

    // arrange
    const statusCode = 200;
    const responseText = "Hello World";

    // act
    const response = await request(app).get("/test");

    // assert
    expect(response.statusCode).toBe(statusCode);
    expect(response.text).toBe(responseText);
  });
});