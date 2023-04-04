const User = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const handleLogin = async(req,res)=>{
    const cookies = req.cookies;
    console.log(`cookie available at login: ${JSON.stringify(cookies)}`)
    //checking if username and pwd exist
    const {user, pwd} =req.body;
    if(!user||!pwd) return res.sendStatus(400)
    // .json({'message':'Username and password are required.'})
    //validating username and pwd
    const foundUser = await User.findOne({username:user})
    if(!foundUser) return res.sendStatus(401)
    const match = await bcrypt.compare(pwd,foundUser.password)
    if(!match) return res.sendStatus(401)
    const roles = Object.values(foundUser.roles).filter(Boolean)
    //creating jwt access and refresh tokens
    const accessToken = jwt.sign(
        {
            'UserInfo': 
            {
        'username': foundUser.username,
        'roles': roles
        }
    }
        ,process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:'10s'})
    const newRefreshToken = jwt.sign({
        username: foundUser.username}
        ,process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:'15m'})
    let newRefreshTokenArray = !cookies?.jwt?foundUser.refreshToken: foundUser.refreshToken.filter(rt=>rt!=cookies.jwt)
    if(cookies?.jwt){
        const refreshToken = cookies.jwt
        const foundToken = await User.findOne({refreshToken})
        if(!foundToken){
            console.log('attempted refresh token reuse at login!')
            newRefreshTokenArray=[]
        }

        res.clearCookie('jwt',{httpOnly:true})}

    foundUser.refreshToken = [...newRefreshTokenArray,newRefreshToken]
    await foundUser.save()
    console.log(foundUser.refreshToken)
    res.cookie('jwt',newRefreshToken,{
        httpOnly:true,
        secure:true,
        sameSite:'None',
        maxAge: 24*60*60*1000
    })
    res.json({accessToken})
}

module.exports ={handleLogin}