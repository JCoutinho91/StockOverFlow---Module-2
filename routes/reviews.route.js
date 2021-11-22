const router = require("express").Router();
const Comment = require('./../models/Comment.model');
const User = require("./../models/User.model");



router.post("/stock-view-details/:stockId/create", (req,res)=>{
    const stockId = req.params.stockId;
    const { name, comment } = req.body;

    Comment.create( { name: name , comment: comment } )
    .then((createdComment) => {
        return createdComment;
    })
    res.redirect(`/stock-view-details/${stockId}`)
})

module.exports = router;