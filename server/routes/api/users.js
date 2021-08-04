//const { request } = require('express');
const express=require('express')
let router=express.Router();

require('dotenv').config();

const {checkLoggedIn}=require('../../middleware/auth')
const {grantAccess} =require('../../middleware/roles')


const {User}=require('../../models/user_model')

router.route("/register").post(async(req,res)=>{
    try{
        if(await User.emailTaken(req.body.email)){
            return res.status(400).json({message:'Email already used'})
        }
        const user=new User({
            email:req.body.email,
            password:req.body.password
        })

        const token=user.generateToken()

        const doc=await user.save()
        res.cookie('x-access-token',token)
        .status(200).send(getUserProps(doc))
    }catch(err){
        res.status(400).json({message:'Error',error:err})
    }
})

router.route("/signin").post(async(req,res)=>{
    try{
        //find the user
        let user=await User.findOne({email:req.body.email})
        if(!user) return res.status(400).json({message:'Email not registered'})
        //password matches
        const compare=await user.comparePassword(req.body.password)
        if(!compare) return res.status(400).json({message:'Password does not match'})
        //generate response
        const token=user.generateToken()
        //response
        res.cookie('x-access-token',token)
        .status(200).send(getUserProps(user))
    }catch(error){
        res.status(400).json({message:'Not user',error:error})
    }
})

router.route("/profile")
.get(checkLoggedIn,grantAccess('readOwn','profile'),async(req,res)=>{
    try{
        const permission=res.locals.permission
        const user=await User.findById(req.user._id)
        if(!user) return res.status(400).json({message:'User not found'})
        
        res.status(200).json(permission.filter(user._doc))
    }catch(error){
        return res.status(400).send(error)
    }
})
.patch(checkLoggedIn,grantAccess('updateOwn','profile'),async(req,res)=>{
    try{
        const user=await User.findByIdAndUpdate({
            _id:req.user._id
        },{
            "$set":{
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                age:req.body.age
            }
        },
        {
            new:true
        }
        )
        if(!user) return res.status(400).json({message:'User not found'})
        res.status(200).json(getUserProps(user))
    }catch(error){
        res.status(400).json({message:'Problem updating',error:error})
    }
})

router.route("/isauth").get(checkLoggedIn,async(req,res)=>{
    res.status(200).send(getUserProps(req.user))
})

router.route("/updateemail").patch(checkLoggedIn,grantAccess('updateOwn','profile'),async(req,res)=>{
    try{
        if(await User.emailTaken(req.body.newemail)){
            return res.status(400).json({message:'Email already taken'})
        }
        const user=await User.findOneAndUpdate({_id:req.user._id,email:req.body.email},
        {"$set":{
            email:req.body.newemail
        }},
        {new:true}
        )
        if(!user) return res.status(400).json({message:'User not found'})
        const token=user.generateToken();
        res.cookie('x-access-token',token)
        .status(200).send({email:user.email})
    }catch(error){
        res.status(400).json({message:'Could not update',error:error})
    }
})

const getUserProps=(user)=>{
    return{
        _id:user._id,
        email:user.email,
        firstname:user.firstname,
        lastname:user.lastname,
        age:user.age,
        role:user.role
    }
}

module.exports=router