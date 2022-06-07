import { Notify } from "../../../config/Notify/Notify";
import { DELETE_BLOG_COMMENT_FAILED, GET_BLOG } from "./actionType";
import { GET_BLOG_SUCCESS } from "./actionType";
import { GET_BLOG_FAILED } from "./actionType";
import { CREATE_BLOG } from "./actionType";
import { CREATE_BLOG_SUCCESS } from "./actionType";
import { CREATE_BLOG_FAILED } from "./actionType";
import { DELETE_BLOG_COMMENT } from "./actionType";
import { DELETE_BLOG_COMMENT_SUCCESS } from "./actionType";


export const GET_BLOG_ACTION = (page) => 
{
    return {
        type : GET_BLOG,
        data : page        
    }
}

export const GET_BLOG_SUCCESS_ACTION = (data) => {

    return {
        type : GET_BLOG_SUCCESS,
        data : data 
    }
}



export const GET_BLOG_FAILED_ACTION = (error) => {
    return {
        type : GET_BLOG_FAILED,
        data : error
    }
}

export const CREATE_BLOG_ACTION = (data) => {
    return {
        type : CREATE_BLOG,
        data : data
    }
}


export const CREATE_BLOG_SUCCESS_ACTION = (data) => {

    return {
        type : CREATE_BLOG_SUCCESS,
        data : data
    }
}

export const CREATE_BLOG_FAILED_ACTION = (data) => {
    return {
        type : CREATE_BLOG_FAILED,
        data : data
    }
}

export const DELETE_BLOG_COMMENT_ACTION = (data) => {
    return {
        type : DELETE_BLOG_COMMENT,
        data : data
    }
}


export const DELETE_BLOG_COMMENT_SUCCESS_ACTION = (data) => {
    Notify({type : 'success' , 'message':'SuccessFully Delete'})
    return {
        type : DELETE_BLOG_COMMENT_SUCCESS,
        data : data
    }
}

export const DELETE_BLOG_COMMENT_FAILED_ACTION = (data) => {
    return {
        type : DELETE_BLOG_COMMENT_FAILED,
        data : data
    }
}