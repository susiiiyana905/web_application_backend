const mongoose = require("mongoose");

const followSchema = new mongoose.Schema({
    follower : {
        type : mongoose.Types.ObjectId, ref : "User"
    },
    following : {
        type : mongoose.Types.ObjectId, ref : "User"
    }
},
{
    timestamps : true,
}
);

const Follow = mongoose.model("Follow",followSchema);

module.exports = Follow;