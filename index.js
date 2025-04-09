const express=require('express')
const cors=require('cors')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
const User = require('./models/User')

const server=express()
server.use(cors())
server.use(bodyParser.json())


mongoose.connect('mongodb+srv://ashwinikadam:Ashu%402005@cluster0.rqrj9wh.mongodb.net/').then(()=> console.log('db connected')).catch((err)=>console.log(err))

server.post('/register',async(req, res)=>{
    try{
        const {fullName, userName, age,password}=req.body
        const userExist=await User.findOne({userName})
        if(userExist){
            return res.json({status:false, message:'User already exist'})
        }
        const userObj=new User({fullName, userName, age, password})
        await userObj.save()
        res.json({
            status:true,
            message:"User registered successfully"
        })

    }catch(err){
        res.json({
            status:false, 
            message:`Error${err}`
        })
    }
})

server.post('/login',async(req,res)=>{
    try{
        const {userName, password}=req.body
        const userExist=await User.findOne({userName})
        if(!userExist){
            return res.json({
                status:false,
                message:'User not found'
            })
        }
        if(password !==userExist.password){
            return res.json({
                status:false,
                message:'Wrong password'
            })
        }
        res.json({
            status:true,
            message:'Login successful'
        })

    }catch(err){
        res.json({
            status:false, 
            message:`Error${err}`
        })
    }

})

server.listen(8055,()=>{
    console.log('Server is running on port 8055')
})