const utility = require('utility')
const clientUserAdmin = require('../tables/client_user')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

// 客户端注册
const client_register = ({
  nickname,
  password,
  mobile,
  status = 1
}) => {
  password = utility.sha256(password)
  return clientUserAdmin.create({
    nickname,
    password,
    mobile,
    status
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
  return clientUserAdmin.findOne({
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
  return clientUserAdmin.findOne({
    attributes: ['userId', 'mobile', 'nickname', 'avatar', 'status'],
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
  searchText,
  selfMobile
}) => {
  let query = {}
  if (selfMobile) {
    query = {
      [Op.or]: [{
        nickname: {
          [Op.like]: `%${searchText}%`
        }
      }, {
        mobile: {
          [Op.like]: `%${searchText}%`,
          [Op.ne]: selfMobile
        }
      }]
    }
  } else {
    query = {
      [Op.or]: [{
        nickname: {
          [Op.like]: `%${searchText}%`
        }
      }, {
        mobile: {
          [Op.like]: `%${searchText}%`
        }
      }]
    }
  }
  return clientUserAdmin.findAndCountAll({
    offset: (page - 1) * pageSize,
    limit: +pageSize,
    attributes: ['userId', 'mobile', 'nickname', 'avatar', 'status'],
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
