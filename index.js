const chalk = require('chalk');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const api = require('./src/api/index');
const wechatSdkToken = require('./src/wechatSdkToken');
const {
  fileMidle,
  updataCallback
} = require('./src/uploadServer');

// 创建 application/x-www-form-urlencoded 编码解析
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(cookieParser());
// 静态文件服务
app.use('/static', express.static('./static'));

// 路由配置
app.use('/api', api);

// 微信sdk校验
app.get('/sdkToken', wechatSdkToken);

// 文件上传接口
app.post('/api/upload', fileMidle, updataCallback);

var server = app.listen(8090, () => {
  var host = server.address().address;
  var port = server.address().port;
  console.log(host, port);
  console.log(chalk.green('start server...'));
  console.log('应用实例，访问地址为 http://%s:%s', host, port);
  console.log();
});
