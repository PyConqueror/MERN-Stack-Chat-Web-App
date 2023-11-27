const express = require('express');
const router = express.Router();
const profileController = require('../../controllers/api/profile');
const ensureLoggedIn = require('../../config/ensureLoggedIn')

router.get('/', ensureLoggedIn, profileController.index)
router.post('/updateProfileImage', ensureLoggedIn, profileController.updateProfileImage);
router.post('/updateBio', ensureLoggedIn, profileController.updateBio);
router.post('/updateLocation', ensureLoggedIn, profileController.updateLocation);


module.exports = router;