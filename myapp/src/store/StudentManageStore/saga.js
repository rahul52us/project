import { takeLatest , call , put } from "redux-saga/effects";
import { FETCH_CATEGARY_STUDENT, CREATE_FEES_CATEGARY_STUDENT, FETCH_STUDENT_SINGLE_FEES_DETAILS } from "./actionType";
import api from "../../config/backendApi/BackendApi";
import { FETCH_CATEGARY_STUDENT_FAILED_ACTION, FETCH_CATEGARY_STUDENT_SUCCESS_ACTION, CREATE_FEES_CATEGARY_STUDENT_FAILED_ACTION, CREATE_FEES_CATEGARY_STUDENT_SUCCESS_ACTION, FETCH_STUDENT_SINGLE_FEES_DETAILS_SUCCESS_ACTION, FETCH_STUDENT_SINGLE_FEES_DETAILS_FAILED_ACTION } from "./action";


const FetchCategaryStudentApi = async(data) => {
    const response = await api.post(`/api/auth/searchByUserDetails/${data.page}`,data.details)
    return response
}

const CreateFeesCategaryStudentApi = async(data) => {
    const response = await api.post('/api/scholar/fees/create',data)
    return response
}

const FetchStudentSingleFeesDetailsApi = async(data) => {
    const response = await api.post('/api/scholar/fees/get',data)
    return response
}

function* FetchCategaryStudent({data})
{
    try
    {
        const response = yield call(FetchCategaryStudentApi,data)
        yield put(FETCH_CATEGARY_STUDENT_SUCCESS_ACTION(response.data))
    }
    catch(err)
    {
        yield put(FETCH_CATEGARY_STUDENT_FAILED_ACTION(err))
    }
}


function* CreateFeesCategaryStudent({data})
{
    try
    {
        const response = yield call(CreateFeesCategaryStudentApi,data)
        yield put(CREATE_FEES_CATEGARY_STUDENT_SUCCESS_ACTION(response.data))

    }
    catch(err)
    {
        yield put(CREATE_FEES_CATEGARY_STUDENT_FAILED_ACTION(err))
    }
}

function* FetchStudentSingleFeesDetails({data})
{
    try
    {
        const response = yield call(FetchStudentSingleFeesDetailsApi,data)
        yield put(FETCH_STUDENT_SINGLE_FEES_DETAILS_SUCCESS_ACTION(response.data))
    }
    catch(err)
    {
        yield put(FETCH_STUDENT_SINGLE_FEES_DETAILS_FAILED_ACTION(err))
    }
}

function* CategaryStudentSaga()
{
    yield takeLatest(FETCH_CATEGARY_STUDENT,FetchCategaryStudent)
    yield takeLatest(CREATE_FEES_CATEGARY_STUDENT,CreateFeesCategaryStudent)
    yield takeLatest(FETCH_STUDENT_SINGLE_FEES_DETAILS,FetchStudentSingleFeesDetails)
}

export default CategaryStudentSaga;