import { Notify } from "../../config/Notify/Notify";
import { DELETE_DASH_PDF, EDIT_PDF, EDIT_PDF_FAILED, EDIT_PDF_SUCCESS } from "./actionType";
import { DELETE_DASH_PDF_SUCCESS } from "./actionType";
import { DELETE_DASH_PDF_FAILED } from "./actionType";
import { CREATE_PDF } from "./actionType";
import { CREATE_PDF_SUCCESS } from "./actionType";
import { CREATE_PDF_FAILED } from "./actionType";
import { GET_PDF } from "./actionType";
import { GET_PDF_SUCCESS } from "./actionType";
import { GET_PDF_FAILED } from "./actionType";




export const GET_PDF_ACTION = (data) => 
{
    return {
        type : GET_PDF,
        data : data 
    }
}

export const GET_PDF_SUCCESS_ACTION = (data) => {

    return {
        type : GET_PDF_SUCCESS,
        data : data 
    }
}



export const GET_PDF_FAILED_ACTION = (error) => {
    return {
        type : GET_PDF_FAILED,
        data : error
    }
}

export const DELETE_DASH_PDF_ACTION = (data) => {
    return {
        type : DELETE_DASH_PDF,
        data : data
    }
}

export const DELETE_DASH_PDF_SUCCESS_ACTION = (data) => {    
    Notify({type : 'success' , message : 'SUCCESSFULLY PDF DELETED !' , description : `${data.responseData.title} pdf has been deleted for ${data.responseData.categary}`})    
    return {
        type : DELETE_DASH_PDF_SUCCESS,
        data : data
    }
}

export const DELETE_DASH_PDF_FAILED_ACTION = (data) => {    
    Notify({type : 'success' , message : 'SUCCESSFULLY PDF DELETED !' , description : `${data.title} pdf has been deleted for ${data.categary}`})    
    return {
        type : DELETE_DASH_PDF_FAILED,
        data : data
    }
}

export const CREATE_PDF_ACTION = (data) => {    
    return {
        type : CREATE_PDF,
        data : data
    }
}

export const CREATE_PDF_SUCCESS_ACTION = (data) => {
    Notify({type : 'success' , message : 'SUCCESSFULLY PDF CREATED !' , description : `${data.title} pdf has been created for ${data.categary}`})    
    return {
        type : CREATE_PDF_SUCCESS,
        data : data
    }
}


export const CREATE_PDF_FAILED_ACTION = (error) => {    Notify({type : "error" , description : error.response.data , placement : 'topRight' , statusCode : error.response.status })    
    return {
        type : CREATE_PDF_FAILED,
        data : error
    }
}

export const EDIT_PDF_ACTION = (data) =>
{
    return {
        type : EDIT_PDF,
        data : data
    }
}

export const EDIT_PDF_SUCCESS_ACTION = (data) => {
    return {
        type : EDIT_PDF_SUCCESS,
        data : data
    }
}

export const EDIT_PDF_FAILED_ACTION = (data) => {
    return {
        type : EDIT_PDF_FAILED,
        data : data
    }
}