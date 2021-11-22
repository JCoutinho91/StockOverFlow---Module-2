const router = require("express").Router();
const axios = require("axios");
const urlApple = "https://www.styvio.com/apiV2/AAPL/70423544-06fc-489c-82e5-3508e4201962"
const urlAmazon = "https://www.styvio.com/apiV2/TSLA/70423544-06fc-489c-82e5-3508e4201962"
const urlTesla = "https://www.styvio.com/apiV2/AMZN/70423544-06fc-489c-82e5-3508e4201962"
const urlMicrosoft = "https://www.styvio.com/apiV2/MSFT/70423544-06fc-489c-82e5-3508e4201962"
const urlGoogle = "https://www.styvio.com/apiV2/GOGGL/70423544-06fc-489c-82e5-3508e4201962"


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