var mongoose=require('mongoose')
// var gridfs=require('gridfs-stream')
const URI='mongodb://localhost:27017/Authentication'
const con=mongoose.connect(URI,(err)=>{
    if(err)
        console.log("Error : "+err)
    else
        console.log("Connect to database success")
})
//Init gfs
// let gfs;
// mongoose.connection.once('open',()=>{
//     //Init stream
//     gfs=gridfs(mongoose.connection.db,mongoose.mongo)
//     gfs.collection('uploads')
// })
module.exports=con