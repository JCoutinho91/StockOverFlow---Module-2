const router = require("express").Router();
const axios = require("axios");
const Comment = require("./../models/Comment.model");
const isLoggedIn = require("./../middleware/isLoggedIn");
require("dotenv").config();

router.get("/stocks-views/stock-view", isLoggedIn, (req, res) => {
  res.render("home-view");
});
//! TECH LIST
router.get("/techcategory", isLoggedIn, (req, res) => {
  const arrayStocks = [
    "AAPL",
    "AMZN",
    "TESL",
    "MSFT",
    "UBER",
    "GOOG",
    "NVDA",
    "GME",
    "NFLX",
    "PYPL",
  ];
  const stocksPrs = arrayStocks.map((ticker) => {
    return axios.get(
      `https://www.styvio.com/apiV2/${ticker}/${process.env.API_KEY}`
    );
  });
  Promise.all(stocksPrs).then((values) => {
    res.render("./stocks-views/stock-view", { stockList: values });
  });
});
// ! HEALTHCARE
router.get("/healthcategory", isLoggedIn, (req, res) => {
  const arrayStocks = [
    "BMY",
    "PFE",
    "MRK",
    "MDT",
    "MRNA",
    "BSX",
    "ABBV",
    "JNJ",
    "GILD",
    "VTRS",
  ];
  const stocksPrs = arrayStocks.map((ticker) => {
    return axios.get(
      `https://www.styvio.com/apiV2/${ticker}/${process.env.API_KEY}`
    );
  });
  Promise.all(stocksPrs).then((values) => {
    res.render("./stocks-views/stock-view", { stockList: values });
  });
});

// ! industrialcategory
router.get("/industrialcategory", isLoggedIn, (req, res) => {
  const arrayStocks = [
    "AAL",
    "CSX",
    "DAL",
    "BA",
    "UAL",
    "RTX",
    "LUV",
    "GE",
    "CARR",
    "HON",
  ];
  const stocksPrs = arrayStocks.map((ticker) => {
    return axios.get(
      `https://www.styvio.com/apiV2/${ticker}/${process.env.API_KEY}`
    );
  });
  Promise.all(stocksPrs).then((values) => {
    res.render("./stocks-views/stock-view", { stockList: values });
  });
});

// ! BANKS
router.get("/financialcategory", isLoggedIn, (req, res) => {
  const arrayStocks = [
    "BAC",
    "WFC",
    "C",
    "JPM",
    "MS",
    "AIG",
    "HBAN",
    "KEY",
    "AXP",
    "USB",
  ];
  const stocksPrs = arrayStocks.map((ticker) => {
    return axios.get(
      `https://www.styvio.com/apiV2/${ticker}/${process.env.API_KEY}`
    );
  });
  Promise.all(stocksPrs).then((values) => {
    res.render("./stocks-views/stock-view", { stockList: values });
  });
});

// ! ENERGY
router.get("/energycategory", isLoggedIn, (req, res) => {
  const arrayStocks = [
    "OXY",
    "MRO",
    "XOM",
    "HAL",
    "APA",
    "DVN",
    "CVX",
    "COP",
    "SLB",
    "KMI",
  ];
  const stocksPrs = arrayStocks.map((ticker) => {
    return axios.get(
      `https://www.styvio.com/apiV2/${ticker}/${process.env.API_KEY}`
    );
  });
  Promise.all(stocksPrs).then((values) => {
    res.render("./stocks-views/stock-view", { stockList: values });
  });
});

// ! COMMUNICATIONS
router.get("/communicationcategory", isLoggedIn, (req, res) => {
  const arrayStocks = [
    "T",
    "TWTR",
    "FB",
    "ATVI",
    "VIAC",
    "DIS",
    "VZ",
    "LUMN",
    "EA",
    "TMUS",
  ];
  const stocksPrs = arrayStocks.map((ticker) => {
    return axios.get(
      `https://www.styvio.com/apiV2/${ticker}/${process.env.API_KEY}`
    );
  });
  Promise.all(stocksPrs).then((values) => {
    res.render("./stocks-views/stock-view", { stockList: values });
  });
});

//! CONSUMERS STAPLES

router.get("/consumerscategory", isLoggedIn, (req, res) => {
  const arrayStocks = [
    "KO",
    "WMT",
    "KHC",
    "PG",
    "KR",
    "WBA",
    "MDLZ",
    "MO",
    "PM",
    "PEP",
  ];
  const stocksPrs = arrayStocks.map((ticker) => {
    return axios.get(
      `https://www.styvio.com/apiV2/${ticker}/${process.env.API_KEY}`
    );
  });
  Promise.all(stocksPrs).then((values) => {
    res.render("./stocks-views/stock-view", { stockList: values });
  });
});

// !! REAL-ESTATE

router.get("/realestatecategory", isLoggedIn, (req, res) => {
  const arrayStocks = [
    "HST",
    "O",
    "AMT",
    "WY",
    "KIM",
    "PLD",
    "CBRE",
    "IRM",
    "VTR",
    "DLR",
  ];
  const stocksPrs = arrayStocks.map((ticker) => {
    return axios.get(
      `https://www.styvio.com/apiV2/${ticker}/${process.env.API_KEY}`
    );
  });
  Promise.all(stocksPrs).then((values) => {
    res.render("./stocks-views/stock-view", { stockList: values });
  });
});

// !! COMPANIES WITH MOST VOLUME

router.get("/volumecategory", isLoggedIn, (req, res) => {
  const arrayStocks = [
    "F",
    "AAPL",
    "AMD",
    "NVDA",
    "BAC",
    "MU",
    "T",
    "AAL",
    "MSFT",
    "TSLA",
  ];
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
    console.log(updatedComments);
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

router.get("/comment-edit/:stockIDD/:commentId", isLoggedIn, (req, res) => {
  const stockId = req.params.stockIDD
  const userId = req.session.user._id;
  const commentID = req.params.commentId;
  console.log(commentID);
  Comment.findById(commentID).then((foundComment) => {
    console.log(foundComment);
    res.render("./stocks-views/comment-edit-view", { foundComment });
  });
});

router.post("/comment-edit/:stockIDD/:commentId", (req, res) => {
  const stockId = req.params.stockIDD
  const commentID = req.params.commentId;
  const { name, comment, creator } = req.body;

  Comment.findByIdAndUpdate(commentID, { name, comment }, { new: true })
    .then((updatedComment) => {
      res.redirect(`/stock-view-details/${stockId}`);
    })
    .catch((err) => console.log(err));
});

router.post("/comment-edit/delete/:stockIDD/:commentId", (req, res) => {
  console.log("in post");
  const stockId = req.params.stockIDD
  const commentID = req.params.commentId;
  Comment.findByIdAndRemove(commentID)
    .then((status) => {
      console.log("deleted comment", status);
      //here we should redirect to the stock details page
      res.redirect(`/stock-view-details/${stockId}`);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
