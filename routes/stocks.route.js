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

<<<<<<< HEAD
    const updatedComments = filteredCommentsCopy.map((commentObj) => {
      return {
        ...commentObj._doc,
        isCreator: userId === String(commentObj.creator._id),
      };
    });
=======
    const updatedComments = filteredCommentsCopy.map((commentObj)=>{
     return {...commentObj._doc, isCreator: userId === String(commentObj.creator._id) }
      })
      console.log(updatedComments)
>>>>>>> 21e04ee9d5a7df7299618374c6655abd2802bdf0
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

<<<<<<< HEAD
router.get("/comment-edit/editstock/:commentId", isLoggedIn, (req, res) => {
  const userId = req.session.user._id;
  const commentID = req.params.commentId;
  console.log(userId);
  console.log();
  Comment.findById({ commentID }).then((foundComment) => {
    console.log(foundComment);
    res.render("./stocks-views/comment-edit-view", { foundComment });
  });
});
=======
router.get("/comment-edit/editstock/commentId", isLoggedIn, (req,res)=>{
  const userId = req.session.user._id
  const commentIDD = req.params.commentId

   Comment.findById({commentIDD})
  .then((foundComment)=>{
    console.log(foundComment)
    res.render("./stocks-views/comment-edit-view", { foundComment } );
  })
})
  
>>>>>>> 21e04ee9d5a7df7299618374c6655abd2802bdf0

module.exports = router;
