var http=require('http');
var url =require('url');

http.createServer((req,res)=>{
    
    var amazon='https://www.google.com/search?q=amazon&oq=amazon&aqs=chrome.0.0i271j46i131i199i433i465i512j69i64j69i59j0i131i433i512l3j5.2901j0j7&sourceid=chrome&ie=UTF-8';
    res.writeHead(200,{'type-content':'text/html'});
    var urldata=url.parse(amazon,true);
    console.log(urldata.query);
    
    res.end();
}).listen(1000);






