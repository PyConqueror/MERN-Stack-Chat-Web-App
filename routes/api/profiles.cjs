const express = require('express');
const router = express.Router();
const profileController = require('../../controllers/api/profile');
const ensureLoggedIn = require('../../config/ensureLoggedIn')

router.post('/updateProfileImage', ensureLoggedIn, profileController.updateProfileImage);
router.post('/updateBio', ensureLoggedIn, profileController.updateBio);
router.post('/updateLocation', ensureLoggedIn, profileController.updateLocation);
router.post('/getFriend', ensureLoggedIn, profileController.getFriend)


module.exports = router;