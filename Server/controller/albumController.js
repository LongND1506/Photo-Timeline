var User=require('../models/User')
var JWT=require('../controller/config/jwt')
var albumCode=require('./code/album')
var Album=require('../models/Album')
var fs=require('fs-extra')
var mkdirp = require('mkdirp');
const URL='http://localhost:8000/images/'
module.exports={
//Get an album of user with album id 
    getalbum:(req,res)=>{
        if(req.params.albumId&&req.params.userId){
            let userId=req.params.userId
            let albumId=req.params.albumId
            Album.findOne({_id:albumId,userId:userId},(err,doc)=>{
                if(err)
                    return res.json({Error:err})
                if(doc)
                    return res.json(Object.assign(albumCode.GET.SUCCESS,{album:doc}))
            })
        }
    },
//Get all album of user with user id
    getallalbum:(req,res)=>{
        if(req.params.userId){
            let userId=req.params.userId
            Album.find({userId:userId}).exec((err,docs)=>{
                if(err)
                    return res.json({Error:err})
                if(docs)
                    return res.json(Object.assign(albumCode.GET.SUCCESS,{albums:docs}))
            })
        }
    },
//Upload an album
    upload: async (req,res,next)=>{
        let userId=req.params.userId
        let images_url= new Array()
        if(!req.files){
            return res.json(albumCode.UPLOAD.FAILED.FILE_EMPTY)
        }
        let files=req.files.image
        if(!Array.isArray(files))
            files=[files]
        if(!files.every((element)=>{return element.name.match(/.(jpg|jpeg|png|gif)$/i)}))
            return res.json(albumCode.UPLOAD.FAILED.INVALID_FILE_FORMAT)
        else{
                //Create album model after save file 
                let album=new Album({
                    title:req.body.title,
                    description:req.body.description,
                    userId:userId,
                    imagesUrl:[]
                })
                Album.create(album,(err,document)=>{
                    if(err)
                        res.json({Error:err})
                    if(document){
                        let upload_folder='./public/images/'+userId+'/'+document._id
                        if(!fs.existsSync(upload_folder)){
                            mkdirp.sync(upload_folder)
                        }
                        let upload_mutiple=new Promise(async(resolve,reject)=>{
                            for(let i=0;i<=files.length;i++){
                                if(i===files.length)
                                    resolve(images_url)
                                else{              
                                        let save_file=new Promise((resolve,reject)=>{
                                            files[i].mv(upload_folder+'/'+files[i].name,(err)=>{
                                            if(err)
                                                reject(err)
                                            else
                                            {
                                                resolve(files[i].name) 
                                            }
                                            })
                                        }).then(file_name=>images_url.push(URL+userId+'/'+document._id+'/'+file_name))
                                        await save_file.then().catch(err=>res.json({Error:err}))
                                    }
                            }
                            resolve(images_url)
                        })
                        upload_mutiple.then((result)=>{
                            Album.findByIdAndUpdate(document._id,{$set:{imagesUrl:result}},(err)=>{
                                if(err)
                                    return res.json({Error:err})
                                else
                                    return res.json(albumCode.UPLOAD.SUCCESS)
                            })
                        }).catch(err=>res.json({Error:err}))
                    // console.log(userId)
                    }
                })  
        }
    },
//Update title and description an album 
    update:(req,res)=>{
        let albumId=req.params.albumId
        //update title and description
        if(req.body.title||req.body.description){
            let title=req.body.title
            let description=req.body.description
            Album.findByIdAndUpdate(albumId,{$set:{title:title,description:description}})
            .exec((err,doc)=>{
                if(err)
                    return res.json({Error:err})
                if(doc)
                    return res.json(albumCode.UPDATE.SUCCESS)
                else
                    return res.json(albumCode.UPDATE.FAILED)
            })
          
        }

    },
//Add image to album
    addimage:(req,res)=>{
        let albumId=req.params.albumId
        let userId=req.params.userId
        let upload_folder='./public/images/'+userId+'/'+albumId
        var images_url= new Array()
        if(!fs.existsSync(upload_folder)){
            return res.json(albumCode.ADD_IMAGE.FAILED.NOT_FOUND)
        }
        if(!req.files)
            return res.json(albumCode.ADD_IMAGE.FAILED.FILE_EMPTY)
        if(req.files.image){
            let files=req.files.image
            if(!Array.isArray(files))
                files=[files]
            let upload_mutiple=new Promise(async(resolve,reject)=>{
                            for(let i=0;i<=files.length;i++){
                                if(i===files.length)
                                    resolve(images_url)
                                else{              
                                        let save_file=new Promise((resolve,reject)=>{
                                            files[i].mv(upload_folder+'/'+files[i].name,(err)=>{
                                            if(err)
                                                reject(err)
                                            else
                                            {
                                                resolve(files[i].name) 
                                            }
                                            })
                                        }).then(file_name=>images_url.push(URL+userId+'/'+albumId+'/'+file_name))
                                        await save_file.then().catch(err=>res.json({Error:err}))
                                    }
                            }
                            resolve(images_url)
                        })
            upload_mutiple.then(result=>{
                Album.findByIdAndUpdate(albumId,{$push:{imagesUrl:result}},(err)=>{
                    if(err)
                        return res.json({Error:err})
                    else
                        return res.json(albumCode.UPLOAD.SUCCESS)
                })
            }).catch(err=>res.json({Error:err}))
        }

    },
//Delete image on album
    deleteimage:(req,res)=>{
        let albumId=req.params.albumId
        let userId=req.params.userId
        let imageName=req.params.imageName
        let image_url=URL+userId+'/'+albumId+'/'+imageName
        Album.findByIdAndUpdate(albumId,{$pull:{imagesUrl:{$in:[image_url]}}},(err,doc)=>{
            if(err)
                return res.json({Error:err})
            if(!doc)
                return res.json(albumCode.DELETE_IMAGE.FAILED.NOT_FOUND)
            else{
                fs.removeSync('public/images/'+userId+'/'+albumId+'/'+imageName)
                return res.json(albumCode.DELETE_IMAGE.SUCCESS)
            }
        })
    },
//Delete an album
    delete:  (req,res)=>{
        let albumId=req.params.albumId
        Album.findByIdAndRemove(albumId, (err,result)=>{
            if(err)
                return res.json({Error:err})
            if(!result)
                return res.json(albumCode.DELETE.FAILED)
            else
                {   
                    fs.remove('public/images/'+result.userId+'/'+result._id,err=>{
                        if(err)
                            return res.json({Error:err})
                        else{
                            return res.json(albumCode.DELETE.SUCCESS)
                        }
                    })
                }
        })
    }
}