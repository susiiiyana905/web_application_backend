const mongoose = require("mongoose");

const Like = mongoose.model("Like", {
    user_id : {
        type : mongoose.Types.ObjectId, ref : "User"
    },
    post_id :{
        type : mongoose.Types.ObjectId, ref : "Post"
    }
})

module.exports = Like;