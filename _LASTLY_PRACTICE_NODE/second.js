var http=require('http');

http.createServer((req,res)=>{
    res.writeHead(200,{'content-type':"text/html"});
    var mysite="";
    for(i=0;i<10;i++)
    {
        mysite+=`<div style='height:90px;width:90px;background-color:red;float:left;margin:15px'>${i}</div>`
    }
    res.write(mysite);
    res.end();
}).listen(1000);