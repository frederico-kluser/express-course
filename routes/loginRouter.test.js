const request = require("supertest");
const { app } = require("../index");
const mongoose = require("mongoose");
const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);

describe("Test the login path", () => {
  beforeAll((done) => {
    mongoose.connect(DB).then(() => {
      done();
    });
  });

  afterAll((done) => {
      mongoose.disconnect(done);
  });

  test("It should response the POST method", async () => {
    
    // arrange 
    const body = {
      email: "kluserhuu@gmail.com",
      password: "1234",
    }
    const statusCode = 200;

    // act
    const response = await request(app).post("/login").send(body);

    // assert
    expect(response.statusCode).toBe(statusCode);
    expect(response.body.data[0].email).toBe(body.email);
    expect(response.body.data[0].password).toBe(body.password);
  });
});
