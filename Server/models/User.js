const mongoose=require('mongoose')
const Schema=mongoose.Schema
// const db=require('../utils/db')
//User Schema
var userSchema=new Schema({
    name:{type:String,required:true,unique:true},
    albums:[{type:mongoose.Schema.Types.ObjectId,ref:'Album'}],
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    active:{type:Boolean,default:false},
    role:{type:String,required:true,default:'User'},
    dateAdded:{type:Date,default:new Date()}
},{collection:"User"})

const User=mongoose.model('User',userSchema)
//Auto increase user ID
// autoIncrement.initialize(mongoose.connection);
// userSchema.plugin(autoIncrement.plugin, { model: 'User', field: 'userID' });

module.exports= User;