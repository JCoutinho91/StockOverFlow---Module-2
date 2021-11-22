const router = require("express").Router();
const axios = require("axios");
const Comment = require('./../models/Comment.model');


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

router.get("/stock-view-details/:stockId", (req,res)=>{
  const stockId = req.params.stockId
  return axios.get(
    `https://www.styvio.com/apiV2/${stockId}/${process.env.API_KEY}`
  ).then((stock)=>{
    res.render("./stocks-views/stock-view-details", {stockInfo: stock})
  })
})
router.post("/stock-view-details/:stockId", (req,res)=>{
  const stockId = req.params.stockId
  const { name, comment } = req.body;
  const creatingComment = Comment.create({name,comment})
  const stockData = axios.get(`https://www.styvio.com/apiV2/${stockId}/${process.env.API_KEY}`)

  Promise.all([creatingComment, stockData])
  .then((commentStock)=>{
  res.render("./stocks-views/stock-view-details", {data: commentStock[0]})
  })
})


module.exports = router;

