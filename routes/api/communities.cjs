const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('../../config/ensureLoggedIn')
const communitiesController = require('../../controllers/api/communities.js');

router.get("/allCommunities", ensureLoggedIn, communitiesController.showAllCommunities)
router.get("/communities/:id", ensureLoggedIn, communitiesController.showOneCommunity)
router.get("/posts/:id", ensureLoggedIn, communitiesController.showPosts) //show all posts based on the community :id is community id
router.get("/:id/comments", ensureLoggedIn, communitiesController.showComments) //show comments based on the posts id
router.post("/create", ensureLoggedIn, communitiesController.createCommunity) //create community , controller will return with community id
router.post("/createPost", ensureLoggedIn, communitiesController.createPost) //create posts inside the community based on the community :id
router.post("/createComment", ensureLoggedIn, communitiesController.createComment) //create comments based on the post :id
router.post("/updateCommunity", ensureLoggedIn, communitiesController.updateCommunity)

module.exports = router;  