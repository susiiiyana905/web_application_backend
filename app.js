const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

require("./database/database");

const UserRoute = require("./router/userRoute");
app.use(UserRoute);

const AdminRoute = require("./router/adminRoute");
app.use(AdminRoute);

const PostRoute = require("./router/postRoute");
app.use(PostRoute);

const CommentRoute = require("./router/commentRoute");
app.use(CommentRoute);

const LikeRoute = require("./router/likeRoute");
app.use(LikeRoute);

// const ProfileRoute = require("./router/profileRoute");
// app.use(ProfileRoute);

const FollowRoute = require("./router/followRoute");
app.use(FollowRoute);

const ReportRoute = require("./router/reportRoute");
app.use(ReportRoute);

app.use(express.static(__dirname+'/images/'));

app.listen(3000);