/* eslint-disable indent */
const clientUserMessage = require('../tables/client_user_message')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const clientList = require('../../webSocketServer')

// 给好友发送消息
const client_sendFriendMessage = ({
  userId,
  friendUserId,
  contentText
}) => {
  return clientUserMessage
    .create({
      userId,
      friendUserId,
      contentText
    })
    .then(data => {
      console.log('====已发送消息给好友====')
      if (clientList['id' + friendUserId]) {
        clientList['id' + friendUserId].send(JSON.stringify(data))
      }
      return {
        statusCode: 200,
        message: 'request success',
        result: data
      };
    })
    .catch(e => {
      return {
        statusCode: 500,
        result: null,
        message: e || '数据库操作错误'
      };
    });
};

// 查询好友消息列表
const client_queryFriendMessage = ({
  page = 1,
  pageSize = 10,
  userId,
  friendUserId
}) => {
  var query = {
    [Op.or]: [{
        [Op.and]: [{
          userId
        }, {
          friendUserId
        }]
      },
      {
        [Op.and]: [{
          userId: friendUserId
        }, {
          friendUserId: userId
        }]
      }
    ]
  };
  return clientUserMessage
    .findAndCountAll({
      offset: (page - 1) * pageSize,
      limit: +pageSize,
      order: [
        ['createdAt', 'DESC']
      ],
      where: query
    })
    .then(data => {
      return {
        statusCode: 200,
        message: 'request success',
        result: data
      };
    })
    .catch(e => {
      return {
        statusCode: 500,
        result: null,
        message: e || '数据库操作错误'
      };
    });
};

module.exports = {
  client_sendFriendMessage,
  client_queryFriendMessage
};
