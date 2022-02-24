const express = require('express');
const userController = require('../controllers/userController');
const authentificate = require('../middlewares/authenticatorMiddleware');
const router = express.Router({ mergeParams: true });

router.post('/insert-user', userController.insertUser);
router.get('/get-all-users', authentificate, userController.getAllUsers);
router.get('/get-all-users-email', authentificate, userController.getAllUsersEmail);
router.get('/get-by-query', authentificate, userController.getByQuery);
router.get('/:id', authentificate, userController.getUserById);
router.put('/update', authentificate, userController.updateUser);
router.put('/replace', authentificate, userController.replaceUser);
router.delete('/delete', authentificate, userController.deleteUser);
router.delete('/delete-by-body', authentificate, userController.deleteByBody);

module.exports = router;
