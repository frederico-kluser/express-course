const express = require('express');
const loginController = require('../controllers/loginController');
const router = express.Router({ mergeParams: true });

router.post('/', loginController.makeLogin);

module.exports = router;