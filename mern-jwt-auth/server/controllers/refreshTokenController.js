const User = require('../model/user.js')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const handleRefreshToken = async (req,res)=>{
    const cookies =req.cookies;
    if(!cookies?.jwt) return res.sendStatus(401)
    const refreshToken = cookies.jwt
    res.clearCookie('jwt',{httpOnly:true})
    const foundUser = await User.findOne({refreshToken})
    //detected refresh token reuse
    if(!foundUser){
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
           async (err,decoded)=>{
            if(err) return res.sendStatus(403)
            console.log('attempted refresh token reuse!')
            const hackedUser = await User.findOne({username:decoded.username})
            hackedUser.refreshToken = []
            const result = await hackedUser.save()
            console.log(result)
             }
             )
        return res.sendStatus(403)
    }
    const newRefreshTokenArray = foundUser.refreshToken.filter(rt => rt !== refreshToken)

    const username = foundUser.username
    //evaluate jwt
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err,decoded)=>{
            if(err){
                console.log('expired refresh token')
                foundUser.refreshToken = [...newRefreshTokenArray]
                const result = await foundUser.save()
                console.log(result)
            }
            if(err || foundUser.username!== decoded.username) return res.sendStatus(403)
            // refresh token is still valid
            const roles= Object.values(foundUser.roles)
            const accessToken = jwt.sign( 
             {UserInfo: {
                username: decoded.username,
                roles: roles 
                }
            },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn:'30s'}
            )
            const newRefreshToken = jwt.sign({
                username: foundUser.username}
                ,process.env.REFRESH_TOKEN_SECRET,
                {expiresIn:'15m'})
            foundUser.refreshToken = [...newRefreshTokenArray,newRefreshToken]
            await foundUser.save()
            res.cookie('jwt',newRefreshToken,{
                httpOnly:true,
                secure:true,
                sameSite:'None',
                maxAge: 24*60*60*1000
            })
            res.json({username,accessToken})
        }
    )
    
    
}

module.exports ={handleRefreshToken}