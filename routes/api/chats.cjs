const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('../../config/ensureLoggedIn')
const chatsController = require('../../controllers/api/chats');

// router.get("/:id", ensureLoggedIn, chatsController.getChat)
// router.get("/:id", ensureLoggedIn, chatsController.getMessages)
// router.post("/:id", ensureLoggedIn, chatsController.sendMessage)
// router.post("/:id", ensureLoggedIn, chatsController.createGroup)

module.exports = router;