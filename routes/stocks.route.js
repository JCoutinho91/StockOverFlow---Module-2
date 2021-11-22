const router = require("express").Router();
const axios = require("axios");
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
  console.log(stockId);
  return axios.get(
    `https://www.styvio.com/apiV2/${stockId}/${process.env.API_KEY}`
  ).then((stock)=>{
    res.render("./stocks-views/stock-view-details", {stockInfo: stock})
  })
})






 



module.exports = router;
