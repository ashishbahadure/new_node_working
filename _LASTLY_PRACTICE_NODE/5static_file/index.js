var express=require('express');
var app=express();
app.use(express.static("pubilc/"))
app.get("/",(req,res)=>{
    res.render("home.ejs");
});

app.listen(1000);