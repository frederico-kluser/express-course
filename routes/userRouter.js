const express = require('express');
const userController = require('../controllers/userController');
const authentificate = require('../middlewares/authenticatorMiddleware');
const router = express.Router({ mergeParams: true });

router.post('/insertUser', authentificate, userController.insertUser);

module.exports = router;
