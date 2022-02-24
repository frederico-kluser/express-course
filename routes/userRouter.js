const express = require('express');
const userController = require('../controllers/userController');
const authentificate = require('../middlewares/authenticatorMiddleware');
const router = express.Router({ mergeParams: true });

router.delete('/delete-by-body', authentificate, userController.deleteByBody);
router.delete('/delete', authentificate, userController.deleteUser);
router.get('/:id', authentificate, userController.getUserById);
router.get('/get-all-users-email', authentificate, userController.getAllUsersEmail);
router.get('/get-all-users', authentificate, userController.getAllUsers);
router.get('/get-by-query', authentificate, userController.getByQuery);
router.get('/insert-backup', userController.insertBackup);
router.post('/insert-user', userController.insertUser);
router.put('/replace', authentificate, userController.replaceUser);
router.put('/update', authentificate, userController.updateUser);

module.exports = router;
