var express=require("express");
var app=express();
var url=require('url');
var bodyparser=require('body-parser');
app.use(bodyparser.urlencoded({extended:true}));
var mysql=require('mysql');

var conn=mysql.createConnection({
    host:'localhost',
    user:"root",
    password:"", 
    database:"node_dev"
})




app.get("/",(req,res)=>{
    res.render("form.ejs");

})

app.post("/student_info",(req,res)=>{
    // var data=req.url;
    // var urldata=url.parse(data,true).query;
    var urldata=req.body;
    // res.send(urldata);
    // var sql=`CREATE TABLE student2(student_id int primary key auto_increment,student_name varchar(30),student_mobile varchar(20),student_email varchar(30),student_password int)`;
    var sql=`INSERT INTO student2( student_name,student_mobile,student_email,student_password)VALUES('${urldata.student_name}','${urldata.student_mobile}','
        ${urldata.student_email}','${urldata.student_password}')`;
    conn.query(sql);
    // res.send('data recied')
    res.redirect("/student_list");

})


   app.get("/student_list",function(req,res){
    
    conn.query("SELECT * FROM student2",function(err,data){
        var obj={"stud_list":data};
        res.render("student_list.ejs",obj);
       });

})

app.get("/search_student",function(req,res){
    var urldata=url.parse(req.url,true).query;
    var sql=`SELECT * FROM student2 WHERE student_name LIKE '%${urldata.search_input}%' OR student_email LIKE '%${urldata.search_input}%' OR student_mobile LIKE '%${urldata.search_input}%'OR student_password LIKE '%${urldata.search_input}%' `;

    conn.query(sql,function(err,data){
      var obj={'stud_list':data}
      res.render("student_list.ejs",obj);
    })
})

app.get("/edit_student",function(req,res){
    var urldata=url.parse(req.url,true).query;
    conn.query(`SELECT * FROM student2 WHERE student_id='${urldata.id}'`,function(err,data){
        obj={"student_det":data};
    res.render("edit_student.ejs",obj );
    })
    
})

app.post("/save_edited_student",function(req,res){
    var urldata = req.body;
    var sql=`UPDATE student2 SET  
    student_name ='${urldata.student_name}',
    student_email ='${urldata.student_email}',
    student_mobile ='${urldata.student_mobile}',student_password ='${urldata.student_password}' WHERE student_id='${urldata.student_id}'`;
    conn.query(sql);
    res.redirect("/student_list");


});
app.get("/delete_student",(req,res)=>{
    var data=url.parse(req.url,true).query;
    var sql=`DELETE FROM student2 WHERE student_id='${data.id}'`;
    conn.query(sql);
    res.redirect("/student_list");


})
app.listen(1000);