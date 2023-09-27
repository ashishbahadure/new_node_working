var express=require('express');
var app=express();
var bodyparser=require('body-parser');
app.use(bodyparser.urlencoded({extended:true}));

var mysql=require('mysql');
var conn=mysql.createConnection({
    host:"localhost",
    user:'root',
    password:'',
    database:"node_dev"
});
var session=require("express-session");
app.use(session({
    secret:"a2z",
    resave:true,
    saveUninitialized:true,
}))
var util=require("util");
var execute=util.promisify(conn.query).bind(conn);

app.get("/",function(req,res){
    res.render("login.ejs");
});
app.get("/register",function(req,res){
    res.render("register.ejs");
});
app.post('/create_account',async function(req,res){
   
    // var sql=`CREATE TABLE customer1(customer_id INT PRIMARY KEY AUTO_INCREMENT,customer_name VARCHAR(20),customer_mobile VARCHAR(15),customer_password VARCHAR(30))`;
    var sql=`INSERT INTO customer1(customer_name,customer_mobile,customer_password) VALUES('${req.body.customer_name}','${req.body.customer_mobile}','${req.body.customer_password}')`
    await execute(sql);
    res.redirect('/');
})
app.post("/login_now",async function(req,res){
    var sql=`SELECT * FROM customer1 WHERE customer_mobile='${req.body.mobile}' AND customer_password='${req.body.password}'`;
    var data=await execute(sql);
    if(data.length >0)
    {
        req.session.customer_id=data[0].customer_id;
        // res.send("customer_id:"+data[0].customer_id);
        res.redirect("/home");
    }
    else{
        res.send("login failed");

    }
})
app.get("/home",function(req,res){
   console.log(req.session);
    if(req.session.customer_id==undefined)
    {
        res.redirect("/");
    }
    else
    {
        res.send("home page");
    }
});
app.listen(1000); 