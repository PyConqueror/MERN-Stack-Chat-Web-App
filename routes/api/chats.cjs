const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('../../config/ensureLoggedIn')
const chatsController = require('../../controllers/api/chats');

router.get("/:id", ensureLoggedIn, chatsController.getChat) //send user id, return with chat id
router.get("/:id/messages", ensureLoggedIn, chatsController.getMessages)
router.post("/create", ensureLoggedIn, chatsController.createGroup)

module.exports = router;  