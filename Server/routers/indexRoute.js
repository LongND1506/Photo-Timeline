var express=require('express')
var router=express.Router()
var authRoute=require('./authRoute')
var userRoute=require('./userRoute')
var albumRoute=require('./albumRoute')
router.use('/auth',authRoute)
router.use('/user',userRoute)
router.use('/album',albumRoute)
module.exports=router