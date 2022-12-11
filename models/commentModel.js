const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    comment : {
        type : String
    },
    user_id : {
        type : mongoose.Types.ObjectId, ref : "User"
    },
    post_id :{
        type : mongoose.Types.ObjectId, ref : "Post"
    }
},
{
    timestamps : true,
}
);

const Comment = mongoose.model("Comment",commentSchema);

module.exports = Comment;