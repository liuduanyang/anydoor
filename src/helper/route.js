const fs=require('fs');
const Handlebars=require('handlebars');
const path=require('path');
const config=require('../config/defaultConfig');

// 获取模板引擎 
// 为什么使用同步方法：1.下面代码依赖于这个文件  2.应对不同请求source只需获取一次 因为node缓存机制
const source=fs.readFileSync(path.join(__dirname,'../template/dir.tpl'),'utf-8');

// Handlebars编译模板引擎文件
const template=Handlebars.compile(source); // compile 接收字符串类型的参数

// 优雅的异步
const promisify=require('util').promisify;
const stat=promisify(fs.stat);
const readdir=promisify(fs.readdir);

module.exports =async function(req,res,filePath){
    try {
        const stats=await stat(filePath);
        if(stats.isFile()){
            fs.createReadStream(filePath).pipe(res);
            // 不要加res.end() 上一行是异步的 res.end是同步的 这样会导致应用立即发送过去 即发送的内容为空
            res.statusCode=200;
            res.setHeader('Content-Type','text/plant;charset=utf-8');
        }
        else if(stats.isDirectory()){
            try {   // 这里try catch可不写 但不写则不够严谨 即不写时则默认内部读文件不会出错
                const fileList=await readdir(filePath);  // 如果不设置await 则返回的是一个promise对象
                
                // 设置传给模板引擎的参数
                const data={
                    title:path.basename(filePath),
                    dir:path.relative(config.root,filePath), // relative方法用于返回一个路径相对于另一个路径的相对地址
                    fileList
                }
                res.statusCode=200;
                res.setHeader('Content-Type','text/html;charset=utf-8');
                res.end(template(data));
            } catch (error) {
                throw error;
            }
        }
    } catch (error) {
        console.error(error);
        res.statusCode=404;
        res.setHeader('Content-Type','text/plain;charset=utf-8');
        res.end(`${filePath}不是一个文件夹或文件不存在`);
        // 如果想在网页上输出错误信息 为了安全考虑需要判断环境 如果是开发环境则显示 非开发环境不显示
    }
}