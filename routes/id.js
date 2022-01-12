var express = require('express');
var router = express.Router();

const { getUsers } = require('../middlewares/databaseMiddlewares');
const { getFiltredUser } = require('../helpers/database');
const { errorBuilder } = require('../helpers/error');

router.get('/:id', getUsers, (req, res, next) => {
  const result = getFiltredUser(req, 'id', req.params.id);

  if (!result) {
    return next(errorBuilder('User not found', 404));
  }

  res.status(200).send(result);
});

module.exports = router;