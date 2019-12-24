const utility = require('utility')
// const axios = require('axios')
const clientUser = require('../tables/client_user')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

// 客户端注册
const client_register = ({
  nickname = null,
  password,
  mobile,
  email
}) => {
  password = utility.sha256(password)
  return clientUser.create({
    nickname,
    password,
    mobile,
    email
  }).then(data => {
    if (!data) {
      return {
        statusCode: 404,
        message: 'fetch noting from database',
        result: null
      }
    } else {
      // 发送邮箱推送
      // axios.get('http://www.nglmq.com/wxsdk/smtp', {
      //   params: {
      //     toEmail: email,
      //     subject: '应用注册通知 —— From AlittleQQ',
      //     html: `<h3 style="line-height: 46px;font-size: 20px;">尊敬的${nickname}，你好！</h3>
      //     <p style="line-height: 28px">恭喜您已注册成功，成为alittleQQ的一员，快去<a href="http://www.nglmq.com:8040">登录</a>使用吧！</p>
      //     <p style="text-align: right;margin-top: 15px;padding-right: 15px;">感谢你的支持</p>
      //     <p style="text-align: right;padding-right: 10px;">alittleQQ server</p>
      //     `
      //   }
      // }).then(result => {
      //   if (result.data.returnCode === 200) {
      //     console.log('邮箱推送成功！')
      //   } else {
      //     console.log('邮箱推送服务失败！')
      //   }
      // })
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
      message: '数据库查询错误'
    }
  })
}

const client_login = ({
  mobile,
  password
}) => {
  return clientUser.findOne({
    where: {
      mobile: mobile
    }
  }).then(data => {
    if (data) {
      password = utility.sha256(password)
      if (data.password === password) {
        return {
          statusCode: 200,
          message: '登录成功！',
          data: {
            userId: data.userId,
            mobile: data.mobile,
            nickname: data.nickname,
            avatar: data.avatar,
            email: data.email,
            sign: data.sign,
            status: data.status
          }
        }
      } else {
        return {
          statusCode: 202,
          message: '账号密码不正确。',
          result: null
        }
      }
    } else {
      return {
        statusCode: 201,
        message: '账号不存在。。。',
        result: null
      }
    }
  }).catch(e => {
    return {
      statusCode: 500,
      result: null,
      message: e.errors
    }
  })
}

const client_info = ({
  mobile
}) => {
  return clientUser.findOne({
    attributes: ['userId', 'mobile', 'nickname', 'email', 'avatar', 'sign', 'status'],
    where: {
      mobile: mobile
    }
  }).then(data => {
    if (data) {
      return {
        statusCode: 200,
        message: 'success',
        data: data
      }
    } else {
      return {
        statusCode: 201,
        message: mobile + ' 账号不存在。。。',
        result: null
      }
    }
  }).catch(e => {
    return {
      statusCode: 500,
      result: null,
      message: e.errors
    }
  })
}

// 手机号/昵称 模糊搜索好友
const client_searchUserList = ({
  page = 1,
  pageSize = 30,
  text = '', // 模糊查询  包含：%${text}% 已**开头：${text}%
  selfMobile // 查询排除 mobile = selfMobile 的项,排除自己
}) => {
  var query = {}
  if (selfMobile) {
    query = {
      [Op.or]: [{
        nickname: {
          [Op.like]: `%${text}%`
        }
      }, {
        mobile: {
          [Op.like]: `${text}%`,
          [Op.ne]: selfMobile // 不包含指定的mobile
        }
      }]
    }
  } else {
    query = {
      [Op.or]: [{
        nickname: {
          [Op.like]: `%${text}%`
        }
      }, {
        mobile: {
          [Op.like]: `${text}%`
        }
      }]
    }
  }
  return clientUser.findAndCountAll({
    offset: (page - 1) * pageSize,
    limit: +pageSize,
    attributes: ['userId', 'mobile', 'nickname', 'email', 'sign', 'avatar', 'status'],
    where: query
  }).then(data => {
    if (data) {
      return {
        statusCode: 200,
        message: 'success',
        data: data
      }
    }
  }).catch(e => {
    return {
      statusCode: 500,
      result: null,
      message: e.errors
    }
  })
}

module.exports = {
  client_register,
  client_login,
  client_info,
  client_searchUserList
}
