const Sequelize = require('sequelize')

// 数据库配置文件
const sqlConfig = {
  host: '47.98.128.245',
  user: 'root',
  password: '159abc357',
  database: 'test'
}

var sequelize = new Sequelize(sqlConfig.database, sqlConfig.user, sqlConfig.password, {
  host: sqlConfig.host,
  dialect: 'mysql',
  dialectOptions: {
    dateStrings: true,
    typeCast: true
  },
  pool: {
    max: 10,
    min: 0,
    idle: 10000
  },
  timezone: '+08:00' // 改为标准时区
})
module.exports = sequelize