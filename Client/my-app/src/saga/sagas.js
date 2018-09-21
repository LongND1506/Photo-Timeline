import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import * as actions from '../actions/index'
import * as types from '../constants'
import {callApi} from './callAPI'
import {Notifi} from '../components/subcomponents/Notification'
import jwt from 'jsonwebtoken'

const URL='http://localhost:8000/'
var userId=''
if(localStorage.getItem('token')){
  userId=jwt.decode(localStorage.getItem('token')).user._id
}
//
function delay(ms,result=ms){
  return new Promise((resolve,reject)=>{
    setTimeout(()=>resolve(result),ms)
  })
}

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
//LOGIN
function* login(action) {
   try {
    let body={
      email:action.payload.email,
      password:action.payload.password
    }
    let res= yield call(callApi,URL+'auth/login','POST',body)
    yield call(delay,1000)
    if(res.token)
     {
        localStorage.setItem('token',res.token)
        yield put(actions.loginSuccess())
        yield call(Notifi.success,'Login success')
        
     }
    else
      {
        yield put(actions.loginFailed())
        yield call(Notifi.error,res.message)
      }      
   } catch (e) {
      yield put(actions.loginFailed())
      yield call(Notifi.error,e.toString())
      console.log(e)
   } 
}
//SIGN UP
function* signup(action){
  try {
    let body=action.payload
    let res=yield call(callApi,URL+'auth/register','POST',body)
    if(res.code=='200')
      {
        yield put(actions.signupSuccess())
        yield call(Notifi.success,res.message)
      }
    else{
        yield put(actions.signupFailed())
        yield call(Notifi.error,res.message)
    }    
  } catch (e) {
    yield put(actions.signupFailed())
    yield call(Notifi.error,e.toString())

  }
}

//Log out
function* logout(action){
  try {
    let res=yield call(callApi,URL+'auth/logout',"GET")
    yield call(delay,1000)
    if(res.code==200){
      localStorage.removeItem('token')
      yield put(actions.logoutSuccess())
      yield call(Notifi.success,res.message)
    }
    else{
      yield put(actions.logoutFailed())
      yield call(Notifi.error,res.message)
    }
  } catch (e) {
    yield put(actions.logoutFailed())
    yield call(Notifi.error,e.toString())
  }
}
//Get album
function* getalbum(action){
  try {
    let userId=jwt.decode(localStorage.getItem('token')).user._id
    let res=yield call(callApi,URL+'album/'+userId,"GET")
    if(res.code==200){
      yield put(actions.getAlbumSuccess(res.albums))
      // yield call(Notifi.success,res.message)
    }
    else{
      yield put(actions.getAlbumFailed)
      yield call(Notifi.error,res.message)
    }
  } catch (e) {
    yield put(actions.getAlbumFailed)
    yield call(Notifi.error,e.toString())
  }
}

//upload
function* upload(action){
    try {
      let files=Array.from(action.payload.files)
      let formData = new FormData();
      formData.append('title',action.payload.title)
      formData.append('description',action.payload.description)
      files.forEach(item=>{
        formData.append('image',item )
      })
      let res= yield call(fetch,URL+'album/upload/'+userId,{
        headers:{
          "Access-Control-Request-Headers":"",
          "Authorization":localStorage.getItem('token')
        },
          method:"POST",
          body:formData
        })
      let respone= yield res.json().then(result=>result)
      if(respone.code==200)
        {
          yield put(actions.uploadSuccess())
          yield call(Notifi.success,respone.message)
        }
      else{
        yield put(actions.uploadFailed())
        yield call(Notifi.error,respone.message)
      }

    } catch (e) {
      yield put(actions.uploadFailed())
      yield call(Notifi.error,e.toString())
    }
  // console.log(action.payload)
}
//Edit album
function* editalbum(action){
  try {
    let albumId=action.payload.albumId
    let body={
      title:action.payload.title,
      description:action.payload.description
    }
    let res=yield call(callApi,URL+'album/update/'+albumId,'POST',body)
    if(res.code==200){
      yield call(Notifi.success,res.message)
      yield put(actions.getAlbum(userId))
    }
    else
      yield call(Notifi.error,res.message)
  } catch (e) {
    yield call(Notifi.error,e.toString())
  }
}
//Add image to album
function* addimage(action){
  try {
    let albumId=action.payload.albumId
    let files=Array.from(action.payload.files)
    let formData=new FormData()
    files.forEach(item=>{
      formData.append('image',item )
    })
    let res= yield call(fetch,URL+'album/addimage/'+userId+'/'+albumId,{
      headers:{
        "Access-Control-Request-Headers":"",
        "Authorization":localStorage.getItem('token')
      },
        method:"POST",
        body:formData
      })
      let respone=yield res.json().then(result=>result)
        if(respone.code==200){
          yield call(Notifi.success,respone.message)
          yield put(actions.getAlbum(userId))
        }
        else
          yield call(Notifi.error,respone.message)
  } catch (e) {
      yield call(Notifi.error,e.toString())
  }
}
//Delete an image on album
function* deleteimage(action){
  try {
    let imageSrc=action.payload.imageSrc
    let linkToDelete=imageSrc.replace('images','album/deleteimage')
    let res=yield call(callApi,linkToDelete,'DELETE')
    if(res.code==200){
      yield put(actions.getAlbum(userId))
      yield call(Notifi.success,res.message)
    }
    else
      yield call(Notifi.error,res.message)
  } catch (e) {
      yield call(Notifi.error,e.toString())
  }
}
//Delete Album
function* deletealbum(action){
  try {
    let albumId=action.payload
  let res=yield call(callApi,URL+'album/delete/'+albumId,'DELETE')
  if(res.code==200){
    yield call(Notifi.success,res.message)
    yield put(actions.getAlbum(userId))
  }
  else
    yield call(Notifi.error,res.message)
  } catch (e) {
    yield call(Notifi.error,e.toString())
  }  
}
//Change password 
function* changepassword(action){
  try {
    let res=yield call(callApi,URL+"user/changepassword",'POST',action.payload)
    yield call(delay,1000)
    if(res.code==200){
      yield put(actions.changePasswordSuccess())
      yield call(Notifi.success,res.message)
    }
    else{
      yield put(actions.changePasswordFailed())
      yield call(Notifi.error,res.message)
    } 
    
  } catch (e) {
    yield put(actions.changePasswordFailed())
    yield call(Notifi.error,e.toString())
  }
}
//token expired notify
function* tokenexpired(action){
  localStorage.removeItem('token')
  yield call(Notifi.error,'Token has expired !')
}

function* mySaga() {
  yield takeLatest(types.LOGIN, login)
  yield takeLatest(types.SIGN_UP, signup)
  yield takeLatest(types.LOG_OUT,logout)
  yield takeEvery(types.UPLOAD,upload)
  yield takeEvery(types.CHANGE_PASSWORD,changepassword)
  yield takeEvery(types.TOKEN_EXPIRED,tokenexpired)
  yield takeEvery(types.GET_ALBUM,getalbum)
  yield takeEvery(types.DELETE_ALBUM,deletealbum)
  yield takeEvery(types.EDIT_ALBUM,editalbum)
  yield takeEvery(types.ADD_IMAGE,addimage)
  yield takeEvery(types.DELETE_IMAGE,deleteimage)
}

export default mySaga;