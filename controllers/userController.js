const { errorBuilder } = require("../helpers/error");
const { bodyParams } = require("../helpers/request");
const { User } = require("../models/userModel");

const insertUser = (req, res, next) => {
  const { name, email } = req.body;
  const dontHaveParams = bodyParams(req, ['name', 'email']);

  if (dontHaveParams) {
    return next(errorBuilder(dontHaveParams, 400));
  }

  const testUser = new User({
    name,
    email,
  });

  testUser.save().then((message) => {
    res.status(201).send(message);
  }).catch((err) => {
    res.status(400).send(err);
  });
};

module.exports = {
  insertUser,
}
