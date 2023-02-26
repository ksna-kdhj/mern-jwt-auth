const mongoose = require('mongoose')

const connectDB = (url)=>{
    mongoose.set('strictQuery',true);
    mongoose.connect(url,{useNewUrlParser: true})
    .then(()=>console.log('Connected to MongoDB'))
    .catch((error)=>console.log(error))
}

module.exports = connectDB