const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Admin = require("../models/adminModel");


//guard for user
module.exports.verifyUser = function(req,res,next){
    try{
        const token = req.headers.authorization.split(" ")[1];
        const udata = jwt.verify(token, "anysecretkey");
        //select * from users where _id = udata.userID
        User.findOne({_id: udata.userID})
        .then(function(userData){
            // console.log(userData)
            req.userInfo = userData;
            next();
        })
        .catch(function(e){
            res.json({error : e.message})
        })
    }
    catch(e){
        res.json({error : e.message})
    }
}



// guard for admin
module.exports.verifyAdmin = function(req,res,next){
    try{
        const token = req.headers.authorization.split(" ")[1];
        const adata = jwt.verify(token, "anysecretkey");
        Admin.findOne({_id: adata.userID})
        .then(function(adminData){
            // console.log(adminData)
            req.adminInfo = adminData;
            next();
        })
        .catch(function(e){
            res.json({error : e})
        })
    }
    catch(e){
        res.json({error : e})
    }
}
