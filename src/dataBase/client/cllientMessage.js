/* eslint-disable indent */
const axios = require('axios')
const clientUserMessage = require('../tables/client_user_message')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const clientList = require('../../webSocketServer')

// 给好友发送消息
const client_sendFriendMessage = ({
  userId,
  friendUserId,
  contentText,
  friendUserEmail
}) => {
  return clientUserMessage
    .create({
      userId,
      friendUserId,
      contentText,
      friendUserEmail
    })
    .then(data => {
      console.log('====已发送消息给好友====')
      if (clientList['id' + friendUserId]) {
        clientList['id' + friendUserId].send(JSON.stringify(data))
      } else {
        console.log('好友没有打开对应的聊天,邮件通知')
        if (friendUserEmail) {
          axios.get('http://www.nglmq.com/wxsdk/smtp', {
            params: {
              toEmail: friendUserEmail,
              subject: '好友消息通知 —— From AlittleQQ',
              html: `<h3 style="line-height: 46px;font-size: 20px;">尊敬的alittleQQ用户，你好！</h3>
              <p style="line-height: 28px">你有好友在alitleQQ上给你发送了最新消息，请<a href="http://www.nglmq.com:8040">立即登录</a>查看。</p>
              <p style="text-align: right;margin-top: 15px;padding-right: 15px;">感谢你的支持</p>
              <p style="text-align: right;padding-right: 10px;">alittleQQ server</p>
              `
            }
          }).then(data => {
            if (data.data.returnCode === 200) {
              console.log('邮箱推送成功！')
            } else {
              console.log('邮箱推送服务失败！')
            }
          })
        }
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
