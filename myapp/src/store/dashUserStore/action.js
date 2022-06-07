import { GET_USERS_SUCCESS , GET_USERS_FAILED , GET_USERS, DELETE_PDF_ACCESS, DELETE_PDF_ACCESS_FAILED, DELETE_PDF_ACCESS_SUCCESS, CREATE_USER_ACCESS_PDF, CREATE_USER_ACCESS_PDF_SUCCESS, CREATE_USER_ACCESS_PDF_FAILED, CREATE_NEW_DASH_USER, CREATE_NEW_DASH_USER_SUCCESS, CREATE_NEW_DASH_USER_FAILED, DELETE_USER_TOKEN, DELETE_USER_TOKEN_SUCCESS, DELETE_USER_TOKEN_FAILED, BLOCK_USER, BLOCK_USER_SUCCESS, BLOCK_USER_FAILED, GET_BLOCK_USER, GET_BLOCK_USER_SUCCESS, GET_BLOCK_USER_FAILED, UNBLOCK_USER, UNBLOCK_USER_SUCCESS, UNBLOCK_USER_FAILED, UPDATE_EXTRA_INFO_USER, UPDATE_EXTRA_INFO_USER_SUCCESS } from "./actionType";
import { Notify } from "../../config/Notify/Notify";

export const GET_USERS_ACTION = (data) => {    
    return {
        type : GET_USERS,
        data : data
    }
}
export const GET_USERS_SUCCESS_ACTION = (data) => {    
    Notify({type : 'success' , description : `Load ${data.users.length} users ${data.users.length===0 ? 'and no more users available' : ''} `})        
    return {
        type : GET_USERS_SUCCESS,
        data : data
    }
}
export const GET_USERS_FAILED_ACTION = (data) => {
    return {
        type : GET_USERS_FAILED,
        data : data
    }
}
export const DELETE_PDF_ACCESS_ACTION = (data) => {
    return{
        type : DELETE_PDF_ACCESS,
        data : data
    }
}
export const DELETE_PDF_ACCESS_SUCCESS_ACTION = (data) => {
    return {
        type : DELETE_PDF_ACCESS_SUCCESS,
        data : data
    }
}
export const DELETE_PDF_ACCESS_FAILED_ACTION = (data) => {
    return {
        type : DELETE_PDF_ACCESS_FAILED,
        data : data
    }
}
export const CREATE_USER_ACCESS_PDF_ACTION = (data) => {
    return {
        type : CREATE_USER_ACCESS_PDF,
        data : data
    }
}
export const CREATE_USER_ACCESS_PDF_SUCCESS_ACTION = (data) => {
    return {
        type : CREATE_USER_ACCESS_PDF_SUCCESS,
        data : data
    }
}
export const CREATE_USER_ACCESS_PDF_FAILED_ACTION = (data) => {
    return {
        type : CREATE_USER_ACCESS_PDF_FAILED,
        data : data
    }
}
export const CREATE_NEW_DASH_USER_ACTION = (data) => {
    return {
        type :CREATE_NEW_DASH_USER,
        data : data
    }
}
export const CREATE_NEW_DASH_USER_SUCCESS_ACTION = (data) => {
    return {
        type : CREATE_NEW_DASH_USER_SUCCESS,
        data : data
    }
}
export const CREATE_NEW_DASH_USER_FAILED_ACTION = (data) => {
    return {
        type : CREATE_NEW_DASH_USER_FAILED,
        data : data
    }
}
export const DELETE_USER_TOKEN_ACTION = (data) => {
    return {
        type :DELETE_USER_TOKEN,
        data : data
    }
}
export const DELETE_USER_TOKEN_SUCCESS_TOKEN = (data) => {
    return {
        type : DELETE_USER_TOKEN_SUCCESS,
        data : data
    }
}
export const DELETE_USER_TOKEN_FAILED_ACTION = (data) => {
    return {
        type : DELETE_USER_TOKEN_FAILED,
        data : data
    }
}
export const BLOCK_USER_ACTION = (data) => {
    return {
        type : BLOCK_USER,
        data : data
    }
}
export const BLOCK_USER_SUCCESS_ACTION = (data) => {
    Notify({type : 'success' , message :'BLOCK SUCCESS' , description : `${data.responseData.email} user account has been blocked`})     
    return {
        type : BLOCK_USER_SUCCESS,
        data : data
    }
}
export const BLOCK_USER_FAILED_ACTION = (error) => {
    Notify({type : 'error' , message :'BLOCK FAILED' , description : error.message})
    return {
        type : BLOCK_USER_FAILED,
        data : error
    }
}
export const UNBLOCK_USER_ACTION = (data) => {    
    return {
        type : UNBLOCK_USER,
        data : data
    }
}
export const UNBLOCK_USER_SUCCESS_ACTION = (data) => {
    Notify({type : 'success' , message :'UNBLOCK SUCCESS' , description : `${data.email} user account has been unblocked`})
    return {
        type : UNBLOCK_USER_SUCCESS,
        data : data
    }
}
export const UNBLOCK_USER_FAILED_ACTION = (error) => {
    Notify({type : 'error' , message :'UNBLOCK FAILED' , description : error.message})
    return {
        type : UNBLOCK_USER_FAILED,
        data : error
    }
}
export const GET_BLOCK_USER_ACTION = (data) => {
    return {
        type : GET_BLOCK_USER,
        data : data
    }
}
export const GET_BLOCK_USER_SUCCESS_ACTION = (data) => {
    return {
        type : GET_BLOCK_USER_SUCCESS,
        data : data
    }
}
export const GET_BLOCK_USER_FAILED_ACTION = (data) => {
    return {
        type : GET_BLOCK_USER_FAILED,
        data : data
    }
}
export const UPDATE_EXTRA_INFO_USER_ACTION = (data) => {
    return {
        type : UPDATE_EXTRA_INFO_USER,
        data : data
    }
}
export const UPDATE_EXTRA_INFO_USER_SUCCESS_ACTION = (data) => {
    return {
        type : UPDATE_EXTRA_INFO_USER_SUCCESS,
        data : data
    }
}
