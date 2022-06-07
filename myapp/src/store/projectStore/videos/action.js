import { DELETE_YOUTUBE_VIDEOS, DELETE_YOUTUBE_VIDEOS_FAILED, DELETE_YOUTUBE_VIDEOS_SUCCESS, GET_VIDEOS } from "./actionType";
import { GET_VIDEOS_SUCCESS } from "./actionType";
import { GET_VIDEOS_FAILED } from "./actionType";
import { CREATE_VIDEOS } from "./actionType";
import { CREATE_VIDEOS_SUCCESS } from "./actionType";
import { CREATE_VIDEOS_FAILED } from "./actionType";
import { CREATE_YOUTUBE_CATEGARY } from "./actionType";
import { CREATE_YOUTUBE_CATEGARY_SUCCESS } from "./actionType";
import { CREATE_YOUTUBE_CATEGARY_FAILED } from "./actionType";
import { GET_YOUTUBE_CATEGARY } from "./actionType";
import { GET_YOUTUBE_CATEGARY_SUCCESS } from "./actionType";
import { GET_YOUTUBE_CATEGARY_FAILED } from "./actionType";
import { EDIT_YOUTUBE_VIDEOS } from "./actionType";
import { EDIT_YOUTUBE_VIDEOS_SUCCESS } from "./actionType";
import { EDIT_YOUTUBE_VIDEOS_FAILED } from "./actionType";


export const GET_VIDEOS_ACTION = (data) => 
{
    return {
        type : GET_VIDEOS,
        data : data 
    }
}


export const GET_VIDEOS_SUCCESS_ACTION = (data) => {

    return {
        type : GET_VIDEOS_SUCCESS,
        data : data 
    }
}



export const GET_VIDEOS_FAILED_ACTION = (error) => {
    return {
        type : GET_VIDEOS_FAILED,
        data : error
    }
}

export const CREATE_VIDEOS_ACTION = (data) => {

    return {
        type : CREATE_VIDEOS,
        data : data
    }
}


export const CREATE_VIDEOS_SUCCESS_ACTION = (data) => {

    return {
        type : CREATE_VIDEOS_SUCCESS,
        data : data
    }
}

export const CREATE_VIDEOS_FAILED_ACTION = (data) => {
    return {
        type : CREATE_VIDEOS_FAILED,
        data : data
    }
}

export const CREATE_YOUTUBE_CATEGARY_ACTION = (data) => {
    return {
        type : CREATE_YOUTUBE_CATEGARY,
        data : data
    }
}

export const CREATE_YOUTUBE_CATEGARY_SUCCESS_ACTION = (data) => {
    return {
        type : CREATE_YOUTUBE_CATEGARY_SUCCESS,
        data : data
    }
}

export const CREATE_YOUTUBE_CATEGARY_FAILED_ACTION = (data) => {
    return {
        type : CREATE_YOUTUBE_CATEGARY_FAILED,
        data : data
    }
}

export const GET_YOUTUBE_CATEGARY_ACTION = () => {
    return {
        type : GET_YOUTUBE_CATEGARY,
    }
}

export const GET_YOUTUBE_CATEGARY_SUCCESS_ACTION = (data) => {
    return {
        type : GET_YOUTUBE_CATEGARY_SUCCESS,
        data : data
    }
}

export const GET_YOUTUBE_CATEGARY_FAILED_ACTION = (data) => {
    return {
        type : GET_YOUTUBE_CATEGARY_FAILED,
        data : data
    }
}

export const DELETE_YOUTUBE_VIDEOS_ACTION = (data) => {
    return {
        type : DELETE_YOUTUBE_VIDEOS,
        data : data
    }
}

export const DELETE_YOUTUBE_VIDEOS_SUCCESS_ACTION = (data) => {
    return {
        type : DELETE_YOUTUBE_VIDEOS_SUCCESS,
        data : data
    }
}

export const DELETE_YOUTUBE_VIDEOS_FAILED_ACTION = (data) => {
    return {
        type : DELETE_YOUTUBE_VIDEOS_FAILED,
        data : data
    }
}


export const EDIT_YOUTUBE_VIDEOS_ACTION = (data) => {
    return {
        type : EDIT_YOUTUBE_VIDEOS,
        data : data
    }
}

export const EDIT_YOUTUBE_VIDEOS_SUCCESS_ACTION = (data) => {
    return {
        type : EDIT_YOUTUBE_VIDEOS_SUCCESS,
        data : data
    }
}

export const EDIT_YOUTUBE_VIDEOS_FAILED_ACTION = (data) => {
    return {
        type : EDIT_YOUTUBE_VIDEOS_FAILED,
        data : data
    }
}