var express=require('express');
var app=express();

app.get("",function(req,res){
    var obj={'name':'ashish','mob':"9112992097"}
    res.render('home.ejs',obj)
    res.send('server created')
});

app.listen(1000);