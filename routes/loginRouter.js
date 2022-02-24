const express = require('express');
const loginController = require('../controllers/loginController');
const router = express.Router({ mergeParams: true });
const { body } = require('express-validator');

router.post('/', body('email').isEmail(), body('password').notEmpty(), loginController.makeLogin);

module.exports = router;