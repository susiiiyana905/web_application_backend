const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = new express.Router();
const User = require("../models/userModel");
const { append } = require("express/lib/response");
const fs = require("fs");

const auth = require("../auth/auth");
const { route } = require("express/lib/application");
const req = require("express/lib/request");

const upload = require("../uploads/profilefile");

router.post("/user/register", function(req,res){
    const username = req.body.username;
    User.findOne({username: username})
    .then(function(userData){
        if(userData != null){
            res.json({message : "User Already Exists!!"});
            return;
        }
        //now this place is for the user which is not available in db
        const password = req.body.password;
        bcryptjs.hash(password, 10, function(e, hashed_value){
          const data = new User({
            username : username,
            password : hashed_value,
            profile_pic : "profilepic.png"
        })
        data.save()
        .then(function(){
            res.json({success : true, message : "Registered Success"});
        })
        .catch(function(e){
            res.json({message: e.message})
        })
        })
    })
})

//login route for user
router.post("/user/login", function(req,res){
    const username = req.body.username;
    User.findOne({username: username})
    .then(function(userData){
        // console.log(userData);
        if(userData === null){
            return res.json({message: "Invalid username!"});
        }
        //now its time for comparing password between the password
    //provided by user and password stored in db
    const password = req.body.password;
    bcryptjs.compare(password,userData.password,function(e, result){
        // console.log(result);
        if(result === false){
            return res.json({message: "Invalid!!!"})
        }
        //now lets generate token
        //jsonwebtoken
        const token = jwt.sign({userID: userData._id}, "anysecretkey");
        res.json({token: token, message: "success"});
    })
    })
})


router.get("/profile", auth.verifyUser, async(req,res)=>{
    // res.json({msg : req.userInfo.phone_no});
    const user = await User.findOne({_id : req.userInfo._id});
    res.json(user);
})

router.get("/otheruser/profile/:_id", auth.verifyUser, async(req,res)=>{
    // res.json({msg : req.userInfo.phone_no});
    const user = await User.findOne({_id : req.params._id});
    res.json(user);
})

//profile update of user
router.put("/user/update", auth.verifyUser, function(req,res){
    // console.log(req.userInfo._id);
    const uid = req.userInfo._id;
    const {
        fname,
        lname,
        bio,
        dob,
        gender,
        username,
        email,
        phone_no
    } = req.body
    
    // let profile_pic = ""
    // if(req.file!=undefined){
    //     // return res.json({msg : "invalidddddddddddddddd"})
    //     console.log(req.file)
    //     profile_pic = req.file.filename;
    //     // profile_pic = req.file.path;
    // }
    const updatedProfile = {
        fname,
        lname,
        bio,
        dob,
        gender,
        username,
        email,
        phone_no
        // profile_pic
    }
    User.updateOne({_id : uid},updatedProfile)
    .then(function(){
        res.json({success:true, msg: "Profile updated!"})
    })
    .catch(function(e){
        res.json({msg: e})
    });
})

//to update profile pic of user
router.put("/profilepic", auth.verifyUser, upload.single("myimage"), function(req, res){
    const uid = req.userInfo._id;
    if(req.file===undefined){
        return res.json({msg: "Invaliddd!!"})
    }
    User.findOne({_id: uid})
    .then(function(userData){
        if(userData.profile_pic!=="profilepic.png"){
            fs.unlinkSync("./images/profile/"+userData.profile_pic)
        }
        User.updateOne({_id: uid},{
            profile_pic : req.file.filename
        })
        .then(function(){
            res.json({msg: "Profile picture added successfully!"})
        })
        .catch(function(e){
            res.json({msg: e})
        })
    })
   
})

//to delete profile pic of user
router.delete("/delete/profilepic", auth.verifyUser, function(req, res){
    const uid = req.userInfo._id;
    User.findOne({_id: uid})
    .then(function(userData){
        if(userData.profile_pic!=="profilepic.png"){
            fs.unlinkSync("./images/profile/"+userData.profile_pic)
        }
        User.updateOne({_id: uid},{
            profile_pic : "profilepic.png"
        })
        .then(function(){
            res.json({msg: "Profile picture removed successfully!"})
        })
        .catch(function(e){
            res.json({msg: e})
        })
    })
   
})



//to delete user by itself
router.delete("/user/delete", auth.verifyUser, function(req,res){
    const uid = req.userInfo._id;
    User.findByIdAndDelete(uid)
    .then(function(){
        res.json({success:true, msg: "User deleted!"})
    })
    .catch(function(e){
        res.json({msg: e})
    })
})

// to delete user by admin
router.delete("/user/profile/delete", auth.verifyAdmin, function(req,res){
    const uid = req.body.id;
    User.deleteOne({_id : uid})
    .then(()=>{
        res.json({sucess:true, msg:"Profile Deleted!!"})
    })
    .catch(function(e){
        res.json({msg: e})
    })
})

//to search user by username
router.post("/search/user", auth.verifyUser, async(req, res)=>{
    
    const keyUsername = req.body.username

    ? {username: { $regex: req.body.username, $options: "i" }}

    :{};
    const users = await User.find(keyUsername)
    res.send(users);
})


module.exports = router;