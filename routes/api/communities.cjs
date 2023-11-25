const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('../../config/ensureLoggedIn')
const communitiesController = require('../../controllers/api/community');

router.get("/", ensureLoggedIn, communitiesController.showGroups) //show all groups in community page
router.get("/posts/:id", ensureLoggedIn, communitiesController.showPosts) //show all posts based on the group :id is group id
router.get("/comments/:id", ensureLoggedIn, communitiesController.showComments) //show comments based on the posts id
router.post("/create", ensureLoggedIn, communitiesController.createGroup) //create group , controller will return with group id
router.post("/create/:id/post", ensureLoggedIn, communitiesController.createPost) //create posts inside the group based on the group :id
router.post("/post/:id", ensureLoggedIn, communitiesController.addComments) //create comments based on the post :id

module.exports = router;