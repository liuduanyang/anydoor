module.exports={
    hostname:'127.0.0.1',
    port:'8080',
    root:process.cwd(),
    compress:/\.(html|js|css|md)/  // 用于压缩文件 用正则判断文件类型
}