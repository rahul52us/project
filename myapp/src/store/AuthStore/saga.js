import { takeLatest , put , call, take } from "redux-saga/effects";
import { DELETE_USER_ACCOUNT, LOGIN_USER } from "./actionType";
import { LOGIN_USER_SUCCESS_ACTION } from "./action";
import { LOGIN_USER_FAILED_ACTION } from "./action";
import { REGISTER_USER } from "./actionType";
import { REGISTER_USER_SUCCESS_ACTION } from "./action";
import { REGISTER_USER_FAILED_ACTION } from "./action";
import { GOOGLE_AUTHENTICATE } from "./actionType";
import { GOOGLE_AUTHENTICATE_SUCCESS_ACTION } from "./action";
import { GOOGLE_AUTHENTICATE_FAILED_ACTION } from "./action";
import { ME_USER } from "./actionType";
import { ME_USER_SUCCESS_ACTION } from "./action";
import { ME_USER_FAILED_ACTION } from "./action";
import { DELETE_USER_ACCOUNT_SUCCESS_ACTION } from "./action";
import { DELETE_USER_ACCOUNT_FAILED_ACTION } from "./action";
import api from "../../config/backendApi/BackendApi";

const LoginApi = async(data) => {
    const response = await api.post('/api/auth/login',data)
    return response
}
const RegisterUserApi = async(data) => {    
    const response = await api.post('/api/auth/register',data)
    return response
}
const MeAuthencationApi = async() => {
    const response = await api.post('/api/auth/current/me')
    return response
}
const GoogleAuthenticateApi = async(data) => {    
    const response = await api.post('/api/auth/google-login',data)    
    return response
}
const DeleteUserAccountApi = async(data) => {
    const response = await api.delete(`/api/auth/account/delete/${data.userId}`)    
    return response
}
function* authUserFunction({data})
{
    try
    {
        const response = yield call(LoginApi,data)
        yield put(LOGIN_USER_SUCCESS_ACTION(response.data))
    }
    catch(err)
    {
        yield put(LOGIN_USER_FAILED_ACTION(err))
    }
}
function* authRegisterFunction({data})
{
    try
    {
        const response = yield call(RegisterUserApi,data)
        yield put(REGISTER_USER_SUCCESS_ACTION(response.data))
    }
    catch(err)
    {
        yield put(REGISTER_USER_FAILED_ACTION(err))
    }
}
function* GoogleAuthenticateFunction({data})
{
    try
    {
        var response = yield call(GoogleAuthenticateApi,data)
        yield put(GOOGLE_AUTHENTICATE_SUCCESS_ACTION(response.data))
    }
    catch(err)
    {
        put(GOOGLE_AUTHENTICATE_FAILED_ACTION(err))
    }
}
function* MeAuthencateFunction()
{
    try
    {
        const response = yield call(MeAuthencationApi)
        yield put(ME_USER_SUCCESS_ACTION(response.data))
    }
    catch(err)
    {
        yield put(ME_USER_FAILED_ACTION(err.message))
    }
}
function* DeleteUserAccountFunction({data})
{
    try
    {
        const response = yield call(DeleteUserAccountApi,data)
        yield put(DELETE_USER_ACCOUNT_SUCCESS_ACTION(response.data))
    }
    catch(err)
    {
        yield put(DELETE_USER_ACCOUNT_FAILED_ACTION(err.message))
    }
}
function* authUserSaga()
{
    yield takeLatest(LOGIN_USER,authUserFunction)
    yield takeLatest(REGISTER_USER,authRegisterFunction)
    yield takeLatest(GOOGLE_AUTHENTICATE,GoogleAuthenticateFunction)
    yield takeLatest(ME_USER,MeAuthencateFunction)
    yield takeLatest(DELETE_USER_ACCOUNT,DeleteUserAccountFunction)    
}
export default authUserSaga;