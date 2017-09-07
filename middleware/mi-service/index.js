const path = require("path");
const fs = require('fs');

module.exports = function(dir='service') {// service默认文件夹service，也可以自定义
    const serviceRootpath = path.join(path.resolve(__dirname, '../../'), dir);
    var service = {};
    //读取service文件夹下的所有文件并遍历
    fs.readdirSync(serviceRootpath).forEach(filename => {
        //将文件名中去掉后缀
        var name = path.basename(filename, path.extname(filename));
        //读取文件中的内容并赋值绑定
        service[name] = require(path.join(serviceRootpath, filename));
    });


    //下面两种方法都可以

    //引用方式 app.use(miService())
    // return (context, next) => {
    //     context.service = service;
    //     return next();
    // };


    //引用方式app.use(convert(miService()))
    return function*(next) {
        //将service与全局ctx绑定
        this.service = service;
        yield next;
    };
}