var express=require('express');
var app=express();

var session=require("express-session");
app.use(session({
    secret:"a2z",
    resave:true,
    saveUninitialized:true
}));

app.get("/",function(req,res){
   if(req.session.homevisits!=undefined){
    req.session.homevisits=req.session.homevisits+1;

   }
   else{
    req.session.homevisits=1;
    
   }    
    res.send("<a href='/about'>About </a> visits ="+req.session.homevisits);
})

app.get("/about",function(req,res){
    if(req.session.aboutvisits!=undefined){
     req.session.aboutvisits=req.session.aboutvisits+1;
 
    }
    else{
     req.session.aboutvisits=1;
     
    }    
     res.send("<a href='/'>home </a> visits ="+req.session.aboutvisits);
 })
app.listen(1000);