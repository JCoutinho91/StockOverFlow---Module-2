const router = require("express").Router();
const User = require("./../models/User.model");
const bcrypt = require("bcryptjs");
const zxcvbn = require("zxcvbn");
//Importing Needed Packages

const saltRounds = 10;

router.get("/signup", (req, res) => {
  res.render("auth-views/signup-form");
});

router.post("/signup", (req, res) => {
  const { username, password } = req.body;
  const usernameNotProvided = !username || username === "";
  const passwordNotProvided = !password || password === "";
  if (usernameNotProvided || passwordNotProvided) {
    res.render("auth-views/signup-form", {
      errorMessage: "Provide username and password.",
    });
    return;}
})

module.exports = router;