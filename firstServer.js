const http=require('http');

const server=http.createServer((req,res)=>{
    res.statusCode=200;
    res.setHeader('Content-type','text/plain');
    res.write('Hello,my first web server!');
    res.end();
})

server.listen('8080','127.0.0.1');