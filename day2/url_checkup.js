var http=require('http');
var url=require('url');
http.createServer(function(req,res){
var amazon=`https://www.google.com/search?q=amazon&oq=am&aqs=chrome.1.69i57j0i271l3j69i61l2j69i60.2606j0j7&sourceid=chrome&ie=UTF-8`
var urldata=url.parse(amazon);
console.log(urldata.query);    
res.writeHead(200,{'content-type':'text/html'})
    res.write("data checking");

res.end();
}).listen(1000);