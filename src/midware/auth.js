const jsonwebtoken = require('jsonwebtoken')
const {
  tokenSecret
} = require('../config/index.js')
module.exports = (req, res, next) => {
  const auth = req.cookies.guruaduserauth
  // 校验token
  jsonwebtoken.verify(auth, tokenSecret, err => {
    if (!err) {
      const payload = jsonwebtoken.decode(auth)
      req.username = payload.data.username
      next()
    } else {
      res.json({
        statusCode: 401,
        message: 'token is unlawful',
        result: null
      })
    }
  })
}