const adminUserModel = require('./adminUser')
const clinetUserAdmin = require('./clinetUserAdmin')

module.exports = {
  ...adminUserModel,
  ...clinetUserAdmin
}