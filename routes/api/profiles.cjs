const express = require('express');
const router = express.Router();
const profileController = require('../../controllers/api/profile');
const ensureLoggedIn = require('../../config/ensureLoggedIn')

router.post('/updateBio', ensureLoggedIn, profileController.updateBio)


module.exports = router;