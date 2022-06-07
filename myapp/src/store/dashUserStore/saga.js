import { takeLatest , put , call } from "redux-saga/effects";
import { BLOCK_USER, CREATE_NEW_DASH_USER, CREATE_NEW_DASH_USER_FAILED, CREATE_NEW_DASH_USER_SUCCESS, CREATE_USER_ACCESS_PDF, DELETE_PDF_ACCESS, GET_BLOCK_USER, GET_USERS, UPDATE_EXTRA_INFO_USER } from "./actionType";
import { BLOCK_USER_FAILED_ACTION, BLOCK_USER_SUCCESS_ACTION, CREATE_NEW_DASH_USER_FAILED_ACTION, CREATE_NEW_DASH_USER_SUCCESS_ACTION, CREATE_USER_ACCESS_PDF_FAILED_ACTION, CREATE_USER_ACCESS_PDF_SUCCESS_ACTION, DELETE_PDF_ACCESS_SUCCESS_ACTION, DELETE_USER_TOKEN_FAILED_ACTION, DELETE_USER_TOKEN_SUCCESS_TOKEN, GET_BLOCK_USER_FAILED_ACTION, GET_BLOCK_USER_SUCCESS_ACTION, GET_USERS_SUCCESS_ACTION, UPDATE_EXTRA_INFO_USER_SUCCESS_ACTION } from "./action";
import { GET_USERS_FAILED_ACTION } from "./action";
import { DELETE_PDF_ACCESS_FAILED_ACTION } from "./action";
import { DELETE_USER_TOKEN } from "./actionType";
import { UNBLOCK_USER } from "./actionType";
import { UNBLOCK_USER_SUCCESS_ACTION } from "./action";
import { UNBLOCK_USER_FAILED_ACTION } from "./action";
import api from "../../config/backendApi/BackendApi";

const GetAllUsersApi = async(data) => {    
    const response = await api.get(`/api/auth/getAllUsers/${data}`)
    return response
}
const DeletePdfAccessApi = async(data) => {
    const response = await api.post('/api/auth/updatedAccesspdf',{removePdf : data.DeletePdf , userId : data.userId})    
    return response    
}
const CreateNewPdfAccessApi = async(data) => {    
    const response = await api.post('/api/auth/AddUserPdfAccess',{Addpdf : data.Addpdf , userId : data.userId})    
    return response
}
const createNewUserApi = async(data) => {
    const response = await api.post('/api/auth/createNewUser',data)
    return response
}
const DeleteUserTokenApi = async(data) => {
    const response = await api.post('/api/auth/DeleteUserToken',data)    
    return response
}
const BlockUserApi = async(data) => {
    const response = await api.post('/api/auth/blockUser',{userId : data})
    return response    
}
const UnBlockUserApi = async(data) => {
    const response = await api.post('/api/auth/unBlockUser',{userId : data})
    return response
}
const GetBlockUserApi = async(data) => {
    const response = await api.post('/api/auth/getBlockUser',{page : data})    
    return response
}
function* GetAllUserFunction({data})
{
    try
    {
        const response = yield call(GetAllUsersApi,data)
        yield put(GET_USERS_SUCCESS_ACTION(response.data))
    }
    catch(err)
    {
        yield put(GET_USERS_FAILED_ACTION(err.message))
    }
}
function* DeletePdfAccessFunction({data})
{
    try
    {
        const response = yield call(DeletePdfAccessApi,data)
        yield put(DELETE_PDF_ACCESS_SUCCESS_ACTION({response:response.data,data}))
    }
    catch(err)
    {
        yield put(DELETE_PDF_ACCESS_FAILED_ACTION(err))
    }
}
function* CreatePdfAccessFunction({data})
{
    try
    {
        const response = yield call(CreateNewPdfAccessApi,data)
        yield put(CREATE_USER_ACCESS_PDF_SUCCESS_ACTION({response:response.data,data}))
    }
    catch(err)
    {
        yield put(CREATE_USER_ACCESS_PDF_FAILED_ACTION(err.message))
    }
}
function* CreateNewUserFunction({data})
{
    try
    {
        var response = yield call(createNewUserApi,data)
        yield put(CREATE_NEW_DASH_USER_SUCCESS_ACTION(response.data))
    }
    catch(err)
    {
        yield put(CREATE_NEW_DASH_USER_FAILED_ACTION(err))
    }
}
function* DeletedUserTokenFunction({data})
{
    try
    {
        var response = yield call(DeleteUserTokenApi,data)
        yield put(DELETE_USER_TOKEN_SUCCESS_TOKEN({responseData : response.data , token : data.token}))
    }
    catch(err)
    {
        yield put(DELETE_USER_TOKEN_FAILED_ACTION(err.message))
    }
}
function* BlockUserFunction({data})
{
    try
    {
        const response = yield call(BlockUserApi,data)
        yield put(BLOCK_USER_SUCCESS_ACTION({data : data , responseData : response.data}))
    }
    catch(err)
    {
        yield put(BLOCK_USER_FAILED_ACTION(err.message))
    }
}
function* GetBlockUserFunction({data})
{
    try
    {
        const response = yield call(GetBlockUserApi,data)
        yield put(GET_BLOCK_USER_SUCCESS_ACTION(response.data))
    }
    catch(err)
    {
        yield put(GET_BLOCK_USER_FAILED_ACTION(err.message))
    }
}
function* UnBlockUserFunction({data})
{
    try
    {
        const response = yield call(UnBlockUserApi,data)
        yield put(UNBLOCK_USER_SUCCESS_ACTION(response.data))
    }
    catch(err)
    {
        yield put(UNBLOCK_USER_FAILED_ACTION(err.message))
    }
}
function* UpdateExtraInfoUserFunction({data})
{
    yield put(UPDATE_EXTRA_INFO_USER_SUCCESS_ACTION(data))
}
function* DashhUserSaga()
{    
    yield takeLatest(GET_USERS,GetAllUserFunction)
    yield takeLatest(DELETE_PDF_ACCESS,DeletePdfAccessFunction)
    yield takeLatest(CREATE_USER_ACCESS_PDF,CreatePdfAccessFunction)
    yield takeLatest(CREATE_NEW_DASH_USER,CreateNewUserFunction)
    yield takeLatest(DELETE_USER_TOKEN,DeletedUserTokenFunction)
    yield takeLatest(BLOCK_USER,BlockUserFunction)
    yield takeLatest(UNBLOCK_USER,UnBlockUserFunction)
    yield takeLatest(GET_BLOCK_USER,GetBlockUserFunction)
    yield takeLatest(UPDATE_EXTRA_INFO_USER,UpdateExtraInfoUserFunction)
}
export default DashhUserSaga;