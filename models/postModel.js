const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    image : 
    {
        type : String
    },
    caption : {
        type : String
    },
    user_id : {
        type : mongoose.Types.ObjectId, ref : "User"
    }
},
{
    timestamps : true,
}
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;