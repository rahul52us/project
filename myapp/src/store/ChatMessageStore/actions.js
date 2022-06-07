import { ACTIVATE_SOCKET, ACTIVATE_SOCKET_SUCCESS, ADD_MESSAGE_NOTIFICATION_TO_CHAT, ADD_MESSAGE_NOTIFICATION_TO_CHAT_SUCCESS, APPEND_SOCKET_NEW_MESSAGE, APPEND_SOCKET_NEW_MESSAGE_SUCCESS, CREATE_NEW_CHAT_MESSAGE, CREATE_NEW_CHAT_MESSAGE_FAILED, CREATE_NEW_CHAT_MESSAGE_SUCCESS, GET_CHAT_MESSAGE, GET_CHAT_MESSAGE_FAILED, GET_CHAT_MESSAGE_SUCCESS, REMOVE_MESSAGE_NOTIFICATION_FROM_CHAT, REMOVE_MESSAGE_NOTIFICATION_FROM_CHAT_SUCCESS, SELECTED_CHAT, SELECTED_CHAT_NULL, SELECTED_CHAT_NULL_SUCCESS, SELECTED_CHAT_SUCCESS } from "./actionType";



export const ACTIVATE_SOCKET_ACTION = (data) => {
    return {
        type : ACTIVATE_SOCKET,
        data : data
    }
}

export const ACTIVATE_SOCKET_SUCCESS_ACTION = (data) => {
    return {
        type : ACTIVATE_SOCKET_SUCCESS,
        data : data
    }
}

export const CREATE_NEW_CHAT_MESSAGE_ACTION = (data) => {
    return {
        type : CREATE_NEW_CHAT_MESSAGE,
        data : data
    }
}

export const CREATE_NEW_CHAT_MESSAGE_SUCCESS_ACTION = (data) => {
    return {
        type : CREATE_NEW_CHAT_MESSAGE_SUCCESS,
        data : data
    }
}

export const CREATE_NEW_CHAT_MESSAGE_FAILED_ACTION = (error) => {
    return {
        type : CREATE_NEW_CHAT_MESSAGE_FAILED,
        data : error
    }
}

export const GET_CHAT_MESSAGE_ACTION = (data) => {
    return {
        type : GET_CHAT_MESSAGE,
        data : data
    }
}

export const GET_CHAT_MESSAGE_SUCCESS_ACTION = (data) => {
    return {
        type : GET_CHAT_MESSAGE_SUCCESS,
        data : data
    }
}

export const GET_CHAT_MESSAGE_FAILED_ACTION = (error ) => {
    return {
        type : GET_CHAT_MESSAGE_FAILED,
        data : error 
    }
}

export const APPEND_SOCKET_NEW_MESSAGE_ACTION = (data) => {
    return {
        type : APPEND_SOCKET_NEW_MESSAGE,
        data : data
    }
}

export const APPEND_SOCKET_NEW_MESSAGE_SUCCESS_ACTION = (data) => {
    return {
        type : APPEND_SOCKET_NEW_MESSAGE_SUCCESS,
        data : data
    }
}

export const ADD_MESSAGE_NOTIFICATION_TO_CHAT_ACTION = (data) => {
    return {
        type : ADD_MESSAGE_NOTIFICATION_TO_CHAT,
        data : data
    }
}

export const ADD_MESSAGE_NOTIFICATION_TO_CHAT_SUCCESS_ACTION = (data) => {
    return {
        type : ADD_MESSAGE_NOTIFICATION_TO_CHAT_SUCCESS,
        data : data
    }
}

export const REMOVE_MESSAGE_NOTIFICATION_FROM_CHAT_ACTION = (data) => {
    return {
        type :REMOVE_MESSAGE_NOTIFICATION_FROM_CHAT,
        data : data
    }
}

export const REMOVE_MESSAGE_NOTIFICATION_FROM_CHAT_SUCCESS_ACTION = (data) => {
    return {
        type : REMOVE_MESSAGE_NOTIFICATION_FROM_CHAT_SUCCESS,
        data : data
    }
}

export const SELECTED_CHAT_ACTION = (data) => {
    return {
        type : SELECTED_CHAT,
        data : data
    }
}

export const SELECTED_CHAT_SUCCESS_ACTION = (data) => {
    return {
        type : SELECTED_CHAT_SUCCESS,
        data : data
    }
}

export const SELECTED_CHAT_NULL_ACTION = (data) => {
    return {
        type : SELECTED_CHAT_NULL,
        data : data
    }
}

export const SELECTED_CHAT_NULL_SUCCESS_ACTION = (data) => {
    return {
        type : SELECTED_CHAT_NULL_SUCCESS,
        data : data
    }
}
 