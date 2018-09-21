const express= require('express')
const app=express()
const BodyParser=require('body-parser')
const db=require('./utils/db')
var index=require('./routers/indexRoute')
var methodOverride=require('method-override')
var path = require('path');
var cor=require('cors')
const fileUpload = require('express-fileupload');
app.use(BodyParser.json())
app.use(BodyParser.urlencoded({ extended: true }));
app.use(fileUpload())
app.use( express.static(path.join(__dirname, 'public')));
app.use(cor())
app.use(methodOverride('_method'))
app.use('/',index)
app.listen(8000,()=>console.log('Server is running on port 8000'))