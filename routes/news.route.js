 const router = require("express").Router();


router.get("/newsfeed", (req,res)=>{
    res.render("news-view")
})








 module.exports = router;