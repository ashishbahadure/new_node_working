var express=require('express');
var app=express();

var bodyparser=require('body-parser');
app.use(bodyparser.urlencoded({extended:true}));
var upload=require("express-fileupload");
app.use(upload());
app.use(express.static("public/"));
var url=require('url');

var mysql=require('mysql');
var conn=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"node_dev"
})
var util=require("util");
var execute=util.promisify(conn.query).bind(conn);

app.get("/",async function(req,res){
    
    var products= await execute("SELECT * FROM product");
    var obj={"products":products}
    res.render('form.ejs',obj);
});
//post method for form data
app.post("/save_product",function(req,res){
    console.log(req.body);
    console.log(req.files.product_image);
    var file_name=req.files.product_image.name;
    req.files.product_image.mv('public/uploads/'+file_name);

    // var sql=`CREATE TABLE product(product_id INT PRIMARY KEY AUTO_INCREMENT,product_name VARCHAR(20),product_price INT,product_details TEXT,product_image TEXT)`;
    var sql=`INSERT INTO product(product_name,product_price,product_details,product_image) VALUES('${req.body.product_name}','${req.body.product_price}','${req.body.product_details}','${file_name}')`;
    execute(sql);
    res.redirect("/")
});

app.get("/edit_product",async function(req,res){
    var urldata=url.parse(req.url,true).query;
    var sql=`SELECT * FROM product WHERE product_id='${urldata.id}'`;
    var product_det=await execute(sql);
    var obj={"product_det":product_det}
    res.render("edit_product.ejs",obj);
});
app.post("/update_product",async function(req,res){
console.log(req.body);
console.log(req.files);
if(req.files)
{
    var file_name=req.files.product_image.name;
    req.files.product_image.mv('public/uploads/'+file_name);
    var sql=`UPDATE product SET product_name='${req.body.product_name}',product_price='${req.body.product_price}',product_details='${req.body.product_details}',product_image='${file_name}'WHERE  product_id='${req.body.product_id}'`;

}
else {

    var sql=`UPDATE product SET product_name='${req.body.product_name}',product_price='${req.body.product_price}',product_details='${req.body.product_details}' WHERE  product_id='${req.body.product_id}'`;

}
await execute(sql);
res.redirect("/");
})
app.listen(1000);