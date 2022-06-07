import { LOGIN_USER, ME_USER_FAILED, ME_USER_SUCCESS } from "./actionType";
import { LOGIN_USER_SUCCESS } from "./actionType";
import { LOGIN_USER_FAILED } from "./actionType";
import { REGISTER_USER } from "./actionType";
import { REGISTER_USER_SUCCESS } from "./actionType";
import { REGISTER_USER_FAILED } from "./actionType";
import {GOOGLE_AUTHENTICATE} from './actionType';
import { GOOGLE_AUTHENTICATE_SUCCESS } from "./actionType";
import { GOOGLE_AUTHENTICATE_FAILED } from "./actionType";
import { DELETE_USER_ACCOUNT } from "./actionType";
import { DELETE_USER_ACCOUNT_SUCCESS } from "./actionType";
import { DELETE_USER_ACCOUNT_FAILED } from "./actionType";
import { ME_USER } from "./actionType";
import { Notify } from "../../config/Notify/Notify";

export const ME_USER_ACTION = () => {
    return {
        type : ME_USER
    }
}
export const ME_USER_SUCCESS_ACTION = (data) => {       
    return {
        type : ME_USER_SUCCESS,
        data : data
    }
}
export const ME_USER_FAILED_ACTION = (data) => {
    return {
        type : ME_USER_FAILED,
        data : data
    }
}
export const LOGIN_USER_ACTION = (data) => {   
    return {
        type : LOGIN_USER,
        data : data
    }
}
export const LOGIN_USER_SUCCESS_ACTION = (data) => {
    Notify({type : 'success' , description : `Logged in SuccessFully as ${data.email}`})
    return {
        type : LOGIN_USER_SUCCESS,
        data : data
    }
}
export const LOGIN_USER_FAILED_ACTION = (error) => {
    Notify({type : "error" , description : error.response.data , placement : 'topRight' , statusCode : error.response.status })    
    return {
        type : LOGIN_USER_FAILED,
        data : error
    }
}
export const REGISTER_USER_ACTION = (data) => {      
    return {
        type : REGISTER_USER,
        data : data
    }
}
export const REGISTER_USER_SUCCESS_ACTION = (data) => {    
    Notify({type : 'success' , description : `Register Account SuccessFully as ${data.email}`})
    localStorage.setItem(process.env.REACT_APP_AUTHORIZATION_TOKEN,data.authorization_token)
    return {
        type : REGISTER_USER_SUCCESS,
        data : data
    }
}
export const REGISTER_USER_FAILED_ACTION = (error) => {    
    Notify({type : "error" , description : error.response.data , placement : 'topRight' , statusCode : error.response.status })    
    return {
        type : REGISTER_USER_FAILED,
        data : error
    }
}
export const GOOGLE_AUTHENTICATE_ACTION = (data) => {
    return {
        type : GOOGLE_AUTHENTICATE,
        data : data
    }
}
export const GOOGLE_AUTHENTICATE_SUCCESS_ACTION = (data) => {
    Notify({type : 'success' , description : `Successfully join as ${data.email}`})
    return {
        type : GOOGLE_AUTHENTICATE_SUCCESS,
        data : data
    }
}
export const GOOGLE_AUTHENTICATE_FAILED_ACTION = (data) => {
    return {
        type : GOOGLE_AUTHENTICATE_FAILED,
        data : data
    }
}
export const DELETE_USER_ACCOUNT_ACTION = (data) => {
    return {
        type : DELETE_USER_ACCOUNT,
        data : data
    }
}
export const DELETE_USER_ACCOUNT_SUCCESS_ACTION = (data) => {
    Notify({type : 'success' , description : `Account delete as ${data.email}`})
    return {
        type : DELETE_USER_ACCOUNT_SUCCESS,
        data : data
    }
}
export const DELETE_USER_ACCOUNT_FAILED_ACTION = (error) => {
    Notify({type : "error" , description : error.response.data , placement : 'topRight' , statusCode : error.response.status })    
    return {
        type : DELETE_USER_ACCOUNT_FAILED,
        data : error
    }
}