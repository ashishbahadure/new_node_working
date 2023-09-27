var express=require('express');
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
});

app.get("/",function(req,res){
    res.render("teacher_form.ejs");

});
app.post("/teacher_list",function(req,res){
    // var urldata=url.parse(req.url,true).query
    var d=req.body;
    // // res.send(d)
    //  var sql=`CREATE TABLE teacher(teacher_id INT PRIMARY KEY AUTO_INCREMENT,teacher_name VARCHAR(50),teacher_email VARCHAR(50),teacher_mobile VARCHAR(15),teacher_dob date)`;
    var sql=`INSERT INTO teacher(teacher_name,teacher_email,teacher_mobile,teacher_dob) VALUES('${d.name}','${d.email}','${d.mobile}','${d.dob}')`;
    conn.query(sql);
    res.send('data resived ')

});

app.get('/teacher_list',function(req,res){

//SELECT * FROM teacher 
conn.query("SELECT * FROM teacher ",function(err,data)
{
    console.log(data);
    var obj={'teacher_list':data}
    res.render('teacher_list.ejs',obj);  

});
    
});
app.get("/search_teacher",function(req,res){
    var urldata=url.parse(req.url,true).query;
    var sql=`SELECT * FROM teacher WHERE teacher_name LIKE '%${urldata.search_input}%' OR teacher_email LIKE '%${urldata.search_input}%' OR teacher_mobile LIKE '%${urldata.search_input}%' OR teacher_dob LIKE '%${urldata.search_input}%'`;
    conn.query(sql,function(err,data){
        var obj={'teacher_list':data};
        res.render('teacher_list.ejs',obj);
    });
});
app.get("/edit_teacher",function(req,res){
    var urldata=url.parse(req.url,true).query;
    conn.query(`SELECT * FROM teacher WHERE teacher_id='${urldata.id}'`,function(err,data){
        console.log(data);
        var obj={'teacher_det':data}
    res.render("edit_teacher.ejs",obj);

    })
});
app.post("/save_edited_teacher",function(req,res){
    var sql=`UPDATE teacher SET teacher_name='${req.body.teacher_name}',teacher_email='${req.body.teacher_email}',teacher_mobile='${req.body.teacher_mobile}',teacher_dob='${req.body.teacher_dob}' 
    WHERE teacher_id='${req.body.teacher_id}'`;
    conn.query(sql);
    res.redirect("/teacher_list")
});
app.get("/delete_teacher",function(req,res){
    var urldata=url.parse(req.url,true).query;
    var sql=`DELETE FROM teacher WHERE teacher_id='${urldata.id}'`;
    conn.query(sql);
    res.redirect("/teacher_list");
})
app.listen(1000);

