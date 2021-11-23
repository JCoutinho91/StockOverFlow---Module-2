const router = require("express").Router();
const axios = require("axios");
const isLoggedIn = require("./../middleware/isLoggedIn")
require("dotenv").config();

// // ! original - /newsfeed

router.get("/newsfeed", isLoggedIn,(req, res) => {
  const arrayStocks = ["AAPL", "AMZN"];
  // !this comment is just to separate to show less stocks for tests
  //, "TESL", "MSFT", "AA", "GOOG"];
  const stocksPrs = arrayStocks.map((ticker) => {
    return axios.get(
      `https://www.styvio.com/apiV2/${ticker}/${process.env.API_KEY}`
    );
  });
  Promise.all(stocksPrs)
  .then((values) => {
    // console.log(values[0].data.companyInformation.newsData)
    res.render("news-view", { newsList: values[0].data.companyInformation.newsData });
  });
});

router.get("/news-details",isLoggedIn, (req, res) => {
  res.render("news-view-detail");
  const userSessionID = req.sessionID
  console.log(userSessionID)
});

module.exports = router;
