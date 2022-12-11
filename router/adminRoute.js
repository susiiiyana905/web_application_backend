const express = require("express");
const bcryptjs = require("bcryptjs");
const router = new express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../auth/auth");
const Admin = require("../models/adminModel");
const { json } = require("express/lib/response");

router.post("/admin/register", function(req,res){
    const username = req.body.username;
    Admin.findOne({username:username})
    .then(function(adminData){
        if(adminData != null){
            res.json({message : 'User already exist'});
            return;
        }
        const password = req.body.password;
        bcryptjs.hash(password, 10, function(e, hashed_value){
            const data = new Admin({
                username : username,
                password : hashed_value,
            })
            data.save()
            .then(function(){
                res.json({message : 'Registered Success'})
            })
            .catch(function(e){
                res.json(e)
            })
        })
    })
})

router.post("/admin/login", function(req,res){
    const username = req.body.username;
    Admin.findOne({username: username})
    .then(function(adminData){
        // console.log(userData);
        if(adminData === null){
            return res.json({message: "Invalid username!"});
        }
        //now its time for comparing password between the password
    //provided by user and password stored in db
    const password = req.body.password;
    bcryptjs.compare(password,adminData.password,function(e, result){
        // console.log(result);
        if(result === false){
            return res.json({message: "Invalid!!!"})
        }
        //now lets generate token
        //jsonwebtoken
        const token = jwt.sign({adminId: adminData._id}, "anysecretkey");
        res.json({token: token, message: "success"});
    })
    })
})

module.exports=router;