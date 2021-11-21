 const router = require("express").Router();


router.get("/newsfeed", (req,res)=>{
    res.render("news-view")
})

router.get("/news-details", (req,res)=>{
    res.render("news-view-detail")
})








 module.exports = router;