const express = require('express')
const router = express.Router()

var adminModel = require('./admin/index')
var clientModel = require('./client/index')

router.use('/admin', adminModel)
router.use('/client', clientModel)

module.exports = router