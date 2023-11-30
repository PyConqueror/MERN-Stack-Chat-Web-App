const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/api/users');
const ensureLoggedIn = require('../../config/ensureLoggedIn')

router.get('/check-token', ensureLoggedIn, usersController.checkToken)
router.post('/', usersController.create);
router.post('/login', usersController.login)
router.get('/searchUsers', usersController.searchUsers)
router.get('/getFriends', usersController.getFriends)
router.get('/list', ensureLoggedIn, usersController.getChatList)
router.get('/pending', ensureLoggedIn, usersController.pendingFriends)

module.exports = router;