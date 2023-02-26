const User = require('../model/user.js')

const handleLogout = async (req,res)=>{
    //pm client side also delete access token
    const cookies =req.cookies;
    if(!cookies?.jwt) return res.sendStatus(204)
    const refreshToken = cookies.jwt
    //checking for refresh token in DB
    const foundUser = await User.findOne({refreshToken})
    if(!foundUser){ 
        res.clearCookie('jwt',{httpOnly:true})
        return res.sendStatus(204)
    }
    foundUser.refreshToken = ''
    const result = await foundUser.save()
    console.log(result)
    res.clearCookie('jwt',{httpOnly:true})
        return res.sendStatus(204)
        }

module.exports ={handleLogout}