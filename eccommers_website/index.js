var express=require('express');
var app=express();

app.use(express.static('public/'));

app.get("/index",function(req,res){
    res.render("index.ejs");
});


app.get("/shop",function(req,res){
    res.render("shop.ejs");
});

app.get('/why',function(req,res){
    res.render('why.ejs');
});
app.get('/testimonial',function(req,res){
    res.render("testimonial.ejs");
});

app.get('/contact',function(req,res){
    res.render("contact.ejs");
})
app.listen(1000);