const router = require("express").Router();
const axios = require("axios");
const Comment = require("./../models/Comment.model");
const isLoggedIn = require("./../middleware/isLoggedIn");
require("dotenv").config();

router.get("/stocks-views/stock-view", isLoggedIn, (req, res) => {
  res.render("home-view");
});

router.get("/stockcategory", isLoggedIn, (req, res) => {
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
router.get("/stock-view-details/:stockId", isLoggedIn, async (req, res) => {
  const stockId = req.params.stockId;
  const userId = req.session.user._id;
  try {
    const gettingData = await axios.get(
      `https://www.styvio.com/apiV2/${stockId}/${process.env.API_KEY}`
    );
    const filteredComments = await Comment.find({ ticker: stockId }).populate(
      "creator"
    );
    const filteredCommentsCopy = [...filteredComments];

    const updatedComments = filteredCommentsCopy.map((commentObj) => {
      return {
        ...commentObj._doc,
        isCreator: userId === String(commentObj.creator._id),
      };
    });

    console.log("updatedComments", updatedComments);
    res.render("./stocks-views/stock-view-details", {
      data: {
        stockInfo: gettingData,
        foundComment: updatedComments,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/stock-view-details/:stockID/create", isLoggedIn, (req, res) => {
  console.log("in post");
  const stockId = req.params.stockID;
  const { name, comment } = req.body;
  const userId = req.session.user._id;
  Comment.create({
    name: name,
    comment: comment,
    ticker: stockId,
    creator: userId,
  }).then((createdComment) => {});
  res.redirect(`/stock-view-details/${stockId}`);
});

router.get("/stock-view-details/:stockID/edit", isLoggedIn, (req, res) => {
  const StockId = req.params.stockID;
  const userId = req.session.user._id;
  console.log(userId);
  console.log();
  Comment.find({ creator: userId }).then((foundComment) => {
    res.render(`/stocks-views/${stockId}/comment-edit-view`, { foundComment });
  });
});

module.exports = router;
