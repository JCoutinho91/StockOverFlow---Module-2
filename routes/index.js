const router = require("express").Router();
const bcrypt = require("bcryptjs");
const axios = require("axios");
const UserInfo = require("./../models/UserInfo.model");
const fileUploader = require('./../config/cloudinary.config');
const User = require("./../models/User.model");
const isLoggedIn = require("./../middleware/isLoggedIn");
require("dotenv").config();

router.get("/", (req, res, next) => {
  let userIsLoggedIn = true;
  if (req.session.user) {
    userIsLoggedIn = false;
  }

  res.render("index", {userIsLoggedIn: userIsLoggedIn});
});

router.post("/",  (req, res) => {
  let userIsLoggedIn = true;
  if (req.session.user) {
    userIsLoggedIn = false;
  }

  const { username, password } = req.body;
  
  const usernameNotProvided = !username || username === "";
  const passwordNotProvided = !password || password === "";

  if (usernameNotProvided || passwordNotProvided) {
    res.render("index", {
      errorMessage: "Provide username and password.",userIsLoggedIn: userIsLoggedIn},
    );
    return
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


router.get("/search", isLoggedIn, (req, res) => {
  console.log("req.query", req.query)
  const stockFind = req.query.stockFind;
  if(stockFind=== ""){
    res.redirect("home-view")
  }else{
   axios.get(
    `https://www.styvio.com/apiV2/${stockFind}/${process.env.API_KEY}`
  )
  .then((foundStock)=>{
    res.redirect(`stock-view-details/${stockFind}`);
  })}
});

router.get("/Profile/:userID", isLoggedIn,  (req, res) => {
  const thisUser = req.params.userID;
  User.findById(thisUser)
  .populate("userInfo")
  .then((foundUser) => {
    console.log(foundUser);
    res.render(`profile-view`, { userprofile: foundUser });
  });
});

router.get("/Profite-edit/:infoID", isLoggedIn, (req, res) => {
  const thisUser = req.params.infoID;
  User.findById(thisUser)
  .populate("userInfo")
  .then((foundUser) => {
    console.log(foundUser);
    res.render(`profile-edit`, { user: foundUser });
  });
});

router.post("/profite-edit/:infoID", fileUploader.single("profile-cover-image"), (req, res) => {
  const Info = req.params.infoID;
  const { firstname, lastname, age, aboutme } = req.body;
  let tempImage;
if (!req.file) {
  tempImage = "/images/defaultcover.png";
} else {
  tempImage = req.file.path;
}
  UserInfo.findByIdAndUpdate(Info, {
    firstname: firstname,
    lastname: lastname,
    age: age,
    aboutme: aboutme,
    imageUrl: tempImage
  })
  
  .then((updatedUserInfo) => {
    console.log(updatedUserInfo);
    res.redirect(`./../home-view`);
  });
});

module.exports = router;