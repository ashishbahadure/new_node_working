var express=require("express");
var app=express();
var url=require("url");
var bodyparser=require("body-parser");
app.use(bodyparser.urlencoded({extended:true}));
var upload=require("express-fileupload");
app.use(upload())
var mysql=require('mysql');

var conn=mysql.createConnection({
    host:'localhost',
    user:"root",
    password:"",
    database:"node_dev"
});
var util=require("util");

var execute=util.promisify(conn.query).bind(conn);

module.exports=execute;

app.use(express.static("public/"))

app.get("/",async(req,res)=>{
   var data=await execute("SELECT * FROM student_info");
var obj={'product':data};
// console.log(data);
res.render("register.ejs",obj);
})

app.post("/save_information",async(req,res)=>{
    // var data=req.body;
    // console.log(data);
    console.log(req.files);
    var file_name=req.files.student_photo.name;
    req.files.student_photo.mv("public/uploads/"+file_name);
    // console.log(req.files.user_photo.mv)
//   await  execute("CREATE TABLE student_info(student_id int auto_increment primary key,student_name varchar(33),student_photo varchar(300))");

await execute(`INSERT INTO student_info(student_name,student_photo)VALUES('${req.body.student_name}','${file_name}')`);
    // res.redirect("/");
    res.send('data recievd')


});
app.get("/edit_file",async(req,res)=>{
    var data=url.parse(req.url,true).query;
    var sql=`SELECT * FROM student_info WHERE student_id='${data.id}'`;
    var student_info=await execute(sql);
    // console.log(student_info);
    var obj={"file_data":student_info}
    res.render("edit_student.ejs",obj);
})

app.post('/update_product',async(req,res)=>{
    var data=req.body;
    console.log(data);
    if(req.files)
    {
         var file_name=req.files.student_photo.name;
         req.files.student_photo.mv("public/uploads/"+file_name);
         var sql=`UPDATE product SET student_name='${req.body.student_name}',student_photo='${req.body.student_photo}' WHERE product_id='${req.body.student_id}'`;
    }
    else
    {
        var file_name=req.files.student_photo.name;
         req.files.student_photo.mv("public/uploads/"+file_name);
         var sql=`UPDATE product SET student_name='${req.body.student_name}'WHERE product_id='${req.body.student_id}'`;
    }
  await  execute(sql);   

    res.send("data recived")
} )
app.listen(1000);