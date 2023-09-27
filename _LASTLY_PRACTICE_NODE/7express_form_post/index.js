var express=require('express');
var app=express();
var bodyparser=require('body-parser');

app.use(bodyparser.urlencoded({extends:true}))

app.get("/",(req,res)=>{

    res.render("form_post.ejs");
});

app.post("/save_student",(req,res)=>{

    res.send(req.body);
})
app.listen(1000);