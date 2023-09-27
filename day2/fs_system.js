var http=require('http');
var fs=require('fs');

http.createServer(function(req,res){
    
    var data="";
    for(i=0;i<1000;i++)
    {
        if(i%2==0){
        data+=`
        <div style="width:50px;height:50px;background-color:aqua;
        float:left;margin:3px">${i}</div> 
        `
        if(i%4==0){
            data+=`
            <div style="width:50px;height:50px;background-color:purple;
            float:left;margin:3px">${i}</div> 
            `   
        }
        }else{
            data+=`
            <div style="width:50px;height:50px;background-color:red;
            float:left;margin:3px">${i}</div> 
            `          
        }
    }
    fs.writeFile("your_file.html",data,function(){
        console.log("File write");
    });
    res.write("hello");
    res.end();
    
    
    
    
    
    
    
    
    
    
    // fs.readFile("my_file.html",function(err,data)
    // {
    //     res.writeHead(200,{'Content-Type':'text/html'});
    // res.write(data);
    // res.end();
    // })
    
}).listen(1000);