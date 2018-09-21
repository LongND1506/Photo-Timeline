var express=require('express')
var router=express.Router()
var albumController=require('../controller/albumController')
var authMiddleWare=require('./middleware/authMiddleWare')
router.get('/:userId',authMiddleWare.requirelogin,albumController.getallalbum)
router.get('/:userId/:albumId',authMiddleWare.requirelogin,albumController.getalbum)
router.post('/upload/:userId',authMiddleWare.requirelogin,albumController.upload)
router.post('/update/:albumId',authMiddleWare.requirelogin,albumController.update)
router.post('/addimage/:userId/:albumId',authMiddleWare.requirelogin,albumController.addimage)
router.delete('/deleteimage/:userId/:albumId/:imageName',authMiddleWare.requirelogin,albumController.deleteimage)
router.delete('/delete/:albumId',authMiddleWare.requirelogin,albumController.delete)

module.exports=router