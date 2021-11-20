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
    return;
  }

  User.findOne({ username: username })
    .then((foundUser) => {
      if (foundUser) {
        throw new Error("The username is taken");
      }
      // Generating the salt string
      return bcrypt.genSalt(saltRounds);
    })
    .then((salt) => {
      // Encrypt the password
      return bcrypt.hash(password, salt);
    })
    .then((hashedPassword) => {
      // Create the new user
      return User.create({ username: username, password: hashedPassword });
      // return User.create({ username, password: hashedPassword });
    })
    .then((createdUser) => {
      // Redirect to the home `/` page after the successful signup
      res.redirect("/");
    })
    .catch((err) => {
      res.render("auth-views/signup-form", {
        errorMessage: err.message || "Error while trying to sign up",
      });
    });
});

router.get("/index", (req, res) => {
  res.render("/home");
});

// POST /login
router.post("/index", (req, res) => {
  // Get the username and password from the req.body
  const { username, password } = req.body;

  // Check if the username and the password are provided
  const usernameNotProvided = !username || username === "";
  const passwordNotProvided = !password || password === "";

  if (usernameNotProvided || passwordNotProvided) {
    res.render("/", {
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
        res.redirect("home");
      }
    })
    .catch((err) => {
      res.render("/", {
        errorMessage: err.message || "Provide username and password.",
      });
    });
});

module.exports = router;
