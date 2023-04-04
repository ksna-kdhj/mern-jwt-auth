const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    roles:{
        User:{
            type:Number,
            default:2001
        },
        Editor: Number,
        Admin: Number,
    },
    password:{
        type:String,
        required:true
    },
    refreshToken:[String]
})
const User = mongoose.model('User',userSchema)
module.exports= User