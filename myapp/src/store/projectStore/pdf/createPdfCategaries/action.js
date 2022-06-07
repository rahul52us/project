import { Notify } from "../../../../config/Notify/Notify";
import { CREATE_PDF_CATEGARY } from "./actionType";
import { CREATE_PDF_CATEGARY_SUCCESS } from "./actionType";
import { CREATE_PDF_CATEGARY_FAILED } from "./actionType";
import { FETCH_ALL_PDF_CATEGARIES } from "./actionType";
import { FETCH_ALL_PDF_CATEGARIES_SUCCESS } from "./actionType";
import { FETCH_ALL_PDF_CATEGARIES_FAILED } from "./actionType";

const CREATE_PDF_CATEGARY_ACTION = (data) => {
    return {
        type : CREATE_PDF_CATEGARY,
        data : data
    }
}

const CREATE_PDF_CATEGARY_SUCCESS_ACTION = (data) => {    
    Notify({type : 'success' , message : 'SUCCESSFULLY PDF CREATED !' , description : `${data.title} categary has been created !`})        
    return {
        type : CREATE_PDF_CATEGARY_SUCCESS,
        data : data
    }
}
const CREATE_PDF_CATEGARY_FAILED_ACTION = (error) => {    
    Notify({type : "error" , description : error.response.data.errorMessage })    
    return {
        type : CREATE_PDF_CATEGARY_FAILED,
        data : error
    }
}
const FETCH_ALL_PDF_CATEGARIES_ACTION = () => 
{        
    return {
        type : FETCH_ALL_PDF_CATEGARIES
    }
}
const FETCH_ALL_PDF_CATEGARIES_SUCCESS_ACTION = (data) => {
    return {
        type : FETCH_ALL_PDF_CATEGARIES_SUCCESS,
        data : data
    }
}
const FETCH_ALL_PDF_CATEGARIES_FAILED_ACTION = (data) => {
    return {
        type : FETCH_ALL_PDF_CATEGARIES_FAILED,
        data : data
    }
}


export  {CREATE_PDF_CATEGARY_ACTION , CREATE_PDF_CATEGARY_SUCCESS_ACTION , CREATE_PDF_CATEGARY_FAILED_ACTION ,FETCH_ALL_PDF_CATEGARIES_ACTION , FETCH_ALL_PDF_CATEGARIES_SUCCESS_ACTION , FETCH_ALL_PDF_CATEGARIES_FAILED_ACTION };