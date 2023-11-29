const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('../../config/ensureLoggedIn')
const communitiesController = require('../../controllers/api/communities');

router.post("/", ensureLoggedIn, communitiesController.showOneGroup)
router.get("/allGroups", ensureLoggedIn, communitiesController.showAllGroups) //show all groups in community page
router.get("/posts/:id", ensureLoggedIn, communitiesController.showPosts) //show all posts based on the group :id is group id
router.get("/:id/comments", ensureLoggedIn, communitiesController.showComments) //show comments based on the posts id
router.post("/create", ensureLoggedIn, communitiesController.createGroup) //create group , controller will return with group id
router.post("/createPost", ensureLoggedIn, communitiesController.createPost) //create posts inside the group based on the group :id
router.post("/createComment", ensureLoggedIn, communitiesController.createComment) //create comments based on the post :id

module.exports = router;  