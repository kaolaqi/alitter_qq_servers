const {
  adminModel
} = require('../../dataBase/index')

module.exports = {
  // 获取客户端用户列表
  clientUserList(req, res) {
    adminModel.admin_clientUserList({
      ...req.query
    }).then(result => {
      res.json({
        ...result
      })
    }).catch(err => {
      console.log(err)
    })
  },
  // 删除客户端用户列表 - 最好不要使用这种 直接删除数据库 的操作
  daleteClientUser(req, res) {
    adminModel.admin_deleteClientUser({
      ...req.body
    }).then(result => {
      res.json({
        ...result
      })
    }).catch(err => {
      console.log(err)
    })
  },
  // 切换客户端用户状态 - 假删除
  toogleClientUserStatus(req, res) {
    adminModel.admin_toogleClientUserStatus({
      ...req.body
    }).then(result => {
      res.json({
        ...result
      })
    }).catch(err => {
      console.log(err)
    })
  },
}