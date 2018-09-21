import * as types from '../constants'
var initialState={
    fetching_data:false,
    user_data:{albums:[]}
}
const userReducer=(state=initialState,action)=>{
    switch (action.type) {
        case types.GET_ALBUM:
            return{
                ...state,
                fetching_data:true
            }
        case types.GET_ALBUM_SUCCESS:
            return{
                fetching_data:false,
                user_data:{albums:action.payload}
            }
        default:
            return state
            break;
    }
}
export default userReducer