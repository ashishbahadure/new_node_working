var express=require('express');
var app=express();
// var url=require('url');
var fs=require('fs');
var bodyparser=require('body-parser');
app.use(bodyparser.urlencoded({extended:true}));

var student_list=[];
app.get("",function(req,res){
    res.render("form.ejs");
});

// this metod is use get method 
// app.get("/register_student",function(req,res){
//     var urldata=url.parse(req.url,true).query;
//     res.send(urldata);
// })

app.post('/register_student',function(req,res)
{
    // var str=JSON.stringify(req.body)
    // fs.appendFile('student_data.html',str,function(err,data){
    //     console.log(err);
    // })
      student_list.push(req.body);

    // res.send(student_list)
    res.redirect('/student_list');
})  
  
app.get("/student_list",function(req,res){
    var obj={'student':student_list}
    res.render('stduent_list.ejs',obj);
})
app.listen(1000)