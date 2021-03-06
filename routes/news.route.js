const router = require("express").Router();
const axios = require("axios");
const isLoggedIn = require("./../middleware/isLoggedIn");
const NewsAPI = require("newsapi");
const newsapi = new NewsAPI("e30e8f0548f94d3f988b69277c3c9532");
const Comment = require("./../models/Comment.model");
require("dotenv").config();

router.get("/newsfeed", isLoggedIn, (req, res) => {
  newsapi.v2
    .everything({
      q: "stock market",
      sources: "bbc-news,the-verge",
      domains: "bbc.co.uk,techcrunch.com",
      from: "2021-11-05",
      to: "2021-11-23",
      language: "en",
      sortBy: "relevancy",
      page: 2,
    })
    .then((data) => {
      console.log(data);
      res.render("news-view", { newsData: data.articles });
    });
});

module.exports = router;
