var express=require("express");
var router=express.Router();

router.get("/",function(req,res){
  res.render("admin/home.ejs");
})

router.get("/manage_questions",function(req,res){
  res.render("admin/manage_subject.ejs")
})
module.exports =router;