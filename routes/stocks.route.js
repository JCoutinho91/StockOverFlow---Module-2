const router = require("express").Router();
const axios = require("axios");
const Comment = require("./../models/Comment.model");
require("dotenv").config();

router.get("/stocks-views/stock-view", (req, res) => {
  res.render("home-view");
});

router.get("/stockcategory", (req, res) => {
  const arrayStocks = ["AAPL", "AMZN", "TESL", "MSFT", "AA", "GOOG"];
  const stocksPrs = arrayStocks.map((ticker) => {
    return axios.get(
      `https://www.styvio.com/apiV2/${ticker}/${process.env.API_KEY}`
    );
  });
  Promise.all(stocksPrs).then((values) => {
    res.render("./stocks-views/stock-view", { stockList: values });
  });
});
router.get("/stock-view-details/:stockId", (req, res) => {
  const stockId = req.params.stockId;
  return axios
    .get(`https://www.styvio.com/apiV2/${stockId}/${process.env.API_KEY}`)
    .then((stock) => {
      res.render("./stocks-views/stock-view-details", { stockInfo: stock });
      Comment.find({ ticker: stockId });
    });
  Comment.find({ ticker: stockId }).then((foundComment) => {
    console.log(foundComment);
    res.render("./stocks-views/stock-view-details", { foundComment });
  });
});

router.post("/stock-view-details/:stockId/create", (req, res) => {
  const stockId = req.params.stockId;
  const { name, comment } = req.body;
  try {
    const gettingData = await axios.get(
      `https://www.styvio.com/apiV2/${stockId}/${process.env.API_KEY}`
    );
    const filteredComment = await Comment.create({
      name: name,
      comment: comment,
      ticker: stockId,
    });
    res.redirect(`stock-view-details`);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
