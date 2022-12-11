const express = require("express");
const router = new express.Router();
const Post = require("../models/postModel");
const jwt = require("jsonwebtoken");
const auth = require("../auth/auth");
const upload = require("../uploads/postfile");
const Comment = require("../models/commentModel");
const Like = require("../models/likeModel");

//to insert 
router.post("/post/insert", auth.verifyUser, upload.single('postimage'), function(req,res){
    if(req.file==undefined){
        return res.json({msg : "invaliddddddd!!"})
    }
    const caption = req.body.caption;
    const image = req.file.filename;
    const data = new Post({
        image: image,
        caption: caption,
        user_id : req.userInfo._id
    })
    data.save()
    .then(function(){
        res.json({success:true, msg: "New post added successfully"});
    }).catch(function(e){
        res.json({msg: "Something went wrong"});
    })
})

// //to insert
// router.post("/post/insert", auth.verifyUser,upload.array('postimages',5),  function(req, res){
//     if(req.files.length==0){
//         return res.json({msg:"Invalid file type"})
//     }
    
//     const caption = req.body.caption;
//     const filesArray = req.files;
//     const filesArrayName = [];
//     for(i=0; i<filesArray.length; i++){
//         filesArrayName.push(filesArray[i].filename);
//     }
//     const data = new Post({
//         image : filesArrayName,
//         caption : caption,
//         user_id : req.userInfo._id,
//     })
//     data.save()
//     .then(function(){
//         res.json({msg: "New post added successfully"});
//     }).catch(function(e){
//         res.json({msg: "Something went wrong"});
//     })
// })

//to update
router.put("/post/update/:pid", auth.verifyUser, function(req, res){
    const pid = req.params.pid;
    const caption = req.body.caption;
    
    Post.updateOne({_id:pid}, {
        caption : caption,
    })
    .then(function(){
        res.json({success:true, message : "Your post has been updated!"})
    })
    .catch(function(){
        res.json({message : "Something went wrong!"})
    })
})

//to delete
router.delete("/post/delete/:_id", auth.verifyUser, function(req,res){
    const pid = req.params._id;
    Post.findByIdAndDelete(pid)
    .then(function(){
        res.json({success:true, msg: "Your post has been deleted!"});
    })
    .catch(function(e){
        res.json({msg: "Something went wrong"});
    })
})

//to display
router.get("/post/get/:pid", auth.verifyUser, async(req,res)=>{
    // console.log("User::", req.userInfo)
    const posts = await Post.findOne({_id : req.params.pid})
    .sort({createdAt : -1});
    const comments = await Comment.find({
        post_id: posts._id
    })
    let result = JSON.parse(JSON.stringify(posts))
    result.comments = comments
    result.commentsNum = comments.length
    
    const likes = await Like.find({
        post_id: posts._id
    })
    result.likes = likes
    result.likesnum = likes.length
    res.json(result);
    
})

router.get("/singlepost/get/:pid", auth.verifyUser, async(req,res)=>{

    const post = await Post.findOne({_id:req.params.pid})
    .populate("user_id", "username profile_pic")
    .sort({createdAt: -1});

    const likeNum = (await Like.countDocuments({post_id: req.params.pid})).toString()
    const commentNum= (await Comment.countDocuments({post_id: req.params.pid})).toString()

    res.send({post: post, likeNum: likeNum, commentNum: commentNum});

})

router.get("/getall/post", auth.verifyUser, async(req,res)=>{
    const posts = await Post.find({user_id : req.userInfo._id})
    .sort({createdAt :-1});
    res.json(posts);
})

router.get("/otheruser/post/:_id", auth.verifyUser, async(req,res)=>{
    const posts = await Post.find({user_id: req.params._id})
    .populate("user_id", "username profile_pic")
    .sort({created: -1});
    res.json(posts);
})

//to delete post by admin



module.exports = router;