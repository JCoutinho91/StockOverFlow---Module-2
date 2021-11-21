 const router = require("express").Router();




router.get("/home", (req,res)=>{
    res.render("/news-views/news-view")
})








 module.exports = router;