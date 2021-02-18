const express = require('express');
const Auth = require('../controllers/authController');

const router = express.Router();

router.post('/signup', Auth.signUp);

router.post('/login', Auth.login);

module.exports = router;
