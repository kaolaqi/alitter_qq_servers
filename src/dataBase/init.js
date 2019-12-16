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
  define: {
    underscored: true, // 转换列名的驼峰命名规则为下划线命令规则
    underscoredAll: true, //	转换模型名的驼峰命名规则为表名的下划线命令规则
    charset: 'utf8mb4' // 定义数据库的字符集
  },
  pool: {
    max: 10,
    min: 0,
    idle: 10000
  },
  freezeTableName: true, // Model 对应的表名将与model名相同
  timezone: '+08:00' // 改为标准时区
})

module.exports = sequelize
