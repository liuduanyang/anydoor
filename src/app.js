const http=require('http');
const config=require('./config/defaultConfig');
const chalk=require('chalk');
const path=require('path');
const route=require('./helper/route');    // 将async函数封装在 helper/route.js 中

const server=http.createServer((req,res)=>{

    const filePath=path.join(config.root,req.url);
        route(req,res,filePath);
})

server.listen(config.port,config.hostname,()=>{
    const addr=`http://${config.hostname}:${config.port}`;
    console.info(`Server started at ${chalk.green(addr)}`);
});