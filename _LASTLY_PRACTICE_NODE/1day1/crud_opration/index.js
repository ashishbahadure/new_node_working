var express=require('express');
var app=express();
var url=require("url");

app.get("/",function(req,res){
    res.render("form.ejs");
});

app.get("/student_info",function(req,res){
    // res.send("data received")
    // res.end(req.url);
    var data=req.url;
    var urldata=url.parse(data,true).query;
    res.send(urldata);
})

app.listen(1000);


