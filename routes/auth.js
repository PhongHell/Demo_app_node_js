const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/signin', authController.getSignIn);

router.post('/signin', authController.postSignIn);

router.post('/signout', authController.postSignOut);

module.exports = router;