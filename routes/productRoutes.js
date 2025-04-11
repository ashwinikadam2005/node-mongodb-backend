const express=require('express')
const Product=require('../models/Product')

const router=express.Router()

router.post('/add',async(req,res)=>{
    try{
        const {productName,productPrice,productUnit,productDescription}=req.body
        const productExist=await Product.findOne({productName})
        if(productExist){
            res.json({
                status:false,
                message:'Product already exist'
            })
        }
        const productObj=new Product({productName,productPrice,productUnit,productDescription })
        await productObj.save()
        res.json({
            status:true,
            message:'Product added successfully'
        })
    }catch(err){
        res.json({
            status:false, 
            message:`Error${err}`
        })
    }
})
router.get('/get',async(req, res)=>{
    try{
    const results=await Product.find()
    res.json({
        status:true,
        message:results
    })
    }catch(err){
        res.json({
            status:false, 
            message:`Error${err}`
        })
    }
})

router.delete('/delete/:id',async(req,res)=>{
    try{
        const id=req.params.id
        await Product.findByIdAndDelete(id)
        res.json({
            status:true,
            message:"Product deleted successfully."
        })
    }catch(err){
        res.json({
            status:false,
            message:err
        })
    }
    

})

router.put('/update/:id',async(req,res)=>{
    try{
        const id=req.params.id
        const updated=await Product.findByIdAndUpdate(id,req.body,{'new':true})
        res.json({
            status:true,
            message:"Product Updated successfully."
        })
    }catch(err){
        res.json({
            status:false,
            message:err
        })
    }
})

module.exports=router
