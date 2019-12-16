const Sequelize = require('sequelize')
const sequelize = require('../init')

// const AdminUser = require('./admin_user.js')

// 初始化数据库的user表
const adminRole = sequelize.define('admin_role', {
  roleType: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '后台账号角色类型',
    unique: true
  },
  roleName: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '后台账号角色名称'
  }
}, {
  paranoid: true, // 启用软删除
})

adminRole.sync({
  force: false
}).then(() => {
  // 现在数据库中的 `admin_role` 表对应于模型定义
  adminRole.findOne().then(res => {
    if (!res) {
      console.log('即将创建admin_role表') // 初始化数据库，自动创建一个超级管理员的角色
      return adminRole.bulkCreate([{
        roleType: 'superAdmin',
        roleName: '超级管理员'
      }, {
        roleType: 'normalAadmin',
        roleName: '管理员'
      }])
    } else {
      console.log('admin_role表已经存在....')
    }
  }).catch(err => {
    throw Error('创建表admin_role失败....' + err)
  })
})

module.exports = adminRole
