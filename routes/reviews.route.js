const router = require('express').Router();
const Comment = require('./../models/Comment.model');
const User = require("./../models/User.model");



router.post("/stock-view-details/:stockId", (req,res)=>{
    const stockId = req.params.stockId;
    const { name, comment } = req.body;
    console.log(stockId);
    console.log(req.body);

    Comment.create( {name, comment} )
    .then((createdComment)=>{
        console.log(createdComment) 
    })

})

module.exports = router;
