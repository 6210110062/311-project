const express = require("express");
router = express.Router();
usersRoute = require("../controller/users");

router.get("/", usersRoute.users);

module.exports = router;

