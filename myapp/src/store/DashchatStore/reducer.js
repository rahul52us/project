import { ADD_MEMBERS_TO_GROUP_FAILED, ADD_MEMBERS_TO_GROUP_SUCCESS, CREATE_NEW_CHAT_GROUP_FAILED, CREATE_NEW_CHAT_GROUP_SUCCESS, DELETE_GROUP_CHAT_FAILED, DELETE_GROUP_CHAT_SUCCESS,  EDIT_GROUP_CHAT_NAME_FAILED, EDIT_GROUP_CHAT_NAME_SUCCESS, FETCH_GROUP_CHAT_MEMBERS_FAILED, FETCH_GROUP_CHAT_MEMBERS_SUCCESS, GET_ALL_USERS_FAILED, GET_ALL_USERS_SUCCESS, GET_GROUP_CHAT_FAILED, GET_GROUP_CHAT_SUCCESS, REMOVE_MEMBER_FROM_CHAT_GROUP_FAILED, REMOVE_MEMBER_FROM_CHAT_GROUP_SUCCESS } from "./actionType";


const initialState = {
    newChatGroup : null,
    GroupChats : [],
    AllUsers : [],
    loading : false,
    GroupMembers : [],
    error : null,
    FetchUserLoader : false,
    hasMoreGroupChat : true,    
    hasMoreUser : true
}

const DeleteGroupChatFunction = (GroupChat,response) => {
    
    var filterGroupChat = GroupChat.filter((item) => item._id !== response._id)
    return filterGroupChat    
}

const EditGroupChatNameFunction = (GroupChat,response) => {

    var Index = GroupChat.findIndex((item) => item._id===response._id)
    if(Index!==-1)
    {
        GroupChat[Index].chatName = response.chatName        
    }    
    return GroupChat
}


const UpdateGroupChat = (GroupChat,GroupId,userId) => {
    var Index = GroupChat.findIndex((item) => item._id === GroupId)
    if(Index!==-1)
    {
        GroupChat[Index].users.push(userId)
    }
    return GroupChat
}

const RemoveMemberFromGroup = (GroupChats,GroupMembers,response) => {
    var FilterGroup = GroupChats.filter((item) => item._id===response.GroupId)
    if(FilterGroup.length===1)
    {
        var FilterMember = GroupMembers.filter((item) => item._id !== response.userId)       
        return FilterMember        
    }    
    return GroupMembers
}

export const GroupChatReducer = (state=initialState,action) => {

    switch(action.type)
    {
        case GET_ALL_USERS_SUCCESS:

            return {
                ...state,
                AllUsers : [...state.AllUsers,...action.data.users],
                hasMoreUser : action.data.users.length > 0 ? true : false,
                loading : false
            }
        case GET_ALL_USERS_FAILED:
            return {
                ...state,
                AllUsers : state.AllUsers,
                error : action.data,
                loading : false
            }
        case GET_GROUP_CHAT_SUCCESS:
            return {
                ...state,
                loading:false,
                GroupChats : [...state.GroupChats,...action.data],
                hasMoreGroupChat : action.data.length > 0 ? true : false
            }
        case GET_GROUP_CHAT_FAILED:
            return {
                ...state,
                loading : false,
                GroupChats : state.GroupChats,
                error : action.data
            }
        case CREATE_NEW_CHAT_GROUP_SUCCESS:
            console.log(action.data)
            return {
                ...state,
                loading : false,
                newChatGroup : action.data,
                GroupChats : [...state.GroupChats,action.data]
            }
        case CREATE_NEW_CHAT_GROUP_FAILED:
            return {
                ...state,
                loading : false,
                newChatGroup : null,
                GroupChats : state.GroupChats,
                error : action.data
            }   
        case DELETE_GROUP_CHAT_SUCCESS:
            return {
                ...state,
                loading : false,
                newChatGroup : null,
                GroupChats : DeleteGroupChatFunction(state.GroupChats,action.data)                
            }    
        case DELETE_GROUP_CHAT_FAILED:
            return {
                ...state,
                loading:false,
                newChatGroup:null,
                error : action.data 
            }
        case EDIT_GROUP_CHAT_NAME_SUCCESS:
            return {
                ...state,
                loading : false,
                newChatGroup : action.data,
                GroupChats : EditGroupChatNameFunction(state.GroupChats,action.data)
            }

        case EDIT_GROUP_CHAT_NAME_FAILED:
            return{
                ...state,
                loading:false,
                GroupChats : state.GroupChats                
            }

        case FETCH_GROUP_CHAT_MEMBERS_SUCCESS:
            console.log('the group is',action.data)
            return{
                ...state,
                FetchUserLoader:false,                                
                GroupMembers : action.data,                                
                loading : false
            }

        case FETCH_GROUP_CHAT_MEMBERS_FAILED:
            return {
                ...state,
                FetchUserLoader:false,                
                error : action.data,
                loading:false        
            }                

        case ADD_MEMBERS_TO_GROUP_SUCCESS:
            console.log(state.GroupChats,action.data.groupId,action.data.user._id)
            return {
                ...state,
                GroupMembers:[...state.GroupMembers,action.data.user],
                GroupChats: UpdateGroupChat(state.GroupChats,action.data.groupId,action.data.user._id),                
                loading : false
            }            
        case ADD_MEMBERS_TO_GROUP_FAILED:
            return {
                ...state,
                loading:false,
                error : action.data
            }
        case REMOVE_MEMBER_FROM_CHAT_GROUP_SUCCESS:
            return {
                ...state,
                GroupMembers : RemoveMemberFromGroup(state.GroupChats,state.GroupMembers,action.data),
                loading : false
            }           
        case REMOVE_MEMBER_FROM_CHAT_GROUP_FAILED:
            return{
                GroupMembers : state.GroupMembers,
                loading:false,
                error : action.data
            }
        default:
            return state;             
    }
}

export default GroupChatReducer; 