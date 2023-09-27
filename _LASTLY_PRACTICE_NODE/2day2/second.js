var http=require('http');


http.createServer((req,res)=>{
    res.writeHead(200,{'type-content':'text/html'});
    var mysite="";
    for(var i=0;i<10;i++){
        // console.log("Hello World");
        // res.write(`${i}`);
        mysite+=`<div style='width:90px;height:90px;background-color:red;margin:15px;float:left'>${i}</div>`
    } 
    res.write(mysite);
    res.end();
}).listen(1000);