const express = require('express');

const User = require('../controllers/userController');
const AuthenticateUser = require('../middleware/checkTokenFunction');

const router = express.Router();

router.get('/user', AuthenticateUser.checkToken, User.getUser);

module.exports = router;