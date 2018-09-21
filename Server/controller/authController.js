
var bcrypt=require('bcrypt')
var User=require('../models/User')
var authCode=require('./code/auth')
var Mail=require('./sendmail/index')
var JWT=require('./config/jwt')
var blacklist=require('local-storage')
var saltRound=require('./config/saltRound')

module.exports={
    register:(req,res)=>{
        User.findOne({email:req.body.email}).exec((err,usr)=>{
            if(err)
                return res.json({message:err})
            if(!usr)
                {
                    bcrypt.hash(req.body.password,saltRound,(err,hashPassword)=>{
                        if(err)
                            console.log(err)
                        else
                            {
                                let user=new User({
                                    email:req.body.email,
                                    name:req.body.name,
                                    password:hashPassword
                                })
                                User.create(user,(err,user)=>{
                                    if(err)
                                        return res.json(authCode.REGISTER.FAIL.CREATE)
                                    else
                                        {
                                            let token=JWT.createToken(JSON.stringify(user))
                                            console.log(token)
                                            let title='Active your account'
                                            let html="<p>Click <a href='http://localhost:8000/auth/activeAccount/"+token+"'>here</a></p>"
                                            Mail.sendMail(user.email,title,html)
                                            .then(resMail=>res.json(authCode.REGISTER.SUCCESS),err=>res.json(authCode.REGISTER.FAIL.SEND_MAIL)
                                        )
                                        }
                                })
                            }
                    })
                    
                }
            else
                return res.json(authCode.REGISTER.FAIL.EXIST_ACCOUNT)
           
        })
    },
    activeAccount:(req,res)=>{
        JWT.verifyToken(req.params.token).then(result=>{
            User.findOneAndUpdate(JSON.parse(result.user),{$set:{active:true}}).exec((err)=>{
                if(err)
                   return res.json({message:err})
                else    
                   return res.json(authCode.ACTIVE_ACCOUNT.SUCCESS)
            })
            console.log(result)
        },
        err=>{
            return res.json({message:err})
        }
    )

    },
    login:(req,res)=>{
        
        User.findOne({email:req.body.email}).exec((err,user)=>{
            if(err)
                return res.json({message:err})
            if(!user)
                {
                    return res.json(authCode.LOG_IN.FAIL.LOGIN_EMPTY)
                }
            if(user&&user.active){
                bcrypt.compare(req.body.password,user.password,(err,flag)=>{
                    if(err)
                        console.log(err)
                    if(flag)
                    {
                        let token=JWT.createToken(user)
                        console.log(token)
                        return res.json({token:token})
                    }
                    else{
                        return res.json(authCode.LOG_IN.FAIL.LOGIN_FAIL)
                    }
                       
                })
            }
            else{
                return res.json(authCode.LOG_IN.FAIL.ACCOUNT_NOT_ACTIVE)
            }
        })
    },
    logout:(req,res)=>{
        let token=req.headers["authorization"]
        if(token){
            blacklist.set("invalid_token",token)
            setTimeout(()=>{
                blacklist.clear()
            },1800000)
            return res.json(authCode.LOG_OUT.SUCCESS)
        }
       else{
           return res.json(authCode.LOG_OUT.FAIL.NOT_AUTHOR)
       }
    }
}