const router = require("express").Router();
const axios = require("axios");
const url = "https://www.styvio.com/apiV2/AAPL/6884aa98-de8d-4ae2-bcd1-bab479e90c8b"

router.get("/stocks-views/stock-view", (req,res)=>{
    axios.get(url)
    .then((stockdata) =>{
        console.log(stockdata.data.ticker)
        res.render("/home-view", { stockList: stockdata.data });
    })
    .catch((err)=>{
        console.log(err)
    })
})



module.exports = router;