var express=require('express');
var app=express();

var session=require("express-session");
app.use(session({
    secret:"a2z",
    resave:true,
    saveUninitialized:true
}));

app.get("/",function(req,res){
   res.render("loginform.ejs");

});
app.get("/processLogin",function(req,res){
    req.session.username="ABCD ZYZ";
    res.redirect("/home");
}); 
var nav=`<a href="/home">Home</a><br>
        <a href="/reels">reels</a><br>
        <a href="/notifiction">notifiction</a><br>
        <a href="/profile">profile</a>`;


app.get("/home",function(req,res){
    if(req.session.username==undefined)
    res.redirect("/");
    else{
    console.log(req.session);
    res.send(nav+"Home page open")
    }
})
 
app.get("/reels",function(req,res){
    if(req.session.username==undefined)
    res.redirect("/");
    else{
    console.log(req.session);
    res.send(nav+"reels page open")
    }
    })
    
app.get("/notifiction",function(req,res){
    if(req.session.username==undefined)
    res.redirect("/");
    else{
    console.log(req.session);
    res.send(nav+"notifiction page open")
    }
    }) 
     
app.get("/profile",function(req,res){
    if(req.session.username==undefined)
    res.redirect("/");
    else{
    console.log(req.session);
    res.send(nav+"profile page open")
    }
    })
app.listen(1000);