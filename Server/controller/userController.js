var User=require('../models/User')
var JWT=require('../controller/config/jwt')
var bcrypt=require('bcrypt')
var saltRound=require('./config/saltRound')
var userCode=require('./code/user')
const URL='http://localhost:8000/images/'

module.exports={
//Get a user with userId 
    getuser:(req,res)=>{  
        if(req.params.userId){
            let userId=req.params.userId
            User.findOne({_id:userId}).exec((err,doc)=>{
                if(err)
                    return res.json({Error:err})
                if(doc){
                    return res.json(Object.assign(userCode.GET_USER.SUCCESS,{user:doc}))
                }
            })
        }
        
    },
//Get all User
    getalluser:(req,res)=>{
        User.find().exec((err,docs)=>{
            if(err)
                return res.json({Error:err})
            if(docs)
                return res.json(Object.assign(userCode.GET_USER.SUCCESS,{users:docs}))
        })
    },
//Change password 
    changepassword:(req,res)=>{
        let token=req.headers["authorization"]
        let old_password=req.body.old_password
        let new_password=req.body.new_password
        if(!old_password||!new_password)
            return res.json(userCode.CHANGE_PASSWORD.FAILED.EMPTY)
        JWT.verifyToken(token).then(decoded=>{
            let userId=decoded.user._id
            User.findById(userId).exec((err,doc)=>{
                if(err)
                    return res.json({Error:err})
                if(doc){
                    bcrypt.compare(old_password,doc.password,(err,flag)=>{
                        if(!err&&flag){
                            bcrypt.hash(new_password,saltRound,(err,new_hash_password)=>{
                                if(err)
                                    console.log(err)
                                else{
                                    doc.password=new_hash_password
                                    doc.save().then((doc_saved)=>{
                                            return res.json(userCode.CHANGE_PASSWORD.SUCCESS)
                                    }).catch(err=>res.json({Error:err}))
                                }
                            })
                        }
                        if(!flag)
                            return res.json(userCode.CHANGE_PASSWORD.FAILED.NOT_MATCH)
                    })
                }
            })
        },err=>{return res.json({Error:err})})

    },
//Delete user 
    deleteuser:(req,res)=>{

    }
}