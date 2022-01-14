var express = require('express');
var router = express.Router({ mergeParams: true });

const { getUsers } = require('../middlewares/databaseMiddlewares');
const { getFiltredUser } = require('../helpers/database');
const { headerParams } = require('../helpers/request');
const { errorBuilder } = require('../helpers/error');

router.get('/', getUsers, (req, res, next) => {
  const { name, pass } = req.headers;
  const dontHaveParams = headerParams(req, ['name', 'pass']);
  
  if (dontHaveParams) {
    return next(errorBuilder(dontHaveParams, 400));
  }

  const user = getFiltredUser(req, 'name', name);
  if (!user) {
    return next(errorBuilder('User not found', 404));
  } else if (user.pass !== pass) {
    return next(errorBuilder('Wrong password', 401));
  }

  req.session.authenticated = true;
  req.session.user = {
    username: user.name,
    password: pass.pass,
  }

  res.status(200).send('You are logged in');
});

module.exports = router;