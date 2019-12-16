const jsonwebtoken = require('jsonwebtoken')
const {
  tokenSecret
} = require('../../config')
const {
  clientModel
} = require('../../dataBase/index')

module.exports = {
  // 注册
  userRegister(req, res) {
    clientModel.client_register({
      ...req.body
    }).then(data => {
      res.json({
        ...data
      })
    })
  },
  // 登录
  userLogin(req, res) {
    clientModel.client_login({
      ...req.body
    }).then(result => {
      if (result.statusCode === 200) {
        jsonwebtoken.sign(result, tokenSecret, {
          expiresIn: '7d'
        }, (_err, jsonwebtoken) => {
          res.cookie('guruaduserauth', jsonwebtoken, {
            maxAge: 604800000,
            httpOnly: true
          })
          res.json({
            ...result
            // token: jsonwebtoken
          })
        })
      } else {
        res.json({
          ...result
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  // 获取用户信息
  userInfo(req, res) {
    clientModel.client_info({
      ...req.query
    }).then(result => {
      res.json({
        ...result
      })
    }).catch(err => {
      console.log(err)
    })
  },
  // 退出登录
  userLogout(_req, res) {
    res.cookie('guruaduserauth', null, {
      maxAge: 10,
      httpOnly: true
    })
    res.json({
      statusCode: 200,
      message: 'logout success',
      result: null
    })
  },

  // 模糊查询用户列表
  searchUserList(req, res) {
    clientModel.client_searchUserList({
      ...req.query
    }).then(data => {
      res.json({
        ...data
      })
    })
  }
}
