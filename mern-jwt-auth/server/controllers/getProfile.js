const User = require('../model/user')

const getAdditionalInfo = async(req,res)=>{
   console.log('here at get profile')
 const{user} = req.body
 console.log(user)
 try{
   const foundUser =  await User.findOne({username:user})
   // console.log(foundUser)
   const {bio,name,picture} = foundUser.profile
   // console.log(bio,name)
    res.json({bio,name,picture})
 }
 catch(err){
    res.sendStatus(500)
 }  
}
module.exports ={getAdditionalInfo}