const User = require('../models/userModel');
const { validationResult } = require('express-validator');

const makeLogin = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  User.find({ email, password }).then((users) => {
    if (users.length === 0) {
      const err = new Error(message);
      err.status = 404;
      return next(err);
    }

    req.session.authenticated = true;
    req.session.user = {
      id: users[0]._id,
      username: users[0].name,
      password,
    }

    res.status(200).json({
      status: 'success',
      data: users[0]
    });
  }).catch((err) => {
    res.status(400).send(err);
  });
};

module.exports = { makeLogin };
