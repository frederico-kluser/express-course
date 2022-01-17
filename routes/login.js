var express = require('express');
var router = express.Router({ mergeParams: true });

const { bodyParams } = require('../helpers/request');
const { errorBuilder } = require('../helpers/error');
const { getUser } = require('../helpers/database');

router.post('/', (req, res, next) => {
  const { username, password } = req.body;
  const dontHaveParams = bodyParams(req, ['username', 'password']);
  
  if (dontHaveParams) {
    return next(errorBuilder(dontHaveParams, 400));
  }

  const { error, content } = getUser(username, password);

  if (error) {
    return next(content);
  } else {
    req.session.authenticated = true;
    req.session.user = {
      id: content.id,
      username,
      password,
    }
    res.status(200).send('You are logged in');
  }
});

module.exports = router;