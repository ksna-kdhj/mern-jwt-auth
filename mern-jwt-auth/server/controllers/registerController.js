const User = require('../model/user')
const bcrypt = require('bcrypt')
const ROLES_LIST = require('../config/roles_list')

const handleNewUser= async (req,res) =>{
    console.log('here')
    // console.log(req.body)
    const {user,pwd} = req.body
    console.log(`this is user ${user}`)
    console.log(pwd)
    if (!user ||!pwd)
     return res.sendStatus(400)
    //  .json({'message':'Username and password are required.'})
    const check = await User.findOne({username:user})
    if(check)
    return res.sendStatus(409)
    // .json({'message':'provided username already exists'})
    let roles = req?.body?.roles?Object.values(req.body.roles):null
    console.log(roles)
    const rolesList = Object.values(ROLES_LIST)
    console.log(rolesList)
    if(roles){
    const result = roles.map(role => rolesList.includes(role)).find(val => val===true)
    if (!result) return res.sendStatus(403)
    // .json({'message':'Enter Valid Roles'})
    }
    roles = req?.body?.roles?req.body.roles:roles
    try{
        const hashPwd = await bcrypt.hash(pwd, 10)
        await new User({username:user,roles:{...roles,'User':2001},password:hashPwd}).save()
        res.status(201).json({'success':`new user ${user} successfully created`})
    }
    catch(err){
        res.status(500).json({'message':'internal server error'})
    }

}
module.exports = {handleNewUser}