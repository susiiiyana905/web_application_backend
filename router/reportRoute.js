const express = require("express");
const router = new express.Router();
const auth = require("../auth/auth");
const Report = require("../models/reportModel");

router.post("/report/post", auth.verifyUser, async(req, res)=>{
  const data = new Report({
      user_id : req.body.user_id,
      post_id : req.body.post_id,
  })  
  data.save()
  .then(function(){
      res.json({msg : "Reported"});
  })
  .catch(function(e){
      res.json({msg: "Somethng went wrong"});
  })
})

router.post("/report/get", auth.verifyAdmin, async(req,res)=>{
    const reports = await Report.findOne({_id : req.body._id})
    .sort({createdAt : -1});
    res.send(reports);
})

router.post ("/get/all/report", auth.verifyAdmin, async(req,res)=>{
    const reports = await Report.find();
    res.send(reports);
})

module.exports = router;