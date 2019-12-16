const express = require('express')
const router = express.Router()
const auth = require('../../midware/auth')

var useOptioneModel = require('./useOption.js')
var useFriendModel = require('./useFriend.js')
var userMessageModel = require('./userMessage.js')

router.post('/register', useOptioneModel.userRegister)
router.post('/login', useOptioneModel.userLogin)
router.get('/userInfo', auth, useOptioneModel.userInfo)
router.get('/logout', auth, useOptioneModel.userLogout)
router.get('/userList', auth, useOptioneModel.searchUserList)

router.post('/addFriend', auth, useFriendModel.addUserFriend)
router.get('/getFriendList', auth, useFriendModel.getUserFriendList)
router.get('/chickIsFriend', auth, useFriendModel.chickIsFriend)
router.put('/setInchatStatus', auth, useFriendModel.setInchatStatus)

router.post('/sendFriendMessage', auth, userMessageModel.sendFriendMessage)
router.post('/queryFriendMessage', auth, userMessageModel.queryFriendMessage)

module.exports = router
