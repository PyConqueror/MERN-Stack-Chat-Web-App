const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('../../config/ensureLoggedIn')
const communitiesController = require('../../controllers/api/community');


module.exports = router;