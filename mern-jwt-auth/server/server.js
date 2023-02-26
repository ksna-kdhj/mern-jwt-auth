require('dotenv').config()
const express = require('express')
const cors = require('cors')
const PATH = require('path')
const corsOptions = require('./config/corsOptions')
const {logger,logEvents} = require('./middleWare/logEvents')
const errorHandler =require('./middleWare/errorHandler')
const app=express()
const verifyJWT=require('./middleWare/verifyJWT')
const cookieParser = require ('cookie-parser')
const connectDB = require('./mongoDB/connect')
const credentials = require('./middleware/credentials')
const PORT = 8080


app.use(logger)
app.use(credentials)
app.use(cors(corsOptions))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cookieParser())

app.use('/', express.static(PATH.join(__dirname, '/public')));
app.use('/register',require('./routes/register'))
app.use('/auth',require('./routes/auth'))
app.use('/refresh',require('./routes/refresh'))
app.use('/users',require('./routes/api/users'))
app.use('/logout',require('./routes/logout'))
// app.use(verifyJWT)
app.all('*',(req,res)=>{
    res.status(404)
    if (req.accepts('html')){
        res.sendFile(PATH.join(__dirname,'views','404.html'))
    }
    else if(req.accepts('json')){
        res.json({error:"404 not found"})
    }
    else{
        res.type('txt').send("404 not found")
    }
})
app.get('/',(req,res)=>{
    res.send('hi are you')
})
app.use(errorHandler)
const startServer= async () =>{
    try{
        connectDB(process.env.MONGODB_URL);
        app.listen(PORT,()=> 
        console.log('Server has started on port http://localhost:8080'))
    }catch(error){
        console.log(error)
    }
}
startServer()
