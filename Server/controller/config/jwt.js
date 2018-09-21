var jwt=require('jsonwebtoken')
var secretKey=require('./secret')
module.exports={
    createToken: (user)=>{
        let token=jwt.sign({user},secretKey,{expiresIn:'1800s'})
        return token
        
    },
    verifyToken:(token)=>{
        return new Promise((resolve,reject)=>{
            jwt.verify(token,secretKey,(err,decoded)=>{
                if(err)
                    reject(err)
                else
                   resolve(decoded)
            })
        })
        
    }
}