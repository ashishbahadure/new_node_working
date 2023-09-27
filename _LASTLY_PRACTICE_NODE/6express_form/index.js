var express=require('express');
 var app=express();
var url=require('url');

 app.get("/",function(req,res){
    res.render('form.ejs');
 })
 
app.get("/register_student",function(req,res){
    // res.send(req.url)
    var urldata=req.url;
    var data=url.parse(urldata,true).query;
    res.send(data);
})
 app.listen(1000);