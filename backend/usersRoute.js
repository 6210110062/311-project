const express = require("express");
const router = express.Router();
const usersRoute = require("../controller/users");

router.get("/", usersRoute.users);

module.exports = router;

