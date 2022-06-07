import { Notify } from "../../config/Notify/Notify";
import { ADD_MEMBERS_TO_GROUP, ADD_MEMBERS_TO_GROUP_FAILED, ADD_MEMBERS_TO_GROUP_SUCCESS, CREATE_NEW_CHAT_GROUP, DELETE_GROUP_CHAT, DELETE_GROUP_CHAT_FAILED, DELETE_GROUP_CHAT_SUCCESS, EDIT_GROUP_CHAT_NAME, EDIT_GROUP_CHAT_NAME_FAILED, EDIT_GROUP_CHAT_NAME_SUCCESS, GET_ALL_USERS, GET_ALL_USERS_FAILED, GET_ALL_USERS_SUCCESS, GET_GROUP_CHAT, GET_GROUP_CHAT_FAILED, GET_GROUP_CHAT_SUCCESS, REMOVE_MEMBER_FROM_CHAT_GROUP, REMOVE_MEMBER_FROM_CHAT_GROUP_FAILED, REMOVE_MEMBER_FROM_CHAT_GROUP_SUCCESS } from "./actionType";
import { CREATE_NEW_CHAT_GROUP_SUCCESS } from "./actionType";
import { CREATE_NEW_CHAT_GROUP_FAILED } from "./actionType";
import { FETCH_GROUP_CHAT_MEMBERS } from "./actionType";
import { FETCH_GROUP_CHAT_MEMBERS_SUCCESS } from "./actionType";
import { FETCH_GROUP_CHAT_MEMBERS_FAILED } from "./actionType";





export const CREATE_NEW_CHAT_GROUP_ACTION = (data) => {
    return {
        type : CREATE_NEW_CHAT_GROUP,
        data : data
    }
}

export const CREATE_NEW_CHAT_GROUP_SUCCESS_ACTION = (data) => {
    Notify({type : "success" , message : "CREATE SUCCESS" , description : `${data.chatName} group has been created successfully !`})
    return {
        type : CREATE_NEW_CHAT_GROUP_SUCCESS,
        data : data
    }
}

export const CREATE_NEW_CHAT_GROUP_FAILED_ACTION = (error) => {
    Notify({type : "error" , description : error.response.data , placement : 'topRight' , statusCode : error.response.status })    
    return {
        type : CREATE_NEW_CHAT_GROUP_FAILED,
        data : error
    }
}

export const GET_GROUP_CHAT_ACTION = (data) => {
    return {
        type : GET_GROUP_CHAT,
        data : data
    }
}

export const GET_GROUP_CHAT_SUCCESS_ACTION = (data) => {
    return {
        type : GET_GROUP_CHAT_SUCCESS,
        data : data
    }
}

export const GET_GROUP_CHAT_FAILED_ACTION = (data) => {
    return {
        type : GET_GROUP_CHAT_FAILED,
        data : data
    }
}


export const DELETE_GROUP_CHAT_ACTION = (data) => {
    return {
        type : DELETE_GROUP_CHAT,  
        data : data
    }
}

export const DELETE_GROUP_CHAT_SUCCESS_ACTION = (data) => {
    Notify({type : "success" , message : "DELETE SUCCESS" , description : `${data.chatName} group has been deleted successfully !`})
    return {
        type : DELETE_GROUP_CHAT_SUCCESS,
        data : data
    }
}

export const DELETE_GROUP_CHAT_FAILED_ACTION = (error) => {
    Notify({type : "error" , description : error.response.data , placement : 'topRight' , statusCode : error.response.status })    
    return {
        type : DELETE_GROUP_CHAT_FAILED,
        data : error
    }
}


export const EDIT_GROUP_CHAT_NAME_ACTION = (data) => {    
    return {
        type : EDIT_GROUP_CHAT_NAME,
        data : data
    }
}

export const EDIT_GROUP_CHAT_NAME_SUCCESS_ACTION = (data) => {
    Notify({type : "success" , message : "EDIT SUCCESS" , description : `${data.chatName} group has been edit successfully !`})
    return {
        type : EDIT_GROUP_CHAT_NAME_SUCCESS,
        data : data
    }
}

export const EDIT_GROUP_CHAT_NAME_FAILED_ACTION = (error) => {
    Notify({type : "error" , description : error.response.data , placement : 'topRight' , statusCode : error.response.status })    
    return {
        type : EDIT_GROUP_CHAT_NAME_FAILED,
        data : error
    }
}


export const FETCH_GROUP_CHAT_MEMBERS_ACTION = (data) => {
    return {
        type : FETCH_GROUP_CHAT_MEMBERS,
        data : data
    }
}

export const FETCH_GROUP_CHAT_MEMBERS_SUCCESS_ACTION = (data) => {
    
    return {
        type : FETCH_GROUP_CHAT_MEMBERS_SUCCESS,
        data : data
    }
}

export const FETCH_GROUP_CHAT_MEMBERS_FAILED_ACTION = (data) => {
    return {
        type : FETCH_GROUP_CHAT_MEMBERS_FAILED,
        data : data
    }
}


export const GET_ALL_USERS_ACTION = (data) => {
    return {
        type : GET_ALL_USERS,
        data : data
    }
}

export const GET_ALL_USERS_SUCCESS_ACTION = (data) => {    
    return {
        type : GET_ALL_USERS_SUCCESS,
        data : data
    }
}

export const GET_ALL_USERS_FAILED_ACTION = (error) => {
    Notify({type : "error" , description : error.response , placement : 'topRight'  })    
    return {
        type : GET_ALL_USERS_FAILED,
        data : error
    }
}


export const ADD_MEMBERS_TO_GROUP_ACTION = (data) => {
    return {
        type : ADD_MEMBERS_TO_GROUP,
        data : data
    }
}

export const ADD_MEMBERS_TO_GROUP_SUCCESS_ACTION = (data) => {
    console.log(data)
    Notify({type : "success" , message : "ADD SUCCESS" , description : `${data.user.email} user has been added to the ${data.groupName}`})
    return {
        type : ADD_MEMBERS_TO_GROUP_SUCCESS,
        data : data
    }
}

export const ADD_MEMBERS_TO_GROUP_FAILED_ACTION = (error) => {
    Notify({type : "error" , description : error.response.data , placement : 'topRight' , statusCode : error.response.status })    
    return {
        type : ADD_MEMBERS_TO_GROUP_FAILED,
        data : error
    }
}

export const REMOVE_MEMBER_FROM_CHAT_GROUP_ACTION = (data) => {

    console.log('the data is ',data)
    return {
        type : REMOVE_MEMBER_FROM_CHAT_GROUP,
        data : data
    }
}

export const REMOVE_MEMBER_FROM_CHAT_GROUP_SUCCESS_ACTION = (data) => {
    Notify({type : "success" , message : "ADD SUCCESS" , description : `user has been from ${data.groupName} group`})
    return {
        type : REMOVE_MEMBER_FROM_CHAT_GROUP_SUCCESS,
        data : data
    }
}

export const REMOVE_MEMBER_FROM_CHAT_GROUP_FAILED_ACTION = (error) => {
    return {
        type : REMOVE_MEMBER_FROM_CHAT_GROUP_FAILED,
        data : error
    }
}