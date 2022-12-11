const express = require("express");
const router = new express.Router();
const auth = require("../auth/auth");
const Comment = require("../models/commentModel");


router.post("/comment/insert", auth.verifyUser, function(req,res){
    const comment = req.body.comment;

    const data = new Comment({
        comment : comment,
        user_id : req.userInfo._id,
        post_id : req.body.post_id,
    })
    data.save()
    // Comment.findOneAndDelete(comment_id,req.userInfo._id)
    .then(function(){
        res.json({success:true, msg: "Comment added"});
    }).catch(function(e){
        res.json({msg: "Something went wrong"});
    })
})

router.delete("/comment/delete/:post_id", auth.verifyUser, function(req, res){
    const post_id = req.params.post_id;
    const user_id = req.userInfo._id;
    Comment.deleteOne({user_id: user_id, post_id:post_id})
    .then(function(){
        res.json({sucess:true, msg: "Your comment has been deleted!"});
    })
    .catch(function(e){
        res.json({msg: "Something went wrong"});
    })
})

router.put("/comment/update", auth.verifyUser, function(req,res){
    const comment = req.body.comment;
    const cid = req.body._id;

    Comment.updateOne({_id:cid},{
        comment : comment
    })
    .then(function(){
        res.json({message : "Your comment has been updated!"});
    })
    .catch(function(e){
        res.json({message : "Something went wrong"});
    })
})

// router.get("/comment/insert", auth.verifyUser, function(req,res){
//     const comment = req.body.comment;

//     const data = new Comment({
//         comment : comment,
//         user_id : req.userInfo._id,
//         post_id : req.body._id,
//     })
//     data.save()
//     // Comment.findOneAndDelete(comment_id,req.userInfo._id)
//     .then(function(){
//         res.json({msg: "Comment added"});
//     }).catch(function(e){
//         res.json({msg: "Something went wrong"});
//     })
// })

module.exports = router;