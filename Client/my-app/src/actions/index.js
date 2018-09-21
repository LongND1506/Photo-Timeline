import * as types from '../constants'

//Login
 export const login=data=>({type:types.LOGIN,payload:data})
 export const loginSuccess=()=>({type:types.LOGIN_SUCCESS})
 export const loginFailed=()=>({type:types.LOGIN_FAILED})
//Sigup
export const signup=data=>({type:types.SIGN_UP,payload:data})
export const signupSuccess=()=>({type:types.SIGN_UP_SUCCESS})
export const signupFailed=()=>({type:types.SIGN_UP_FAILED})
//Log out
export const logout=data=>({type:types.LOG_OUT,payload:data})
export const logoutSuccess=()=>({type:types.LOG_OUT_SUCCESS})
export const logoutFailed=()=>({type:types.LOG_OUT_FAILED})
//Get user info
export const getAlbum=()=>({type:types.GET_ALBUM})
export const getAlbumSuccess=(data)=>({type:types.GET_ALBUM_SUCCESS,payload:data})
export const getAlbumFailed=()=>({type:types.GET_ALBUM_FAILED})
//Change Password
export const changePassword=data=>({type:types.CHANGE_PASSWORD,payload:data})
export const changePasswordSuccess=()=>({type:types.CHANGE_PASSWORD_SUCCESS})
export const changePasswordFailed =()=>({type:types.CHANGE_PASSWORD_FAILED})
//Upload Album
export const upload=data=>({type:types.UPLOAD,payload:data})
export const uploadSuccess=()=>({type:types.UPLOAD_SUCCESS})
export const uploadFailed=()=>({type:types.UPLOAD_FAILED})
//Edit Album
export const editAlbum=data=>({type:types.EDIT_ALBUM,payload:data})
export const editAlbumSuccess=()=>({type:types.EDIT_ALBUM_SUCCESS})
export const editAlbumFailed=()=>({type:types.EDIT_ALBUM_FAILED})
//Add image to album
export const addImage=data=>({type:types.ADD_IMAGE,payload:data})
export const addImageSuccess=()=>({type:types.ADD_IMAGE_SUCCESS})
export const addImageFailed=()=>({type:types.ADD_IMAGE_FAILED})
//Delete an image on album
export const deleteImage=data=>({type:types.DELETE_IMAGE,payload:data})
export const deleteImageSuccess=()=>({type:types.DELETE_IMAGE_SUCCESS})
export const deleteImageFailed=()=>({type:types.DELETE_IMAGE_FAILED})
//Delete Album
export const deleteAlbum=data=>({type:types.DELETE_ALBUM,payload:data})
export const deleteAlbumSuccess=()=>({type:types.DELETE_ALBUM_SUCCESS})
export const deleteAlbumFailed=()=>({type:types.DELETE_ALBUM_FAILED})
//Get User info
//if Token expired 
export const  tokenExpired=()=>({type:types.TOKEN_EXPIRED})
//Persist login state if token is valid 
export const  persistLoginState=()=>({type:types.PERSIST_LOGIN_STATE})
