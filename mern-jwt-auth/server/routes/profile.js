const express = require('express')
const router =express.Router()
const postAdditionalInfoController = require('../controllers/postProfile')
const getAdditionalInfoController = require('../controllers/getProfile')
router.route('/').post(postAdditionalInfoController.handleAdditionalInfo)
router.route('/get').post(getAdditionalInfoController.getAdditionalInfo)
router.route('/delete').post(postAdditionalInfoController.deleteInfo)
module.exports = router