const userController = require('../../controllers/userController')
const verifyJWT=require('../../middleWare/verifyJWT')
const ROLES_LIST = require('../../config/roles_list')
const verifyRoles = require('../../middleWare/verifyRoles')
const express = require('express')
const router = express.Router()

router.route('/')
.get(verifyJWT,verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),userController.getAllUsers)
.delete(verifyJWT,verifyRoles(ROLES_LIST.Admin),userController.deleteUser)

router.route('/:id')
.get(verifyJWT,verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),userController.getUser)

module.exports = router