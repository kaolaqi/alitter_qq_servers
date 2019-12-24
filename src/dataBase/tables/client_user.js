const utility = require('utility')
const Sequelize = require('sequelize')
const sequelize = require('../init')

// 初始化数据库的user表
const clientUser = sequelize.define('client_user', {
  userId: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    comment: '用户ID'
  },
  mobile: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '用户手机号',
    unique: true
  },
  nickname: {
    type: Sequelize.STRING,
    comment: '用户昵称'
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '用户密码'
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '用户邮箱，将来用于修改密码',
    unique: true
  },
  avatar: {
    type: Sequelize.STRING,
    defaultValue: 'http://47.98.128.245:8090/static/images/default_avatar.png',
    comment: '用户图像URL地址'
  },
  sign: {
    type: Sequelize.STRING,
    comment: '用户个性签名'
  },
  status: {
    type: Sequelize.BIGINT,
    defaultValue: 1, // 用户状态 不可用
    comment: '用户可用状态 | 正常：1； 冻结： 2'
  }
}, {
  paranoid: true, // 启用软删除
})

clientUser.sync({
  force: false
}).then(() => {
  // 现在数据库中的 `client_user` 表对应于模型定义
  clientUser.findOne().then(res => {
    if (!res) {
      console.log('即将创建client_user表') // 初始化数据库是自动创建一个系统用户: systemServer | 111111
      return clientUser.create({
        mobile: 'systemServer',
        nickname: '系统客服',
        password: utility.sha256('111111'),
        sign: '我是系统客服',
        email: 'client_server@qq.com'
      })
    } else {
      console.log('client_user表已经存在....')
    }
  }).catch(err => {
    throw Error('创建表client_user失败....' + err)
  })
})

module.exports = clientUser
