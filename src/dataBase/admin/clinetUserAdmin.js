const clientUserAdmin = require('../tables/client_user')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

// 获取客户端用户列表
const admin_clientUserList = ({
  page = 1,
  pageSize = 10,
  mobile = '',
  nickname = '',
  status = '',
  startTimestamp = '',
  endTimestamp = ''
}) => {
  var query = {}
  if (mobile) {
    query.mobile = mobile
  }
  if (nickname) {
    query.nickname = nickname
  }
  if (status) {
    query.status = status
  }
  if (startTimestamp && endTimestamp) {
    query.createdAt = {
      [Op.gt]: new Date(+startTimestamp),
      [Op.lt]: new Date(+endTimestamp)
    }
  }
  return clientUserAdmin.findAndCountAll({
    offset: (page - 1) * pageSize,
    limit: +pageSize,
    attributes: ['userId', 'nickname', 'mobile', 'avatar', 'status', 'createdAt', 'updatedAt'],
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

// 删除指定用户
const admin_deleteClientUser = ({
  userId
}) => {
  return clientUserAdmin.destroy({
    where: {
      userId: +userId
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

// 切换指定用户状态
const admin_toogleClientUserStatus = ({
  userId,
  status
}) => {
  return clientUserAdmin.update({
    status
  }, {
    where: {
      userId: +userId
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

module.exports = {
  admin_clientUserList,
  admin_deleteClientUser,
  admin_toogleClientUserStatus
}
