const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    profile_pic :{
        type : String,
        default:""
    },
    fname : {
        type : String,
        default:""
        
    },
    lname : {
        type : String,
        default:""
    },
    bio : {
        type : String,
        default:""
    },
    dob : {
        type : String,
        default:""
    },
    gender : {
        type : String,
        default:""
    },
    email : {
        type : String,
        default:""
    },
    phone_no : {
        type : String,
        default:""
    },
    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true,
    },
},
{
    timestamps :true,
}
);
const User = mongoose.model("User", userSchema);

module.exports = User;