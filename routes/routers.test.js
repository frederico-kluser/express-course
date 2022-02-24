const request = require("supertest");
const { app } = require("../index");
const mongoose = require("mongoose");
const generateRandomEmail = require("../helpers/generateRandomEmail");
const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);
jest.mock("../middlewares/authenticatorMiddleware", () => (req, res, next) => next());

describe("Test the routers path", () => {
  const newUserInfo = {
    name: "Steve Jobs",
    email: generateRandomEmail(10),
    password: "4321",
  }

  beforeAll((done) => {
    mongoose.connect(DB).then(() => {
      done();
    });
  });

  afterAll((done) => {
      mongoose.disconnect(done);
  });

  test("It should response '/user/insert-user' router", async () => {
    expect.assertions(4);

    // arrange
    const successCode = 201;
    const failureCode = 400;

    // act
    const responseSuccess = await request(app).post("/user/insert-user").send(newUserInfo);
    const responseFailure = await request(app).post("/user/insert-user").send({});
    newUserInfo._id = responseSuccess.body.data._id;

    // assert
    expect(responseSuccess.statusCode).toBe(successCode);
    expect(responseSuccess.body.data.email).toBe(newUserInfo.email);
    expect(responseSuccess.body.data.password).toBe(newUserInfo.password);
    expect(responseFailure.statusCode).toBe(failureCode);
  });

  test("It should response '/login' router", async () => {
    expect.assertions(4);

    // arrange 
    const successCode = 200;
    const failureCode = 400;

    // act
    const responseSuccess = await request(app).post("/login").send(newUserInfo);
    const responseFailure = await request(app).post("/login").send({});
    
    // assert
    expect(responseSuccess.statusCode).toBe(successCode);
    expect(responseSuccess.body.data.email).toBe(newUserInfo.email);
    expect(responseSuccess.body.data.password).toBe(newUserInfo.password);
    expect(responseFailure.statusCode).toBe(failureCode);
  });

  test("It should response '/user/:id' router", async () => {
    expect.assertions(4);

    // arrange
    const successCode = 200;
    const failureCode = 400;

    // act
    const responseSuccess = await request(app).get(`/user/${newUserInfo._id}`);
    const responseFailure = await request(app).get(`/user/1337`);

    // assert
    expect(responseSuccess.statusCode).toBe(successCode);
    expect(responseSuccess.body.data.email).toBe(newUserInfo.email);
    expect(responseSuccess.body.data.password).toBe(newUserInfo.password);
    expect(responseFailure.statusCode).toBe(failureCode);
  })

  test("It should response '/user/delete-by-body' router", async () => {
    expect.assertions(2);

    // arrange
    const successCode = 200;
    const failureCode = 400;

    // act
    const responseSuccess = await request(app).delete("/user/delete-by-body").send(newUserInfo);
    const responseFailure = await request(app).delete("/user/delete-by-body").send({ _id: "1337" });

    // assert
    expect(responseSuccess.statusCode).toBe(successCode);
    expect(responseFailure.statusCode).toBe(failureCode);
  })
});
