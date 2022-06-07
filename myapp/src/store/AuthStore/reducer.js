import { GOOGLE_AUTHENTICATE_FAILED, GOOGLE_AUTHENTICATE_SUCCESS, LOGIN_USER_SUCCESS, ME_USER_SUCCESS , ME_USER_FAILED } from "./actionType";
import { LOGIN_USER_FAILED } from "./actionType";
import { REGISTER_USER_SUCCESS } from "./actionType";
import { REGISTER_USER_FAILED } from "./actionType";
import { DELETE_USER_ACCOUNT_FAILED } from "./actionType";
import { DELETE_USER_ACCOUNT_SUCCESS } from "./actionType";


const initialState = {
    user : null,
    error : null,
    loading : false
}
const AuthReducer = (state=initialState,action) => {        
    switch(action.type)
    {
        case DELETE_USER_ACCOUNT_SUCCESS:
            return {
                ...state,
                user : null,
                loading :false,
                error:null                
            }
        case DELETE_USER_ACCOUNT_FAILED:
            return {
                ...state,
                user : state.user,
                loading:false,
                error : action.data
            }
        case ME_USER_SUCCESS:
            return {
                ...state,
                user : action.data,
                loading:false,
                error : null
            }        
        case ME_USER_FAILED: 
        return {
            ...state,
            user : null,
            loading : false,
            error : action.data
        }
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                user : action.data,
                loading : false                
            }
        case LOGIN_USER_FAILED:
            return {
                ...state,
                user : null,
                loading : false
            }
        case REGISTER_USER_SUCCESS:
                return {
                    ...state,
                    user : action.data,
                    loading : false                
                }
        case REGISTER_USER_FAILED:
                return {
                    ...state,
                    user : null,
                    loading : false
                }
        case GOOGLE_AUTHENTICATE_SUCCESS:
            return {
                ...state,
                user : action.data,
                loading : false
            }
        case GOOGLE_AUTHENTICATE_FAILED:
            return {
                ...state,
                user : null,
                loading : false
            }        
        default:
            return state;
    }
}
export default AuthReducer;