/* eslint-disable */
const {
  clientModel
} = require('../../dataBase/index')

module.exports = {
  // 发送消息
  sendFriendMessage(req, res) {
    clientModel.client_sendFriendMessage({
      ...req.body
    }).then(data => {
      res.json({
        ...data
      })
    })
  },
  // 查看消息列表
  queryFriendMessage(req, res) {
    clientModel.client_queryFriendMessage({
      ...req.body
    }).then(data => {
      res.json({
        ...data
      })
    })
  },
}
