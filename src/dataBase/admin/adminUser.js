const utility = require('utility')
const backstageUserAdmin = require('../tables/admin_user')

// 后台管理用户注册 phone password email必填，nickname选填，其他字段忽略无效
const admin_register = ({
  phone,
  nickname = null,
  password,
  email,
}) => {
  password = utility.sha256(password)
  return backstageUserAdmin.create({
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
  return backstageUserAdmin.findOne({
    where: {
      phone
    }
  }).then(userInfo => {
    if (userInfo) {
      password = utility.sha256(password)
      if (userInfo.password === password) {
        return {
          statusCode: 200,
          message: userInfo.nickname || userInfo.phone + '账号登录成功！',
          data: {
            avatar: userInfo.avatar,
            email: userInfo.email,
            role: userInfo.role,
            status: userInfo.status,
            phone: userInfo.phone,
            nickname: userInfo.nickname
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
  username
}) => {
  return backstageUserAdmin.findOne({
    where: {
      username: username
    }
  }).then(data => {
    if (data) {
      return {
        statusCode: 200,
        message: 'success',
        data: {
          avatar: data.avatar,
          email: data.email,
          id: data.id,
          key: data.key,
          role: data.role,
          status: data.status,
          username: data.username
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

// 删除指定用户
const admin_toogleUserStatus = ({
  id,
  status
}) => {
  return backstageUserAdmin.update({
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

// 获取客户端用户列表
const admin_userList = ({
  page = 1,
  pageSize = 10,
  username = '',
  status = '',
  role = ''
}) => {
  var query = {}
  if (username) {
    query.username = username
  }
  if (status) {
    query.status = status
  }
  if (role) {
    query.role = role
  }
  return backstageUserAdmin.findAndCountAll({
    offset: (page - 1) * pageSize,
    limit: +pageSize,
    attributes: ['id', 'username', 'email', 'avatar', 'status', 'role', 'createdAt'],
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