var http=require('http');
var fs=require('fs');


http.createServer((req,res)=>{
    
    var data="";
    for(i=0;i<1000;i++){
        data+=`
        <div style='width:50px;height:50px;background:red;float:left;margin:3px'>
        ${i}</div>`;
    }
    fs.writeFile("your_file.html",data,()=>{
        console.log('file write')
    })
    res.end();
}).listen(1000);