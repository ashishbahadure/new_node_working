var express=require('express');
var app=express();
var fs=require('fs');
var bodyparser=require('body-parser');

app.use(bodyparser.urlencoded({extended:true}))

app.get("/",(req,res)=>{

    res.render("addstudent.ejs");
});

var student_list=[]

app.post("/save_student",(req,res)=>
{
 
    // var data=JSON.stringify(req.body)+`
    // `;
    // fs.appendFile("student-data1.html",data,(err)=>{
    //     res.send("data send");
    // })

  student_list.push(req.body);
//   res.send(student_list);
res.redirect('/student_list');
})

app.get("/student_list",(req,res)=>{
    // // res.send("data recived in this page");
    var obj={"students":student_list}
    res.render('student_list.ejs',obj);
})
app.listen(1000);