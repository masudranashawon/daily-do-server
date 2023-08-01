const express = require("express");
const { signupUser, loginUser } = require("../controllers/user.controller");

//Router
const router = express.Router();

//Signup
router.post("/auth/signup", signupUser);

//Login
router.post("/auth/login", loginUser);

module.exports = router;
