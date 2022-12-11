const express = require("express");
const router = new express.Router();
const auth = require("../auth/auth");
const Like = require("../models/likeModel");

router.post("/like/post", auth.verifyUser, function(req,res){
    const data = new Like({
        user_id : req.userInfo._id,
        post_id : req.body.post_id
    })
    data.save()
    .then(function(){
        res.json({msg: "Liked"});
    })
    .catch(function(e){
        res.json({msg: "Something went wrong"});
    })
})

router.delete("/unlike/post/:post_id", auth.verifyUser, function(req, res){
    const user_id = req.userInfo._id;
    const post_id = req.params.post_id;
    Like.deleteOne({user_id:user_id,post_id:post_id})
    .then(function(){
        res.json({msg: "unliked"});
    })
    .catch(function(){
        res.json({msg: "Something went wrong"});
    })
})

module.exports = router;