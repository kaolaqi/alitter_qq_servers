/** 系统全局配置
webSocketHost => webSocket服务地址配置
webSocketPort => webSocket服务端口配置
tokenSecret => jsonwebtoken登录认证中间件随机码
*/

module.exports = {
  // 家
  // webSocketHost: '192.168.1.9',
  // webSocketPort: 8050,

  // 公司
  // webSocketHost: '172.18.13.25',
  // webSocketPort: 8050,

  // websocket 只能使用本的服务
  webSocketHost: 'localhost',
  webSocketPort: 8050,

  tokenSecret: 'asdasdfDfaecasdfqeqevdaASaas'

}
