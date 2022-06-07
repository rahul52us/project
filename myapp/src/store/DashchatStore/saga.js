import { takeLatest , put , call, take } from "redux-saga/effects";
import api from "../../config/backendApi/BackendApi";
import { ADD_MEMBERS_TO_GROUP_FAILED_ACTION, ADD_MEMBERS_TO_GROUP_SUCCESS_ACTION, CREATE_NEW_CHAT_GROUP_FAILED_ACTION, CREATE_NEW_CHAT_GROUP_SUCCESS_ACTION, DELETE_GROUP_CHAT_FAILED_ACTION, DELETE_GROUP_CHAT_SUCCESS_ACTION, EDIT_GROUP_CHAT_NAME_FAILED_ACTION, EDIT_GROUP_CHAT_NAME_SUCCESS_ACTION, FETCH_GROUP_CHAT_MEMBERS_FAILED_ACTION, FETCH_GROUP_CHAT_MEMBERS_SUCCESS_ACTION, GET_ALL_USERS_FAILED_ACTION, GET_ALL_USERS_SUCCESS_ACTION, GET_GROUP_CHAT_FAILED_ACTION, GET_GROUP_CHAT_SUCCESS_ACTION, REMOVE_MEMBER_FROM_CHAT_GROUP_FAILED_ACTION, REMOVE_MEMBER_FROM_CHAT_GROUP_SUCCESS_ACTION } from "./actions";
import { ADD_MEMBERS_TO_GROUP, CREATE_NEW_CHAT_GROUP, DELETE_GROUP_CHAT, EDIT_GROUP_CHAT_NAME, FETCH_GROUP_CHAT_MEMBERS, GET_ALL_USERS, GET_GROUP_CHAT, REMOVE_MEMBER_FROM_CHAT_GROUP } from "./actionType";



// this are all the saga api function 

const GetGroupChatApi = async(data) => {
    const response = await api.post('/api/chat/fetchGroup',data)
    console.log(response)
    return response
}


const CreateGroupChatApi = async(data) => {
    const response = await api.post('/api/chat/createGroupChat',data)
    console.log(response)
    return response
}

const EditGroupChatNameApi = async(data) => {
    const response = await api.put('/api/chat/renameGroup',data)    
    return response
}


const DeleteGroupChatApi = async(data) => {
    const response = await api.post('/api/chat/deleteGroup',data)
    return response
}



const FetchChatGroupMembersApi = async(data) => {
    console.log(data)
    const response = await api.post('/api/chat/fetchChatGroupMembers',data)
    console.log(response)
    return response
}


const GetAllUserApi = async(data) => {
    const response = await api.get(`/api/auth/getAllUsers/${data.page}`)
    console.log('the response data is ',response)
    return response
}


const AddNewMemberToGroupApi = async(data) => {
    console.log(data)
    const response = await api.put('/api/chat/addMemberToGroup',data)
    console.log(response)
    return response
}


const RemoveMemberFromGroupApi = async(data) => {
    var response = await api.put('/api/chat/removeMemberFromGroup',data)
    console.log(response)
    return response
}

// this are all the saga function 

function* GetGroupChatFunction({data})
{
    try
    {
        var response = yield call(GetGroupChatApi,data)
        yield put(GET_GROUP_CHAT_SUCCESS_ACTION(response.data))
    }
    catch(err)
    {
        yield put(GET_GROUP_CHAT_FAILED_ACTION(err))
     }
}


function* CreateGroupChatFunction({data})
{
    try
    {
        var response = yield call(CreateGroupChatApi,data)
        yield put(CREATE_NEW_CHAT_GROUP_SUCCESS_ACTION(response.data))
    }
    catch(err)
    {
        yield put(CREATE_NEW_CHAT_GROUP_FAILED_ACTION(err))
    }
}

function* DeleteGroupChatFunction({data})
{
    try
    {
        var response = yield call(DeleteGroupChatApi,data)
        yield put(DELETE_GROUP_CHAT_SUCCESS_ACTION(response.data))
    }
    catch(err)
    {
        yield put(DELETE_GROUP_CHAT_FAILED_ACTION(err))
    }
}


function* EditGroupChatNameFunction({data})
{
    try
    {
        const response = yield call(EditGroupChatNameApi,data)
        yield put(EDIT_GROUP_CHAT_NAME_SUCCESS_ACTION(response.data))
    }
    catch(err)
    {
        yield put(EDIT_GROUP_CHAT_NAME_FAILED_ACTION(err))
    }
}


function* FetchChatGroupMembersFunction({data})
{
    try
    {
        const response = yield call(FetchChatGroupMembersApi,data)
        yield put(FETCH_GROUP_CHAT_MEMBERS_SUCCESS_ACTION(response.data))
    }
    catch(err)
    {
        yield put(FETCH_GROUP_CHAT_MEMBERS_FAILED_ACTION(err))
    }
}

function* GetALLUserFunction({data}){
    try
    {
        const response = yield call(GetAllUserApi,data)
        yield put(GET_ALL_USERS_SUCCESS_ACTION(response.data))
    }
    catch(err)
    {
        yield put(GET_ALL_USERS_FAILED_ACTION(err))
    }
}


function* AddMemberGroupChatFunction({data})
{
    try
    {
        var response =  yield call(AddNewMemberToGroupApi,data)
        console.log('the rrr',response)
        yield put(ADD_MEMBERS_TO_GROUP_SUCCESS_ACTION(response.data))
    }
    catch(err)
    {
        console.log('the error is ',err)
        yield put(ADD_MEMBERS_TO_GROUP_FAILED_ACTION(err))
    }
}

function* RemoveMemberFromGroupFunction({data})
{
    console.log(data)
    try
    {
        var response = yield call(RemoveMemberFromGroupApi,data)
        yield put(REMOVE_MEMBER_FROM_CHAT_GROUP_SUCCESS_ACTION(response.data))
    }
    catch(err)
    {
        yield put(REMOVE_MEMBER_FROM_CHAT_GROUP_FAILED_ACTION(err))
    }
}

function* GroupChatSaga()
{
    yield takeLatest(GET_GROUP_CHAT,GetGroupChatFunction)
    yield takeLatest(CREATE_NEW_CHAT_GROUP,CreateGroupChatFunction)
    yield takeLatest(DELETE_GROUP_CHAT,DeleteGroupChatFunction)
    yield takeLatest(EDIT_GROUP_CHAT_NAME,EditGroupChatNameFunction)
    yield takeLatest(FETCH_GROUP_CHAT_MEMBERS,FetchChatGroupMembersFunction)
    yield takeLatest(GET_ALL_USERS,GetALLUserFunction)
    yield takeLatest(ADD_MEMBERS_TO_GROUP,AddMemberGroupChatFunction)
    yield takeLatest(REMOVE_MEMBER_FROM_CHAT_GROUP,RemoveMemberFromGroupFunction)
}


export default GroupChatSaga;