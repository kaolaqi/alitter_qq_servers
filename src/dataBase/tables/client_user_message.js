const Sequelize = require('sequelize')
const sequelize = require('../init')
// const clientUserAdmin = require('./client_user')
// const userFriendAdmin = require('./client_user_firend')

// 初始化数据库的user 表
const userMessageAdmin = sequelize.define('client_user_message', {
  userId: {
    type: Sequelize.BIGINT,
    allowNull: false
  },
  friendUserId: {
    type: Sequelize.BIGINT,
    allowNull: false
  },
  contentText: {
    type: Sequelize.STRING(1234),
    allowNull: false
  },
  readed: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
})

// userMessageAdmin.hasMany(userFriendAdmin, {
//   foreignKey: 'userId',
//   as: 'lastMessage'
// })
// userMessageAdmin.belongsTo(clientUserAdmin, {
//   // foreignKey: ['userId', 'friendUserId'],
//   foreignKey: 'userId',
//   as: 'lastMessage'
// })

userMessageAdmin.sync({
  force: false
}).then(() => {
}).catch(err => {
  throw Error('创建表client_user_message失败....' + err)
})

module.exports = userMessageAdmin
