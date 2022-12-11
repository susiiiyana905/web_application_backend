const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
    user_id: {
        type : mongoose.Types.ObjectId, ref : "User"
    },
    post_id : {
        type : mongoose.Types.ObjectId, ref : "Post"
    }
},
{
    timestamps : true,
}
);

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;