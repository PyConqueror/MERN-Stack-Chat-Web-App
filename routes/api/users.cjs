const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/api/users');
const ensureLoggedIn = require('../../config/ensureLoggedIn')

router.get('/check-token', ensureLoggedIn, usersController.checkToken)
router.post('/', usersController.create);
router.post('/login', usersController.login)
router.get('/searchUsers', usersController.searchUsers)
router.post('/addFriend/:id', usersController.addFriend)
router.get('/getFriends', usersController.getFriends)
router.get('/list', ensureLoggedIn, usersController.getChatList)
router.get('/pending', ensureLoggedIn, usersController.pendingFriends)
router.post('/addFriendRequest/:id', ensureLoggedIn, usersController.addFriendRequest)
router.post('/denyFriendRequest/:id', ensureLoggedIn, usersController.denyFriendRequest)
// router.post('/addCommunity', ensureLoggedIn, usersController.addCommunity)
// router.post('/addCommunityAdmin', ensureLoggedIn, usersController.addCommunityAdmin)
// router.post('/addPost', ensureLoggedIn, usersController.addPost)
// router.post('/addComment', ensureLoggedIn, usersController.addComment)

module.exports = router;