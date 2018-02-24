// 用于压缩文件

// zlib中包含这两种压缩的方法
const {createGzip,createDeflate}=require('zlib');

module.exports=(rs,req,res)=>{
    const acceptEncoding=req.headers['accept-encoding'];
    if(!acceptEncoding || !acceptEncoding.match(/\b(gzip|deflate)\b/)){
        return rs;
    }else if(acceptEncoding.match(/\bgzip\b/)){    // 如果符合 则先尝试用gzip格式压缩 因为gzip压缩效率比较好
        res.setHeader('Content-Encoding','gzip');
        return rs.pipe(createGzip());
    }else if(acceptEncoding.match(/\bdeflate\b/)){
        res.setHeader('Content-Encoding','deflate');
        return rs.pipe(createDeflate());
    }
}