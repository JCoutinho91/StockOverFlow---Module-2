// ! SHOULD WE MOVE THIS FILE TO OTHER ROUTE????
// ! MAYBE FOR THE isLoggedIn MAKE SENSE
const router = require("express").Router();
const axios = require("axios");
require("dotenv").config();

// const isLoggedIn = require("isLoggedIn")

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// router.get("/stocks-views/stock-view", (req, res) => {
//   res.render("home-view");
// });

// router.get("/stockcategory", (req, res) => {
//   const arrayStocks = ["AAPL", "AMZN", "TESL", "MSFT", "AA", "GOOG"];
//   const stocksPrs = arrayStocks.map((ticker) => {
//     return axios.get(
//       `https://www.styvio.com/apiV2/${ticker}/${process.env.API_KEY}`
//     );
//   });
//   Promise.all(stocksPrs).then((values) => {
//     res.render("./stocks-views/stock-view", { stockList: values });
//   });
// });

module.exports = router;
