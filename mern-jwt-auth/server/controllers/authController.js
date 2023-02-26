const User = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const handleLogin = async(req,res)=>{
    //checking if username and pwd exist
    const {user, pwd} =req.body;
    if(!user||!pwd) return res.status(400).json({'message':'Username and password are required.'})
    //validating username and pwd
    const foundUser = await User.findOne({username:user})
    if(!foundUser) return res.sendStatus(401)
    const match = await bcrypt.compare(pwd,foundUser.password)
    if(!match) return res.sendStatus(401)
    const roles = Object.values(foundUser.roles).filter(Boolean)
    //creating jwt access and refresh tokens
    const accessToken = jwt.sign(
        {
            UserInfo: 
            {
        username: foundUser.username,
        roles: roles
        }
    }
        ,process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:'10m'})
    const refreshToken = jwt.sign({
        username: foundUser.username}
        ,process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:'1d'})
    // try{
    //     await User.updateOne(foundUser,{...foundUser,refreshToken})
    // }
    // catch(err)
    //     res.status(500).json({message:err.message})
    // }
    foundUser.refreshToken = refreshToken
    await foundUser.save()
    res.cookie('jwt',refreshToken,{
        httpOnly:true,
        secure:true,
        sameSite:'None',
        maxAge: 24*60*60*1000
    })
    res.json({accessToken})
}

module.exports ={handleLogin}