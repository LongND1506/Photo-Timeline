var JWT=require('../../controller/config/jwt')
var blacklist=require('local-storage')
var authStatus=require('../../controller/code/auth')
module.exports={
    requirelogin:(req,res,next)=>{
        let token=req.headers["authorization"]
        JWT.verifyToken(token).then(decoded=>{
            if(token&&token!=blacklist.get('invalid_token'))
            {
                next()
            }
            else{
                return res.json(authStatus.UN_AUTH)
            }
        },err=>{
            return res.json(authStatus.UN_AUTH)
        })
    },
    // requirelogin:(req,res,next)=>{
    //     let token=req.headers["authorization"]
    //     JWT.verifyToken(token).then(decoded=>{
            
    //     },err=>{})
    //     next()
    // }
}