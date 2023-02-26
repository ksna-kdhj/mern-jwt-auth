const User = require('../model/user')
const express = require('express')
const router = express.Router()

const getAllUsers = async (req,res) =>{
    allUsers = await User.find()
    if (!allUsers) return res.status(204).json({'message':'no users found'})
    res.json(allUsers)
}

const deleteUser = async(req,res) =>{
    const targetUser = await User.findOne({username:req.body.user})
    if (!targetUser) return res.status(204).json({'message':'no users found'})
    await User.deleteOne(targetUser)
    res.status(201).json({'message':`User ${targetUser.username} deleted successfully `})
}

const getUser = async (req,res) =>{
    if(!req?.params?.id) return res.sendStatus(400).json({'message':'User ID required'})
    const user = await User.findOne({_id:req.params.id})
    if (!user) return res.status(204).json({'message':`User ID ${req.params.id} not found`})
    res.json(user)
}
// const updateUserName = async(req,res) =>{
//     const targetUser = await User.findOne({username:req.body.user})
//     if (!targetUser) return res.status(204).json({'message':'no users found'})
//     await User.updateOne({username: targetUser.username}{...targetUser,})

// }
module.exports = {getAllUsers,deleteUser,getUser}