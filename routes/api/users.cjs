// routes/api/users.js
const user = require('../../models/user')
const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users');

router.get('/check-token', usersCtrl.checkToken)
router.post('/', usersCtrl.create);
router.post('/login', usersCtrl.login)

module.exports = router;