const chalk = require('chalk')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()
const api = require('./src/api/index')

// 创建 application/x-www-form-urlencoded 编码解析
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())
app.use(cookieParser())

// 静态文件服务
// app.use('./src/static', express.static(path.join(__dirname, 'static')))
app.use('/static', express.static('./src/static'));

// 路由配置
app.use('/api', api)

var server = app.listen(8090, function () {
  var host = server.address().address
  var port = server.address().port
  console.log(host, port)
  console.log(chalk.green('start server...'))
  console.log('应用实例，访问地址为 http://%s:%s', host, port)
  console.log()
})
