const cllientFriendAdmin = require('../tables/client_user_firend')
const clientUserAdmin = require('../tables/client_user')
const clientUserMessage = require('../tables/client_user_message')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

// 添加用户好友列表
const client_addUserFriend = ({
  userId,
  friendUserId
}) => {
  return cllientFriendAdmin.count({
    where: {
      [Op.and]: [{
        userId
      }, {
        friendUserId
      }]
    }
  }).then(result => {
    if (result) {
      return {
        statusCode: 201,
        message: 'this both user had becomed friends',
        result: null
      }
    } else {
      return cllientFriendAdmin.bulkCreate([{
        userId,
        friendUserId
      }, {
        userId: friendUserId,
        friendUserId: userId
      }]).then(data => {
        if (!data) {
          return {
            statusCode: 404,
            message: 'fetch noting from database',
            result: null
          }
        } else {
          return {
            statusCode: 200,
            message: 'request success',
            result: data.mobile
          }
        }
      }).catch(e => {
        return {
          statusCode: 500,
          result: null,
          message: e || '数据库查询错误'
        }
      })
    }
  })
}

// 查询好友列表，穿chated = 1 可只查询在聊天的好友
const client_getUserFriend = ({
  userId,
  chated
}) => {
  var query = {
    userId
  }
  if (chated) {
    query.chated = chated
  }
  return cllientFriendAdmin.findAll({
    attributes: ['userId', 'friendUserId', 'chated'],
    where: query,
    // include: [{
    //   attributes: ['userId', 'mobile', 'nickname', 'avatar'],
    //   model: clientUserAdmin,
    //   as: 'userInfo'
    // }, {
    //   attributes: ['contentText', 'createdAt'],
    //   model: clientUserMessage,
    //   as: 'lastMessage'
    // }]

    include: [{
      attributes: ['userId', 'mobile', 'nickname', 'avatar', 'sign'],
      model: clientUserAdmin,
      as: 'userInfo',
      include: [{
        attributes: ['contentText', 'createdAt'],
        model: clientUserMessage,
        as: 'lastMessage'
      }]
    }]
  }).then(data => {
    if (!data) {
      return {
        statusCode: 404,
        message: 'fetch noting from database',
        result: null
      }
    } else {
      return {
        statusCode: 200,
        message: 'request success',
        result: data
      }
    }
  }).catch(e => {
    return {
      statusCode: 500,
      result: null,
      message: e || '数据库查询错误'
    }
  })
}

// 查询好友列表，穿chated = 1 可只查询在聊天的好友
const client_chickIsFriend = ({
  userId,
  friendUserId
}) => {
  return cllientFriendAdmin.count({
    where: {
      userId,
      friendUserId
    }
  }).then(data => {
    return {
      statusCode: 200,
      message: 'request success',
      result: data
    }
  }).catch(e => {
    return {
      statusCode: 500,
      result: null,
      message: e || '数据库查询错误'
    }
  })
}

// 查询好友列表，穿chated = 1 可只查询在聊天的好友
const client_setInchatStatus = ({
  userId,
  friendUserId,
  status
}) => {
  return cllientFriendAdmin.update({
    chated: status
  }, {
    where: {
      userId,
      friendUserId
    }
  }).then(data => {
    return {
      statusCode: 200,
      message: '更新聊天状态成功',
      result: data
    }
  }).catch(e => {
    return {
      statusCode: 500,
      result: null,
      message: e || '数据库查询错误'
    }
  })
}

module.exports = {
  client_addUserFriend,
  client_getUserFriend,
  client_chickIsFriend,
  client_setInchatStatus
}
