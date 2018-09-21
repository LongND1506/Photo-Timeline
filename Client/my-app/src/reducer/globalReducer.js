import * as types from '../constants'
const onaction=[types.LOGIN,types.SIGN_UP,types.LOG_OUT,types.UPLOAD,types.CHANGE_PASSWORD]
const offaction=[types.LOGIN_SUCCESS,types.LOGIN_FAILED,types.SIGN_UP_SUCCESS,types.SIGN_UP_FAILED,
types.UPLOAD_SUCCESS,types.UPLOAD_FAILED,types.CHANGE_PASSWORD_SUCCESS,types.CHANGE_PASSWORD_FAILED,
types.TOKEN_EXPIRED]
function loading(actiontype,arr){
   for(var i=0;i<arr.length;i++)
   {
       if(arr[i]==actiontype)
           return 1
   }
   return 0
}

const initialState={loading:false}
const globalReducer=(state=initialState,action)=>{
    if(loading(action.type,onaction)){
        return{
            ...state,
            loading:true
        }
    }
    else
        return {
            ...state,
            loading:false
        }
    return state
}
export default globalReducer