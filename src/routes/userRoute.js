const express = require('express');
const checkUserToken = require('../middleware/checkTokenFunction');

const User = require('../controllers/userController');

const router = express.Router();

router.get('/user', checkUserToken, User.getUser);

module.exports = router;