import { Notify } from "../../config/Notify/Notify";
import { CREATE_FEES_CATEGARY_STUDENT, CREATE_FEES_CATEGARY_STUDENT_FAILED, CREATE_FEES_CATEGARY_STUDENT_SUCCESS, FETCH_CATEGARY_STUDENT, FETCH_CATEGARY_STUDENT_FAILED, FETCH_CATEGARY_STUDENT_SUCCESS, FETCH_STUDENT_SINGLE_FEES_DETAILS, FETCH_STUDENT_SINGLE_FEES_DETAILS_FAILED, FETCH_STUDENT_SINGLE_FEES_DETAILS_SUCCESS, UPDATE_FEES_CATEGARY_STUDENT, UPDATE_FEES_CATEGARY_STUDENT_FAILED, UPDATE_FEES_CATEGARY_STUDENT_SUCCESS } from "./actionType";

export const FETCH_CATEGARY_STUDENT_ACTION = (data) => {
    return {
        type : FETCH_CATEGARY_STUDENT,
        data : data
    }
}

export const FETCH_CATEGARY_STUDENT_SUCCESS_ACTION = (data) => {
    return {
        type : FETCH_CATEGARY_STUDENT_SUCCESS,
        data : data
    }
}

export const FETCH_CATEGARY_STUDENT_FAILED_ACTION = (error) => {
    return {
        type : FETCH_CATEGARY_STUDENT_FAILED,
        data : error
    }
}

export const CREATE_FEES_CATEGARY_STUDENT_ACTION = (data) => {
    return {
        type : CREATE_FEES_CATEGARY_STUDENT,
        data : data
    }
}

export const CREATE_FEES_CATEGARY_STUDENT_SUCCESS_ACTION = (data) => {
    Notify({type : "success" , description : "Fees details has been created successfully !" , placement : 'topRight' })        
    return {
        type : CREATE_FEES_CATEGARY_STUDENT_SUCCESS,
        data : data
    }
}

export const CREATE_FEES_CATEGARY_STUDENT_FAILED_ACTION = (error) => {    
    Notify({type : "error" , description : error.response.data , placement : 'topRight' , statusCode : error.response.status })        
    return {
        type : CREATE_FEES_CATEGARY_STUDENT_FAILED,
        data : error
    }
}

export const UPDATE_FEES_CATEGARY_STUDENT_ACTION = (data) => {
    return {
        type : UPDATE_FEES_CATEGARY_STUDENT,
        data : data
    }
}

export const UPDATE_FEES_CATEGARY_STUDENT_SUCCESS_ACTION = (data) => {
    return {
        type : UPDATE_FEES_CATEGARY_STUDENT_SUCCESS,
        data : data
    }
}

export const UPDATE_FEES_CATEGARY_STUDENT_FAILED_ACTION = (error) => {
    return {
        type : UPDATE_FEES_CATEGARY_STUDENT_FAILED,
        data : error
    }
}

export const FETCH_STUDENT_SINGLE_FEES_DETAILS_ACTION = (data) => {
    return {
        type : FETCH_STUDENT_SINGLE_FEES_DETAILS,
        data : data
    }
}

export const FETCH_STUDENT_SINGLE_FEES_DETAILS_SUCCESS_ACTION = (data) => {
    Notify({type : 'success' , message : 'LOADED SUCCESSFULLY'})
    return {
        type : FETCH_STUDENT_SINGLE_FEES_DETAILS_SUCCESS,
        data : data
    }
}
export const FETCH_STUDENT_SINGLE_FEES_DETAILS_FAILED_ACTION = (error) => {
    Notify({type : "error" , description : error.response.data , placement : 'topRight' , statusCode : error.response.status })        
    return {
        type : FETCH_STUDENT_SINGLE_FEES_DETAILS_FAILED,
        data : error
    }
}
