import { Notify } from "../../../config/Notify/Notify";
import { CREATE_NEW_QUIZ, DELETE_QUIZ, DELETE_QUIZ_FAILED, DELETE_QUIZ_SUCCESS, EDIT_QUIZ_QUESTION, EDIT_QUIZ_QUESTION_FAILED, EDIT_QUIZ_QUESTION_SUCCESS } from "./actionType";
import { CREATE_NEW_QUIZ_SUCCESS } from "./actionType";
import { CREATE_NEW_QUIZ_FAILED } from "./actionType";
import { GET_ALL_CATEGARY_QUIZ } from "./actionType";
import { GET_ALL_CATEGARY_QUIZ_SUCCESS } from "./actionType";
import { GET_ALL_CATEGARY_QUIZ_FAILED } from "./actionType";
import { GET_QUIZ_CATEGARY } from "./actionType";
import { GET_QUIZ_CATEGARY_SUCCESS } from "./actionType";
import { GET_QUIZ_CATEGARY_FAILED } from "./actionType";
import { CREATE_QUIZ_CATEGARY } from "./actionType";
import { CREATE_QUIZ_CATEGARY_SUCCESS } from "./actionType";
import { CREATE_QUIZ_CATEGARY_FAILED } from "./actionType";
import { CREATE_NEW_CATEGARY_TOPIC } from "./actionType";
import { CREATE_NEW_CATEGARY_TOPIC_SUCCESS } from "./actionType";
import { CREATE_NEW_CATEGARY_TOPIC_FAILED } from "./actionType";




export const CREATE_QUIZ_CATEGARY_ACTION = (data) => {
    return {
        type : CREATE_QUIZ_CATEGARY,
        data : data
    }
}



export const CREATE_QUIZ_CATEGARY_SUCCESS_ACTION = (data) => {    
    Notify({type : 'success' , message :'SUCCESS' , description : `${data.categary} has been created successfully !`})     
    return {
        type : CREATE_QUIZ_CATEGARY_SUCCESS,
        data : data
    }
}

export const CREATE_QUIZ_CATEGARY_FAILED_ACTION = (data) => {
    return {
        type : CREATE_QUIZ_CATEGARY_FAILED,
        data : data
    }
}


export const GET_QUIZ_CATEGARY_ACTION = (data) => {
    return {

           type : GET_QUIZ_CATEGARY,
           data : data
    }
}


export const GET_QUIZ_CATEGARY_SUCCESS_ACTION = (data) =>
{
    return {
        type : GET_QUIZ_CATEGARY_SUCCESS,
        data : data
    }
}


export const GET_QUIZ_CATEGARY_FAILED_ACTION = (data) => {
    return {
        type : GET_QUIZ_CATEGARY_FAILED,
        data : data
    }
}

export const CREATE_NEW_QUIZ_ACTION = (data) => {
    Notify({type : 'success' , message :'SUCCESS' , description : `new question has been created successfully !`})     
    return {
        type : CREATE_NEW_QUIZ,
        data : data
    }
}

export const CREATE_NEW_QUIZ_SUCCESS_ACTION = (data) => {
    return {
        type : CREATE_NEW_QUIZ_SUCCESS,
        data : data
    }
}

export const CREATE_NEW_QUIZ_FAILED_ACTION = (data) => 
{
    return {
        type : CREATE_NEW_QUIZ_FAILED,
        data : data
    }
}

export const GET_ALL_CATEGARY_QUIZ_ACTION = (data) => {
    return {
        type : GET_ALL_CATEGARY_QUIZ,
        data : data
    }
}

export const GET_ALL_CATEGARY_QUIZ_SUCCESS_ACTION = (data) => {

    return {
        type : GET_ALL_CATEGARY_QUIZ_SUCCESS ,
        data : data
    }
}

export const GET_ALL_CATEGARY_QUIZ_FAILED_ACTION = (data) => {
    return {
        type : GET_ALL_CATEGARY_QUIZ_FAILED,
        data : data
    }
}

export const CREATE_NEW_CATEGARY_TOPIC_ACTION = (data) => {
    return {
        type : CREATE_NEW_CATEGARY_TOPIC,
        data : data
    }
}

export const CREATE_NEW_CATEGARY_TOPIC_SUCCESS_ACTION = async (data) => {       
    Notify({type : 'success' , message :'SUCCESS' , description : `${data.Data.Topic} has been created successfully !`})     
    return {
        type : CREATE_NEW_CATEGARY_TOPIC_SUCCESS,
        data : data
    }
}

export const CREATE_NEW_CATEGARY_TOPIC_FAILED_ACTION = (data) => {
    return {
        type : CREATE_NEW_CATEGARY_TOPIC_FAILED,
        data : data
    }
}

export const DELETE_QUIZ_ACTION = (data) => {
    
    return {
        type : DELETE_QUIZ,
        data : data
    }
}

export const DELETE_QUIZ_SUCCESS_ACTION = (data) => {
    Notify({type : 'success' , description :'delete successfully' })
    return {
        type : DELETE_QUIZ_SUCCESS,
        data : data
    }
}

export const DELETE_QUIZ_FAILED_ACTION = (data) => {
    return {
        type : DELETE_QUIZ_FAILED,
        data : data
    }
}

export const EDIT_QUIZ_QUESTION_ACTION = (data) => {
    return {
        type : EDIT_QUIZ_QUESTION,
        data : data
    }
}

export const EDIT_QUIZ_QUESTION_SUCCESS_ACTION = (data) => {
    Notify({type : 'success' , description : `${data.response.Question} Question has been for updated the ${data.response.Categary}` })
    return {
        type : EDIT_QUIZ_QUESTION_SUCCESS,
        data : data
    }
}

export const EDIT_QUIZ_QUESTION_FAILED_ACTION = (data) => {
    return {
        type : EDIT_QUIZ_QUESTION_FAILED,
        data : data
    }
}