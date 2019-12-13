const Sequelize = require('sequelize')
const sequelize = require('../init')
const clientUserAdmin = require('./client_user')
// const userMessageAdmin = require('./client_user_message')

// 初始化数据库的user表
const userFriendAdmin = sequelize.define('client_user_firend', {
  userId: {
    type: Sequelize.BIGINT,
    allowNull: false
  },
  friendUserId: {
    type: Sequelize.BIGINT,
    allowNull: false
  },
  chated: {
    type: Sequelize.BIGINT,
    defaultValue: 0
  }
})

userFriendAdmin.belongsTo(clientUserAdmin, {
  foreignKey: 'friendUserId',
  as: 'userInfo'
})

userFriendAdmin.sync({
  force: false
}).then((res) => {
  if (!res) {
    console.log('即将创建client_user_firend表')
  } else {
    console.log('client_user_firend表已经存在....')
  }
}).catch(err => {
  throw Error('创建表client_user_firend失败....' + err)
})

module.exports = userFriendAdmin