import { GET_PDF } from "./actionType";
import { GET_PDF_SUCCESS } from "./actionType";
import { GET_PDF_FAILED } from "./actionType";
import { CREATE_PDF } from "./actionType";
import { CREATE_PDF_SUCCESS } from "./actionType";
import { CREATE_PDF_FAILED } from "./actionType";



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


export const CREATE_PDF_ACTION = (data) => {
    return {
        type : CREATE_PDF,
        data : data
    }
}


export const CREATE_PDF_SUCCESS_ACTION = (data) => {
    console.log('the data is ',data)
    return {
        type : CREATE_PDF_SUCCESS,
        data : data
    }
}


export const CREATE_PDF_FAILED_ACTION = (data) => {
    return {
        type : CREATE_PDF_FAILED,
        data : data
    }
}

