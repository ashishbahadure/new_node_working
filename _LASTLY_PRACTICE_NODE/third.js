var http=require('http');


http.createServer((req,res)=>{
    // console.log(req.url);
    if(req.url=='/about')
    {
        res.writeHead(200,{"content-type":'text/html'});
        res.write("this page is about");
    }
    else{
        res.writeHead(200,{"content-type":'text/html'});
        res.write("this page is home");
    }
    res.end();
}).listen(1000);