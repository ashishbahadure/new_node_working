var express=require("express");
var app=express();

var upload=require('express-fileupload');
app.use(upload());
var bodyparser=require('body-parser');
app.use(bodyparser.urlencoded({extended:true}));

var mysql=require("mysql");
var conn=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"node_dev"
})
var util=require("util");
const { exec } = require("child_process");
var execute=util.promisify(conn.query).bind(conn);
app.get("/",function(req,res){
    res.render('registartion.ejs');
});

app.post("/save_information",async function(req,res){
    var file_name=req.files.user_photo.name;
    req.files.user_photo.mv("public/uploads/"+file_name);
    // await execute("CREATE TABLE user_tbl(user_id INT PRIMARY KEY AUTO_INCREMENT,user_name VARCHAR(10),user_photo VARCHAR(20))");
    await execute(`INSERT INTO user_tbl(user_name,user_photo) VALUES('${req.body.user_name}','${file_name}')` );
    res.send("data received in post");
})

app.listen(1000);