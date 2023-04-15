const User = require('../model/user')

const handleAdditionalInfo = async(req,res)=>{
console.log('here at post profile')
 const{user,name,bio,picture} = req.body
//  console.log(user,name,bio)
 try{
    const foundUser = await User.findOne({username:user})
    if (picture){
      foundUser.profile.picture = picture
    }
    foundUser.profile.name = name
    foundUser.profile.bio = bio
    await foundUser.save()
   //  console.log(foundUser)
    res.json({name,bio,picture})
 }
 catch(err){
    res.sendStatus(500)
 }  
}
const deleteInfo = async(req,res)=>{
   const {user} = req.body
   
   const foundUser = await User.findOne({username:user})
   if(foundUser?.profile?.picture)
   foundUser.profile.picture = null
   await foundUser.save()
}
module.exports ={handleAdditionalInfo,deleteInfo}