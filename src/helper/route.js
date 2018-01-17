const fs=require('fs');

// 优雅的异步
const promisify=require('util').promisify;
const stat=promisify(fs.stat);
const readdir=promisify(fs.readdir);

module.exports =async function(req,res,filePath){
    try {
        const stats=await stat(filePath);
        res.statusCode=200;
        res.setHeader('Content-Type','text/plain;charset=utf-8');
        if(stats.isFile()){
            fs.createReadStream(filePath).pipe(res);
            // 不要加res.end() 上一行是异步的 res.end是同步的 这样会导致应用立即发送过去 即发送的内容为空
        }
        else if(stats.isDirectory()){
            try {   // 这里try catch可不写 但不写则不够严谨 即不写时则默认内部读文件不会出错
                const fileList=await readdir(filePath);
                res.end(fileList.join(' | '));
            } catch (error) {
                throw error;
            }
        }
    } catch (error) {
        res.statusCode=404;
        res.setHeader('Content-Type','text/plain;charset=utf-8');
        res.end(`${filePath}不是一个文件夹或文件不存在`);
    }
}