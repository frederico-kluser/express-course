const express = require('express');
const router = express.Router();

const authentificate = require('../middlewares/authenticatorMiddleware');

const { errorBuilder } = require('../helpers/error');
const { getId } = require('../helpers/database');

router.get('/:id', authentificate, (req, res, next) => {
  const result = getId(req.params.id);

  if (!result) {
    return next(errorBuilder('User not found', 404));
  }

  res.status(200).json(result);
});

module.exports = router;