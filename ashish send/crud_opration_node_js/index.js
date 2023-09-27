var express=require('express');
var app=express()
var url=require('url');
var mysql=require('mysql');
// var util=require('util');
var upload=require('express-fileupload');
app.use(upload());

var bodyparser=require('body-parser');
app.use(bodyparser.urlencoded({extended:true}));

app.use(express.static("public/"))
var conn=mysql.createConnection({
    host:'localhost',
    user:"root",
    password:"root123",
    database:"node_developer"
})






app.get("/",(req,res)=>{
    res.render('form.ejs');
});

app.post('/save_student',(req,res)=>{
    var data=req.body;
    console.log(data);
    console.log(req.files)
    var file_name=req.files.student_photo.name;
    req.files.student_photo.mv('public/uploads/'+file_name);
    
    // var sql=`CREATE TABLE student(student_id int primary key auto_increment,student_name varchar(30),student_mobile varchar(40), student_dob date,student_photo varchar(200))`;

    var sql=`INSERT INTO student(student_name, student_mobile,student_dob,student_photo)VALUES('${data.student_name}','${data.student_mobile}','${data.student_dob}','${file_name}')`;
    conn.query(sql);
    res.redirect('/student_list');


});

app.get("/student_list",(req,res)=>{
    conn.query("SELECT * FROM student",(err,data)=>{
        // console.log(data);
        var obj={"stud_info":data};
        res.render("student_list.ejs",obj);
      })
})

// app.get('/search_student',(req,res)=>{
//     var data=url.parse(req.url,true).query;
//     var sql=`SELECT * FROM student WHERE student_name="${data.serach_student}"`;

//     conn.query(sql,(err,data)=>{
//         res.send(data)

//     })
// })

app.get("/edit_student",(req,res)=>{
    var data=url.parse(req.url,true).query;
    var sql=`SELECT * FROM student WHERE student_id='${data.id}'`;

    conn.query(sql,(err,data)=>{
        // res.send(data)
        var obj={"file_data":data};
        res.render("edit_student.ejs",obj);

    })
})

app.post("/update_student",(req,res)=>{
    var data=req.body.dob;
    res.send(data);
// console.log(req.files.student_photo.name)
   
// if(req.files){
//         var file_name=req.files.student_photo.name;
//         req.files.student_photo.mv("public/uploads/"+file_name);
//         var sql=`UPDATE student SET student_name='${req.body.student_name}',student_mobile='${req.body.student_mobile}',student_dob='${req.body.student_dob}',student_photo='${file_name}' WHERE student_id='${req.body.student_id}'`;
//     }
//     else{
//         var file_name=req.files.student_photo.name;
//         req.files.student_photo.mv("public/uploads/"+file_name);
//         var sql=`UPDATE student SET student_name='${req.body.student_name}',student_mobile='${req.body.student_mobile}',student_dob='${req.body.student_dob}' WHERE student_id='${req.body.student_id}'`;
        
//     }

//     conn.query(sql);
//     res.redirect("/student_list");
})
app.listen(1000);