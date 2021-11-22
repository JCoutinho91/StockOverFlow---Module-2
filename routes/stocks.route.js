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
router.get("/stock-view-details/:stockId", async (req,res)=>{
  const stockId = req.params.stockId
  try{
  const gettingData = await axios.get(`https://www.styvio.com/apiV2/${stockId}/${process.env.API_KEY}`)
  const filteredComment = await Comment.find({ticker: stockId})
    res.render("./stocks-views/stock-view-details", {data: {
      stockInfo: gettingData,
      foundComment: filteredComment}})
  }
    catch(err){console.log(err)}
})

router.post("/stock-view-details/:stockID/create", (req,res)=>{
  console.log("in post")
  const stockId = req.params.stockID
  const { name, comment } = req.body;
  Comment.create({ name: name , comment: comment , ticker : stockId})
  .then((createdComment)=>{
    console.log(createdComment)
  })
  res.redirect(`/stock-view-details/${stockId}`)
  })




module.exports = router;
