const request = require("supertest");
const { app } = require("../index");
const mongoose = require("mongoose");
const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);
jest.mock("../middlewares/authenticatorMiddleware", () => (req, res, next) => next());

describe("Test the routers path", () => {
  const testUserInfo = {
    _id: "61f3088edde97b91ee1cbcd5",
    email: "kluserhuu@gmail.com",
    password: "1234",
  }

  beforeAll((done) => {
    mongoose.connect(DB).then(() => {
      done();
    });
  });

  afterAll((done) => {
      mongoose.disconnect(done);
  });

  test("It should response '/login' router", async () => {
    expect.assertions(3);

    // arrange 
    const statusCode = 200;

    // act
    const response = await request(app).post("/login").send(testUserInfo);
    

    // assert
    expect(response.statusCode).toBe(statusCode);
    expect(response.body.data.email).toBe(testUserInfo.email);
    expect(response.body.data.password).toBe(testUserInfo.password);
  });

  test("It should response '/user/:id' router", async () => {
    expect.assertions(3);

    // arrange
    const statusCode = 200;

    // act
    const response = await request(app).get(`/user/${testUserInfo._id}`);

    // assert
    expect(response.statusCode).toBe(statusCode);
    expect(response.body.data.email).toBe(testUserInfo.email);
    expect(response.body.data.password).toBe(testUserInfo.password);
  })
});
