const router = require("express").Router();
const User = require("./../models/User.model");
const UserInfo = require("./../models/UserInfo.model");
const bcrypt = require("bcryptjs");
const zxcvbn = require("zxcvbn");
const axios = require("axios");
const isLoggedIn = require("./../middleware/isLoggedIn");
require("dotenv").config();
//Importing Needed Packages

const saltRounds = 10;

router.get("/signup", (req, res) => {
  res.render("auth-views/signup-form");
});

router.get("/home-view", isLoggedIn, (req, res) => {
  const userId = req.session.user._id;

  res.render("home-view", { user: userId });
});

router.post("/signup", (req, res) => {
  const { username, password } = req.body;
  const usernameNotProvided = !username || username === "";
  const passwordNotProvided = !password || password === "";
  if (usernameNotProvided || passwordNotProvided) {
    res.render("auth-views/signup-form", {
      errorMessage: "Provide username and password.",
    });
    return;
  }

  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
  if (!regex.test(password)) {
    res.status(400).render("auth-views/signup-form", {
      errorMessage:
        "Password needs to have at least 8 chars and must contain at least one number, one lowercase and one uppercase letter.",
    });

    return;
  }
  let createdUserInfo;

  User.findOne({ username: username })
    .then((foundUser) => {
      if (foundUser) {
        throw new Error("The username is taken");
      }
      return UserInfo.create({});
      // Generating the salt string
    })
    .then((userInfo) => {
      createdUserInfo = userInfo;
      return bcrypt.genSalt(saltRounds);
    })
    .then((salt) => {
      // Encrypt the password
      return bcrypt.hash(password, salt);
    })
    .then((hashedPassword) => {
      return User.create({
        username: username,
        password: hashedPassword,
        userInfo: createdUserInfo._id,
      });
    })
    .then((createdUser) => {
      res.redirect("/");
    })
    .catch((err) => {
      res.render("/auth-views/signup-form", {
        errorMessage: err.message || "Error while trying to sign up",
      });
    });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const usernameNotProvided = !username || username === "";
  const passwordNotProvided = !password || password === "";

  if (usernameNotProvided || passwordNotProvided) {
    res.render("index", {
      errorMessage: "Provide username and password.",
    });
    return;
  }

  let user;
  // Check if the user exists
  User.findOne({ username: username })
    .then((foundUser) => {
      user = foundUser;
      if (!foundUser) {
        throw new Error("Wrong credentials");
      }

      // Compare the passwords
      return bcrypt.compare(password, foundUser.password);
    })
    .then((isCorrectPassword) => {
      if (!isCorrectPassword) {
        throw new Error("Wrong credentials");
      } else if (isCorrectPassword) {
        req.session.user = user;
        res.redirect("home-view");
      }
    })
    .catch((err) => {
      res.render("index", {
        errorMessage: err.message || "Provide username and password.",
      });
    });
});

router.get("/logout", isLoggedIn, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.render("error");
    }
    res.redirect("/");
  });
});

module.exports = router;
