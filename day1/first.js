var http=require('http');
var url=require('url');
http.createServer(function(req,res){
    console.log('server created');
   res.writeHead(200,{'content-type':'text/html'});
   res.write("<h1>hii</h1>");
    res.write("hello");
    res.end();
}).listen(1000);