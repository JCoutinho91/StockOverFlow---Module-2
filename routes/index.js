const router = require("express").Router();
const axios = require("axios");
const UserInfo = require("./../models/UserInfo.model");
const fileUploader = require('./../config/cloudinary.config');
const User = require("./../models/User.model");
const isLoggedIn = require("./../middleware/isLoggedIn");
require("dotenv").config();
//const isLoggedIn = require("isLoggedIn")

router.get("/", (req, res, next) => {
  let userIsLoggedIn = true;
  if (req.session.user) {
    userIsLoggedIn = false;
  }

  res.render("index", {userIsLoggedIn: userIsLoggedIn});
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

pictureFix = () =>{
  if(req.file.path === undefined){
    return url
  }else{req.file.path}
}

router.post("/profite-edit/:infoID", fileUploader.single("profile-cover-image"), (req, res) => {
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
