var express=require('express');
var app=express();

app.get("/",(req,res)=>{
     
    var obj={'uname':'xyz','umobile':'9112929020'};
    res.render('home_page.ejs',obj);

});

app.listen(1000);