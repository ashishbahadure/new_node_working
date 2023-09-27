var express=require('express');
var app=express();
var bodyparser=require('body-parser');
app.use(bodyparser.urlencoded({extended:true}));

var url=require('url');
var mysql=require('mysql');
var conn=mysql.createConnection({
    host:'localhost',
    user:"root",
    password:"",
    database:"node_dev"
    
})
app.get("/",function(req,res){
    res.render("student_form.ejs");
})

app.post("/student_list",function(req,res){
    var d=req.body;
    // res.send(req.body.dob);
    //  var sql=`INSERT INTO student 
    //  (name,email,mobile,dob,student_address, roll_number)
    //  VALUES ('${d.name}','${d.email}','${d.mobile}','${d.dob}','${d.address}','${d.roll}')`;
    // conn.query(sql);
    // var sql=`CREATE TABLE customer(customer_id INT PRIMARY KEY AUTO_INCREMENT ,customer_name VARCHAR(30),customer_mobile VARCHAR(15),customer_dob date,customer_address Text)`;
    var sql=`INSERT INTO customer(customer_name,customer_mobile,customer_dob,customer_address) VALUES('${d.name}','${d.mobile}','${d.dob}','${d.address}')`
    conn.query(sql);
    res.send("data recived")
})

app.get("/student_list",function(req,res){
    conn.query("SELECT * FROM customer",function(err,data){
        var obj={'cust_list':data};
    res.render("student_list.ejs",obj)

    });
})

app.get("/search_student",function(req,res)
{
    var urldata=url.parse(req.url,true).query;
    var sql=`SELECT * FROM customer WHERE   
    customer_name  LIKE '%${urldata.search_input}%' OR 
    customer_mobile LIKE '%${urldata.search_input}%' OR customer_dob LIKE '%${urldata.search_input}%' OR customer_address LIKE '%${urldata.search_input}%'`;
    conn.query(sql,function(err,data){
        var obj={'cust_list':data};
    res.render("student_list.ejs",obj);

    });


});
app.get("/edit_student",function(req,res){
    res.render("edit_student.ejs");
})

app.listen(1000);