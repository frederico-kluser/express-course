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
    expect.assertions(4);

    // arrange 
    const successCode = 200;
    const failureCode = 400;

    // act
    const responseSuccess = await request(app).post("/login").send(testUserInfo);
    const responseFailure = await request(app).post("/login").send({});
    
    // assert
    expect(responseSuccess.statusCode).toBe(successCode);
    expect(responseSuccess.body.data.email).toBe(testUserInfo.email);
    expect(responseSuccess.body.data.password).toBe(testUserInfo.password);
    expect(responseFailure.statusCode).toBe(failureCode);
  });

  test("It should response '/user/:id' router", async () => {
    expect.assertions(4);

    // arrange
    const successCode = 200;
    const failureCode = 400;

    // act
    const responseSuccess = await request(app).get(`/user/${testUserInfo._id}`);
    const responseFailure = await request(app).get(`/user/1337`);

    // assert
    expect(responseSuccess.statusCode).toBe(successCode);
    expect(responseSuccess.body.data.email).toBe(testUserInfo.email);
    expect(responseSuccess.body.data.password).toBe(testUserInfo.password);
    expect(responseFailure.statusCode).toBe(failureCode);
  })
});
