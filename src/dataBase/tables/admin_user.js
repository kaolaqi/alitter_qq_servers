const utility = require('utility')
const Sequelize = require('sequelize')
const sequelize = require('../init')

const AdminRole = require('./admin_role.js')

// 初始化数据库的user表
const adminUser = sequelize.define('admin_user', {
  // userId: {
  //   type: Sequelize.DataTypes.UUID,
  //   defaultValue: Sequelize.DataTypes.UUIDV4,
  //   primaryKey: true,
  //   comment: '后台账号用户ID'
  // },
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '后台账号手机号',
    // primaryKey: true
    unique: true
  },
  nickname: {
    type: Sequelize.STRING,
    comment: '后台账号昵称'
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '后台账号密码'
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '后台账号邮箱，将来用于修改密码',
    unique: true
  },
  
  avatar: {
    type: Sequelize.STRING,
    comment: '后台账号图像URL地址'
  },
  role: {
    type: Sequelize.STRING,
    defaultValue: 'normalAadmin', // 默认为普通管理用户
    comment: '后台账号角色类型'
  },
  status: {
    type: Sequelize.BOOLEAN,
    defaultValue: false, // 新注册的用户默认可用状态为关闭 不可用
    comment: '用户可用状态 | 可用：true； 禁用： false'
  }
}, {
  paranoid: true, // 启用软删除
})

adminUser.belongsTo(AdminRole, {
  as: 'roleInfo',
  foreignKey: 'role'
})

adminUser.sync({
  force: false
}).then(() => {
  // 现在数据库中的 `backstage_user` 表对应于模型定义
  adminUser.findOne().then(res => {
    if (!res) {
      console.log('即将创建backstage_user表') //初始化数据库是自动创建一个超管账号: admin | 111111
      return adminUser.create({
        phone: 'admin',
        nickname: '超级管理员',
        password: utility.sha256('111111'),
        role: 'superAdmin',
        email: 'admin_ad@qq.com',
        avatar: null,
        status: true
      })
    } else {
      console.log('backstage_user表已经存在....')
    }
  }).catch(err => {
    throw Error('创建表backstage_user失败....' + err)
  })
})

module.exports = adminUser