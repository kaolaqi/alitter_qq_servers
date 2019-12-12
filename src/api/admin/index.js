const express = require('express')
const router = express.Router()
const auth = require('../../midware/auth')

var systemModel = require('./system.js')
var userModel = require('./user.js')

// 管理系统接口模块
router.post('/register', systemModel.userRegister)
router.post('/login', systemModel.userLogin)
router.get('/userInfo', auth, systemModel.userInfo)
router.get('/logout', auth, systemModel.userLogout)
router.get('/userList', auth, systemModel.adminUserList)
router.put('/toogleUserStatus', auth, systemModel.toogleUserStatus)

// client用户接口模块
router.get('/clientUserList', auth, userModel.clientUserList)
router.delete('/daleteClientUser', auth, userModel.daleteClientUser)
router.put('/toogleClientUserStatus', auth, userModel.toogleClientUserStatus)

module.exports = router
