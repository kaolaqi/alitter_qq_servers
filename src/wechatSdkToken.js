// const sha1 = require('sha1');
const config = {
  wechat: {
    appID: 'wxdc258dc994aea4db', // 公众号里面取
    AppSecret: '05cf283e25ed6cbd237e054f54dcbbf2', // 公众号里面取
    token: 'ab38f22e60ebb0a911d461hello' // 自定义的token
  }
}

module.exports = (req, res) => {
  console.log(req)
  res.json({
    token: 121212
  })
}
