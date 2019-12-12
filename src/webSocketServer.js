
const WebSocket = require('ws')
const config = require('./setting')
const ws = new WebSocket.Server({
  port: config.webSocketPort,
  host: config.webSocketHost
})
const clientList = {}

// 服务器通过connection连接客户端
ws.on('connection', (client, info) => {
  client.userId = info.url.substr(1)
  console.log('有一个用户链接上了websocket...', client.userId)
  clientList[client.userId] = client
  client.on('message', msg => {
    console.log(`${client.name}用户通过websocket发来消息：${msg}`)
  })
  // 客户端下线行为
  client.on('close', () => {
    delete clientList[client.userId]
    console.log(`${client.userId}号已下线`)
    console.log(clientList.length)
  })
  clientList[client.userId] = client
})

module.exports = clientList
