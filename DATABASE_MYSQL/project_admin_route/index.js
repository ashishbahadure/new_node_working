var express=require("express");
var app=express();

app.use(express.static("public/"));
var adminRoute=require("./routes/admin_route");

app.use("/admin",adminRoute);

app.listen(1000);