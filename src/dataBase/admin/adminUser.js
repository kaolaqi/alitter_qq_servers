const utility = require('utility')
const adminUser = require('../tables/admin_user')
const adminRole = require('../tables/admin_role')

// 后台管理用户注册 phone password email必填，nickname选填，其他字段忽略无效
const admin_register = ({
  phone,
  nickname = null,
  password,
  email,
}) => {
  password = utility.sha256(password)
  return adminUser.create({
    phone,
    nickname,
    password,
    email
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
        result: data.username
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

// 后台管理用户登录
const admin_login = ({
  phone,
  password
}) => {
  return adminUser.findOne({
    where: {
      phone
    },
    include: [{
      attributes: ['roleType', 'roleName'],
      model: adminRole,
      as: 'roleInfo'
    }]
  }).then(userInfo => {
    if (userInfo) {
      password = utility.sha256(password)
      if (userInfo.password === password) {
        return {
          statusCode: 200,
          message: (userInfo.nickname || userInfo.phone) + '登录成功！',
          data: {
            userId: userInfo.userId,
            avatar: userInfo.avatar,
            email: userInfo.email,
            status: userInfo.status,
            phone: userInfo.phone,
            nickname: userInfo.nickname,
            roleInfo: userInfo.roleInfo
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
        message: username + '账号不存在。。。',
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

// 获取后台管理用户信息
const admin_info = ({
  phone
}) => {
  return adminUser.findOne({
    where: {
      phone
    },
    attributes: ['userId', 'phone', 'nickname', 'email', 'avatar', 'status', 'createdAt'],
    include: [{
      attributes: ['roleType', 'roleName'],
      model: adminRole,
      as: 'roleInfo'
    }]
  }).then(userInfo => {
    if (userInfo) {
      return {
        statusCode: 200,
        message: 'success',
        data: userInfo
      }
    } else {
      return {
        statusCode: 201,
        message: username + '账号不存在。。。',
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

// 删除指定用户
const admin_toogleUserStatus = ({
  id,
  status
}) => {
  return adminUser.update({
    status
  }, {
    where: {
      id: +id
    }
  }).then(data => {
    if (data) {
      return {
        statusCode: 200,
        message: 'success',
        data: null
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

// 获取客户端用户列表
const admin_userList = ({
  page = 1,
  pageSize = 10,
  phone = '',
  status = '',
  role = ''
}) => {
  var query = {}
  if (phone) {
    query.phone = phone
  }
  if (status) {
    query.status = status
  }
  if (role) {
    query.role = role
  }
  return adminUser.findAndCountAll({
    offset: (page - 1) * pageSize,
    limit: +pageSize,
    attributes: ['userId', 'phone', 'nickname', 'email', 'avatar', 'status', 'createdAt'],
    include: [{
      attributes: ['roleType', 'roleName'],
      model: adminRole,
      as: 'roleInfo'
    }],
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
  admin_register,
  admin_login,
  admin_info,
  admin_toogleUserStatus,
  admin_userList
}