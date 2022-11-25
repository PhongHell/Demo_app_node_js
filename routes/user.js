const express = require('express');

const userController = require('../controllers/user');

const middleware = require("../middleware/is-auth");

const router = express.Router();

router.get("/user/:userId" ,middleware.isAuth,userController.getUserProfileWatcher);

router.get("/user/edit/:userId", middleware.isAuth, userController.getUserProfileWatcher);

router.post("/user/delete/:userId", middleware.isAdmin, userController.postDeleteUser)

module.exports = router;