const mongoose=require('mongoose')
const Schema=mongoose.Schema

const albumSchema=new Schema({
    title:{type:String},
    description:{type:String},
    imagesUrl:{type:Array},
    userId:{type:mongoose.Schema.Types.ObjectId,required:true},
    dateAdded:{type:Date,default:new Date()}

},{collection:"Album"})
 const Album=mongoose.model('Album',albumSchema)
 module.exports=Album