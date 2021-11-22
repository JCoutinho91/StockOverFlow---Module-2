const router = require("express").Router();
const axios = require("axios");

router.get("/newsfeed", (req, res) => {
  res.render("news-view");
});

router.get("/news-details", (req, res) => {
  res.render("news-view-detail");
});

module.exports = router;
