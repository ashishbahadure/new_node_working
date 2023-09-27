var express=require('express');
var app=express();


app.get("",function(req,res){
    var page=`<a href="/">Home</a>
              <a href="/about">about</a>
              <h1>home page</h1>`
    res.send(page);
})


app.get("/about",function(req,res){
    var page=`<a href="/">Home</a>
              <a href="/about">Home</a>
              <h1>about page</h1>`
    res.send(page);
})

app.listen(1000);