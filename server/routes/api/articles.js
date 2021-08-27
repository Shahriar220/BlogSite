const express=require('express')
let router=express.Router();

require('dotenv').config();

const {checkLoggedIn}=require('../../middleware/auth')
const {grantAccess} =require('../../middleware/roles')
const {sortArgsHelper}=require('../../config/helpers')

const {Article}=require('../../models/article_model');


router.route('/admin/addarticle').post(checkLoggedIn,grantAccess('createAny','article'),async(req,res)=>{
    try{
        const article=new Article({
            ...req.body,
            score:parseInt(req.body.score)
        })
        const result=await article.save()
        res.status(200).json(result)
    }catch(error){
        res.status(400).json({message:'Error adding article',error:error})
    }
})

router.route("/admin/:id").get(checkLoggedIn,grantAccess('readAny','article'),async(req,res)=>{
    try{
        const _id=req.params.id
        const article=await Article.findById(_id)
        if(!article||article.length===0) return res.status(400).json({message:"No article found"})
        res.status(200).json(article)
    }catch(error){
        res.status(400).json({message:"Error fetching"})
    }
})
.patch(checkLoggedIn,grantAccess('updateAny','article'),async(req,res)=>{
    try{
        const _id=req.params.id
        const article=await Article.findOneAndUpdate(
            {_id},
            {"$set":req.body},
            {new:true}
    )
        if(!article) return res.status(400).json({message:'No article found'})
        res.status(200).json(article)
    }catch(error){
        res.status(400).json({message:'Something went wrong'})
    }
})
.delete(checkLoggedIn,grantAccess('deleteAny','article'),async(req,res)=>{
    try{
        const _id=req.params.id
        const article=await Article.findByIdAndRemove(_id)
        if(!article){
            res.status(400).json({message:'Article not found'})
        }
        res.status(200).send({_id:article._id})
    }catch(error){
        res.status(400).json({message:"Something went wrong"})
    }    
})

router.route("/getbyid/:id").get(async(req,res)=>{
    try{
        const _id=req.params.id
        const article=await Article.find({_id:_id,status:'public'});
        if(!article||article.length===0) return res.status(400).json({message:'Article not found'})
        res.status(200).json(article)
    }catch(error){
        res.status(400).json({message:'Something went wrong'})
    }
})
router.route("/loadmore").post(async(req,res)=>{
    try{
        //{sortBy:"_id",order:"asc",limit:10,skip:10}
        let sortArgs=sortArgsHelper(req.body)
        const articles=await Article.find({status:'public'})
        .sort([[sortArgs.sortBy,sortArgs.order]])
        .skip(sortArgs.skip)
        .limit(sortArgs.limit)

        res.status(200).json(articles)
    }catch(error){
        console.log(error)
        res.status(400).json({message:'Error fetching articles',error:error})
    }
})

router.route("/admin/paginator").post(checkLoggedIn,grantAccess('readAny','articles'),async(req,res)=>{
    try{
        
        const limit=req.body.limit?req.body.limit:5;
        const aggQUery=Article.aggregate();
        const options={
            page:req.body.page,
            limit,
            sort:{_id:'desc'}
        }
        const articles=await Article.aggregatePaginate(aggQUery,options)
        res.status(200).json(articles)
    }catch(error){
        res.status(400).json({message:'No article found',error})
    }
})

module.exports=router