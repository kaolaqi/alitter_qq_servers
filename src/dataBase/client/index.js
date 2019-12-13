const cllientUserModel = require('./cllientUser')
const cllientFriendModel = require('./cllientFriend')
// const cllientMessageModel = require('./cllientMessage')

module.exports = {
  ...cllientUserModel,
  ...cllientFriendModel,
  // ...cllientMessageModel
}