/* eslint-disable */
const {
  clientModel
} = require('../../dataBase/index')

module.exports = {
  // 添加好友
  addUserFriend(req, res) {
    clientModel.client_addUserFriend({
      ...req.body
    }).then(data => {
      res.json({
        ...data
      })
    })
  },
  // 获取用户好友列表
  getUserFriendList(req, res) {
    clientModel.client_getUserFriend({
      ...req.query
    }).then(data => {
      res.json({
        ...data
      })
    })
  },
  // 检查是否是好友
  chickIsFriend(req, res) {
    clientModel.client_chickIsFriend({
      ...req.query
    }).then(data => {
      res.json({
        ...data
      })
    })
  },
  // 跟新好友的聊天状态
  setInchatStatus(req, res) {
    clientModel.client_setInchatStatus({
      ...req.body
    }).then(data => {
      res.json({
        ...data
      })
    })
  }
}
