const router = require("express").Router();
// const isLoggedIn = require("isLoggedIn")

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/stocks-views/stock-view", (req, res) => {
  res.render("home-view");
});

module.exports = router;
