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
        message: '登录失效，请重新登录！',
        result: null
      })
    }
  })
}



// const jsonwebtoken = require('jsonwebtoken')
// const {
//   tokenAdminSecret,
//   tokenClientSecret
// } = require('../config/tokenSecret')

// const adminAuth = auth(tokenAdminSecret)
// const clientAuth = auth(tokenClientSecret)

// function auth(tokenSecret) {
//   return (req, res, next) => {
//     const auth = req.cookies.guruaduserauth
//     // 校验token
//     jsonwebtoken.verify(auth, tokenSecret, err => {
//       if (!err) {
//         const payload = jsonwebtoken.decode(auth)
//         req.username = payload.data.username
//         next()
//       } else {
//         res.json({
//           statusCode: 401,
//           message: '登录失效，请重新登录！',
//           result: null
//         })
//       }
//     })
//   }
// }

// module.exports = {
//   adminAuth,
//   clientAuth
// }
