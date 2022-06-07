import { ACTIVATE_SOCKET_SUCCESS, ADD_MESSAGE_NOTIFICATION_TO_CHAT_SUCCESS, APPEND_SOCKET_NEW_MESSAGE_SUCCESS, CREATE_NEW_CHAT_MESSAGE, CREATE_NEW_CHAT_MESSAGE_FAILED, CREATE_NEW_CHAT_MESSAGE_SUCCESS, GET_CHAT_MESSAGE, GET_CHAT_MESSAGE_FAILED, GET_CHAT_MESSAGE_SUCCESS, REMOVE_MESSAGE_NOTIFICATION_FROM_CHAT_SUCCESS, SELECTED_CHAT_NULL_SUCCESS, SELECTED_CHAT_SUCCESS } from "./actionType";

const initialState = {
    newMessage : null,
    loading : false,
    ChatMessages : [],
    error : null,
    socket: null,
    notifications: [],
    newNotification : null,
    selectedChat:null
}

const removeMessageNotification = (AllNotification,removeNotification) => {    

    var FilterNotification = AllNotification.filter((item) => item.chat._id !== removeNotification.chat._id)
    return FilterNotification

}

export const ChatMessageReducer = (state=initialState,action) => {
    switch(action.type)
    {
        case ACTIVATE_SOCKET_SUCCESS:
            return {
                ...state,
                socket : action.data
            }
        case CREATE_NEW_CHAT_MESSAGE_SUCCESS:
            return {
                ...state,
                newMessage : action.data,
                ChatMessages : [...state.ChatMessages,action.data],
                loading:false,
                error: null
            }
        case CREATE_NEW_CHAT_MESSAGE_FAILED:
            return {
                ...state,
                newMessage : null,
                ChatMessages : state.ChatMessages,
                error : action.data,
                loading : false
            }
        case GET_CHAT_MESSAGE_SUCCESS:
            return {
                ...state,
                ChatMessages : action.data,
                loading:false,
                error : null
            }
        case GET_CHAT_MESSAGE_FAILED:
            return {
                ...state,
                ChatMessages : state.ChatMessages,
                loading : false,
                error : null
            }
        case APPEND_SOCKET_NEW_MESSAGE_SUCCESS:
            return {
                ...state,
                ChatMessages : [...state.ChatMessages,action.data]
            }
        case ADD_MESSAGE_NOTIFICATION_TO_CHAT_SUCCESS:
            return {
                ...state,
                notifications : [...state.notifications,action.data],
                loading : false,
                error : null
            }
        case REMOVE_MESSAGE_NOTIFICATION_FROM_CHAT_SUCCESS:
            return {
                ...state,
                loading:false,
                error : false,
                notifications : removeMessageNotification(state.notifications,action.data)
            }        
        case SELECTED_CHAT_SUCCESS:
            return {
                ...state,
                loading : false,
                error : false,
                selectedChat : action.data
            }
        case SELECTED_CHAT_NULL_SUCCESS:
            return {
                ...state,
                loading:false,
                error : false,
                selectedChat : null
            }
        default: 
        return state
    }
}

export default ChatMessageReducer;