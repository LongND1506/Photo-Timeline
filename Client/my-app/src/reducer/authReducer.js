
import * as types from '../constants'
const initialState={
    islogin:false
}
const authReducer=(state=initialState,action)=>{
    switch (action.type) {
//Login
        case types.LOGIN_SUCCESS:
            return {...state,islogin:true}
//Log out
        case types.LOG_OUT_SUCCESS:
            return {...state,
                islogin:false
            }
//Token expired
        case types.TOKEN_EXPIRED:
            return{
                ...state,islogin:false
            }
//Persist login state if token is valid
        case types.PERSIST_LOGIN_STATE:
            return{
                ...state,islogin:true
            }
        default:
            return state
            break;
    }
}
export default authReducer