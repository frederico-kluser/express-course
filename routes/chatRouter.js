const express = require('express');
const authentificate = require('../middlewares/authenticatorMiddleware');
const router = express.Router({ mergeParams: true });
const chatController = require('../controllers/chatController');

router.post('/send-message', authentificate, chatController.insertMessage);

module.exports = router;
