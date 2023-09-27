 var http=require('http');
 var fs=require('fs');

 http.createServer ((req,res)=>{


    fs.readFile ("my_file.html",(err,data)=>{
    
    res.writeHead(200,{'type-content':"text/html"});    
    res.write(data);
    res.end();
    });
    
    }).listen("1000");
 