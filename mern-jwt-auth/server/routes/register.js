const express = require('express')
const router =express.Router()
const registerController = require('../controllers/registerController')
module.exports = router

router.route('/').post(registerController.handleNewUser)