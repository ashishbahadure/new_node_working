var http=require('http');
var url=require('url');

http.createServer((req,res)=>{

    var amazon="https://www.google.com/search?q=a2z+infotech+training&oq=a2z+in&aqs=chrome.1.69i57j35i39j46i39i175i199i650j46i199i465i512j0i512j69i60l3.4741j0j7&sourceid=chrome&ie=UTF-8"
    res.writeHead(200,{'content-type':'text/html'});
    var urldata=url.parse(amazon,true);
    console.log(urldata.query)
    // res.write(urldata.query);
    res.end()
}).listen(1000);