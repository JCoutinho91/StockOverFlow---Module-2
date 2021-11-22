const router = require("express").Router();
const axios = require("axios");
require("dotenv").config();
const urlApple = `https://www.styvio.com/apiV2/AAPL/${process.env.API_KEY}`;
const urlAmazon = `https://www.styvio.com/apiV2/AMZN/${process.env.API_KEY}`;
const urlTesla = `https://www.styvio.com/apiV2/TESL/${process.env.API_KEY}`;
const urlMicrosoft = `https://www.styvio.com/apiV2/MSFT/${process.env.API_KEY}`;
router.get("/stocks-views/stock-view", (req, res) => {
  res.render("home-view");
});

router.get("/stockcategory", (req, res) => {
  const arrayStocks = ["AAPL", "AMZN", "TESL", "MSFT", "AA"];
  const stocksPrs = arrayStocks.map((ticker) => {
    return axios.get(
      `https://www.styvio.com/apiV2/${ticker}/${process.env.API_KEY}`
    );
  });
  Promise.all(stocksPrs).then((values) => {
    res.render("./stocks-views/stock-view", { stockList: values });
  });
});

module.exports = router;
