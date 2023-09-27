const http=require("http");

http.createServer((req,res)=>
{
    console.log("server create");
    res.write("hello world");
    res.end();
}).listen(1000);