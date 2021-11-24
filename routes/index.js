const router = require("express").Router();
const axios = require("axios");
const UserInfo = require("./../models/UserInfo.model");
const fileUploader = require('./../config/cloudinary.config');
require("dotenv").config();
//const isLoggedIn = require("isLoggedIn")

router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/search/:stockId", (req, res) => {
  const stockFind = req.query.stockFind;
   axios.get(
    `https://www.styvio.com/apiV2/${stockFind}/${process.env.API_KEY}`
  )
  .then((foundStock)=>{
    res.redirect(`/stock-view-details/${stockFind}`);
  })
});

router.get("/Profile/:userID", (req, res) => {
  const thisUser = req.params.userID;
  UserInfo.findOneAndUpdate({ user: thisUser }).then((foundUser) => {
    console.log(foundUser);
    res.render(`profile-view`, { userprofile: foundUser });
  });
});

router.get("/Profite-edit/:infoID", (req, res) => {
  const Info = req.params.infoID;
  console.log(Info);
  res.render("profile-edit", { user: Info });
});

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
