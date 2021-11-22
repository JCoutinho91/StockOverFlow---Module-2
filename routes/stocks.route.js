const router = require("express").Router();
const axios = require("axios");


router.get("/stocks-views/stock-view", (req,res)=>{
     res.render("home-view")

    })

router.get("/stockcategory" , (req,res)=>{
   const pr1 = axios.get(urlApple)
   const pr2 = axios.get(urlAmazon)
   const pr3 = axios.get(urlTesla)
   const pr4 = axios.get(urlMicrosoft)
   Promise.all([pr1, pr2, pr3, pr4])
   .then((values) => {
    console.log("values1234:",values)
    res.render("./stocks-views/stock-view", {stockList : values})
  });
})

module.exports = router;


//console.log("values", {values : values[4]});