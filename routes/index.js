const router = require("express").Router();
const axios = require("axios");
const UserInfo = require("./../models/UserInfo.model");
const fileUploader = require('./../config/cloudinary.config');
const User = require("./../models/User.model");
require("dotenv").config();
//const isLoggedIn = require("isLoggedIn")

router.get("/", (req, res, next) => {
  let userIsLoggedIn = true;
  if (req.session.user) {
    userIsLoggedIn = false;
  }

  res.render("index", {userIsLoggedIn: userIsLoggedIn});
});

router.get("/search", (req, res) => {
  const stockFind = req.query.stockFind;
  console.log(stockFind)
   axios.get(
    `https://www.styvio.com/apiV2/${stockFind}/${process.env.API_KEY}`
  )
  .then((foundStock)=>{
    res.redirect(`stock-view-details/${stockFind}`);
  })
});

router.get("/Profile/:userID", (req, res) => {
  const thisUser = req.params.userID;
  User.findById(thisUser)
  .populate("userInfo")
  .then((foundUser) => {
    console.log(foundUser);
    res.render(`profile-view`, { userprofile: foundUser });
  });
});

router.get("/Profite-edit/:infoID", (req, res) => {
  const thisUser = req.params.infoID;
  User.findById(thisUser)
  .populate("userInfo")
  .then((foundUser) => {
    console.log(foundUser);
    res.render(`profile-edit`, { user: foundUser });
  });
});

router.post("/profite-edit/:infoID", fileUploader.single("profile-cover-image"), (req, res) => {
  let
  if(imageUrl === undefined){
    imageUrl="https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80"
  }
  const Info = req.params.infoID;
  const { firstname, lastname, age, aboutme } = req.body;
  UserInfo.findByIdAndUpdate(Info, {
    firstname: firstname,
    lastname: lastname,
    age: age,
    aboutme: aboutme,
    imageUrl: req.file.path

  }).then((updatedUserInfo) => {
    console.log(updatedUserInfo);
    res.redirect(`./../home-view`);
  });
});

module.exports = router;
