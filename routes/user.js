const express = require('express');
const router = express.Router();

const catchAsync = require('../utils/catchAsync');

const users = require('../controllers/user')
const { isLoggedIn, storeReturnTo, loginAuthenticate } = require('../middleware');

router.route('/register')
    .get(users.registerForm)
    .post(catchAsync(users.register))

router.route('/login')
    .get(users.loginForm)
    .post(storeReturnTo, loginAuthenticate, users.login)

router.get('/logout', users.logout);

router.get('/userInfo', isLoggedIn, users.userInfo);

module.exports = router;