const express = require('express');
const userController = require('../controllers/userController');
const authentificate = require('../middlewares/authenticatorMiddleware');
const router = express.Router({ mergeParams: true });

router.post('/insert-user', authentificate, userController.insertUser);
router.get('/get-all-users', authentificate, userController.getAllUsers);
router.get('/get-all-users-email', authentificate, userController.getAllUsersEmail);
router.get('/:id', authentificate, userController.getUserById);

module.exports = router;
