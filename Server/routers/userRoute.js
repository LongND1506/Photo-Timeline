var express=require('express')
var router=express.Router()
var userController=require('../controller/userController')
var authMiddleWare=require('./middleware/authMiddleWare')
router.get('/',authMiddleWare.requirelogin,userController.getalluser)
router.get('/:userId',authMiddleWare.requirelogin,userController.getuser)
router.post('/changepassword',authMiddleWare.requirelogin,userController.changepassword)
module.exports= router