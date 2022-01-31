const express = require('express');
const authentificate = require('../middlewares/authenticatorMiddleware');
const { User } = require('../mongoDB/models');
const router = express.Router({ mergeParams: true });

router.post('/insertUser', authentificate, (req, res, next) => {
  const { name, email } = req.body;

  const testUser = new User({
    name,
    email,
  });
  testUser.save().then((message) => {
    res.status(201).send(message);
  }).catch((err) => {
    res.status(400).send(err);
  });

});

module.exports = router;
