const express = require('express');

const router = express.Router();

const middleware = require("../middleware/is-auth")

const adminController = require('../controllers/admin');

router.get('/', adminController.getHomeWatcher);

router.post('/', adminController.postHomePage);

router.get("/admin/management",middleware.isAuth, middleware.isAdmin, adminController.getManagementPage);

router.post("/admin/management",middleware.isAuth, middleware.isAdmin, adminController.postManagementPage);

router.get("/user/signup", adminController.getAddNewUserWatcher);

module.exports = router;
