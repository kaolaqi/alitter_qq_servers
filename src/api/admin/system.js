/* eslint-disable */
const jsonwebtoken = require('jsonwebtoken')
const {
  tokenSecret
} = require('../../config')
const {
  adminModel
} = require('../../dataBase/index')

module.exports = {
  // 注册
  userRegister(req, res) {
    adminModel.admin_register({
      ...req.body
    }).then(data => {
      res.json({
        ...data
      })
    })
  },
  // 登录
  userLogin(req, res) {
    adminModel.admin_login({
      ...req.body
    }).then(result => {
      if (result.statusCode === 200) {
        jsonwebtoken.sign(result, tokenSecret, {
          expiresIn: '7d'
        }, (err, jsonwebtoken) => {
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
  // 获取管理员用户信息
  userInfo(req, res) {
    adminModel.admin_info({
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
  userLogout(req, res) {
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

  // 管理员用户列表
  adminUserList(req, res) {
    adminModel.admin_userList({
      ...req.query
    }).then(result => {
      res.json({
        ...result
      })
    }).catch(err => {
      console.log(err)
    })
  },
  // 切换管理员用户状态
  toogleUserStatus(req, res) {
    adminModel.admin_toogleUserStatus({
      ...req.body
    }).then(result => {
      res.json({
        ...result
      })
    }).catch(err => {
      console.log(err)
    })
  }
}