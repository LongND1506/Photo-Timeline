var express=require('express')
var router=express.Router()
var authController=require('../controller/authController')
var authMiddleWare=require('./middleware/authMiddleWare')
router.post('/register',authController.register)
router.get('/activeAccount/:token',authController.activeAccount)
router.post('/login',authController.login)
router.get('/logout',authMiddleWare.requirelogin,authController.logout)
module.exports=router