var express=require('express');
var app=express();
var mysql=require('mysql');

var conn=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:"node_dev"
})

app.get('/',function(req,res){
    
    var sql=`INSERT INTO teacher(teacher_name,teacher_mobile,teacher_email,teacher_address,teacher_join_date,teacher_salary,teacher_subject,teacher_degree)VALUES('kiran','911299208','ashish@gmail.com','at post telanshi','20-12-2023','49900','marathi','bca');
    `
    conn.query(sql);
    res.send("hello world");

})

app.listen(1000);