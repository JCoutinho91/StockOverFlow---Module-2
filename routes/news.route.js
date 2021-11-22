const router = require("express").Router();
const axios = require("axios");
require("dotenv").config();

// // ! original - /newsfeed
// });

router.get("/newsfeed", (req, res) => {
  const arrayStocks = ["AAPL", "AMZN"];
  // !this comment is just to separate to show less stocks for tests
  //, "TESL", "MSFT", "AA", "GOOG"];
  const stocksPrs = arrayStocks.map((ticker) => {
    return axios.get(
      `https://www.styvio.com/apiV2/${ticker}/${process.env.API_KEY}`
    );
  });
  Promise.all(stocksPrs).then((values) => {
    res.render("news-view", { stockList: values });
  });
});

router.get("/news-details", (req, res) => {
  res.render("news-view-detail");
});

module.exports = router;
