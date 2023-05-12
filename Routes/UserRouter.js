const express = require("express");
const controller = require("../Controllers/UserController");
const router = express.Router();

router.post("/api/login", controller.login);
router.post("/api/signup", controller.signup);
module.exports = router;