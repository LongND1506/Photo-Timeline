import { combineReducers } from 'redux'
import authReducer from './authReducer'
import userReducer from './userReducer'
import globalReducer from './globalReducer'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const authPersistConfig={
    key:'auth',
    storage:storage,
    blacklist:['islogin']
}
export const initialState={
    islogin:false,
    loading:false
}
export default combineReducers({
    global:globalReducer,
    auth:authReducer,
    user:userReducer
})