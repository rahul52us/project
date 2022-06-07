import { takeLatest , put , call } from "redux-saga/effects";
import { CREATE_PDF, DELETE_DASH_PDF, GET_PDF } from "./actionType";
import { CREATE_PDF_SUCCESS_ACTION, DELETE_DASH_PDF_SUCCESS_ACTION, GET_PDF_FAILED_ACTION, GET_PDF_SUCCESS_ACTION } from "./action";
import { DELETE_DASH_PDF_FAILED_ACTION } from "./action";
import { CREATE_PDF_FAILED_ACTION } from "./action";
import { EDIT_PDF_FAILED_ACTION, EDIT_PDF_SUCCESS_ACTION } from "./action";
import { EDIT_PDF } from "./actionType";
import api from "../../config/backendApi/BackendApi";




const GetpdfApi = async(data) => 
{    
    const response = await api.post('/api/pdf/getAllPdf',{categary:data.categary,page:data.page})
    return response
    //const response = await api.get(`/api/youtube/${data.selectVideoCategary}?page=${data.page}`)

}

const DeletePdf = async(data) => {
    console.log(data)
    var {Id} = data
    const response = await api.post('/api/pdf/deletepdf',{_id:Id})
    console.log(response)
    return response
}

const CreatePdfApi = async(data) => 
{
    const response =  await api.post('/api/pdf/create',data)
    return response
}

const EditPdfApi = async(data) => {
    var {Id,contentData} = data
    const response =  await api.post('/api/pdf/editpdf',{_id:Id,contentData})        
    return response
}

function* DELETEDashPdfFunction({data})
{
    try
    {
        const response = yield call(DeletePdf,data)        
        yield put(DELETE_DASH_PDF_SUCCESS_ACTION({responseData:response.data,Data:data}))

    }
    catch(err)
    {
        yield put(DELETE_DASH_PDF_FAILED_ACTION(err))
    }
}



function* CreatePdfFuntion({data})
{
    try
    {
        var response = yield call(CreatePdfApi,data)
        yield put(CREATE_PDF_SUCCESS_ACTION(response.data))
    }
    catch(err)
    {        
        yield put(CREATE_PDF_FAILED_ACTION(err))
    }
}

function* GetPdfFunction({data})
{
    try
    {
        var response = yield call(GetpdfApi,data)
        yield put(GET_PDF_SUCCESS_ACTION(response))
    }
    catch(err)
    {
        console.log(err.message)
        yield put(GET_PDF_FAILED_ACTION(err.message))
    }
}

function* EditPdfFunction({data})
{
    try
    {
        var response = yield call(EditPdfApi,data)
        yield put(EDIT_PDF_SUCCESS_ACTION({responseData:response.data,Data:data}))
    }
    catch(err)
    {
        yield put(EDIT_PDF_FAILED_ACTION(err))
    }
}

function* DashPdfSaga()
{
    yield takeLatest(GET_PDF,GetPdfFunction)
    yield takeLatest(DELETE_DASH_PDF,DELETEDashPdfFunction)
    yield takeLatest(CREATE_PDF,CreatePdfFuntion)
    yield takeLatest(EDIT_PDF,EditPdfFunction)
}

export default DashPdfSaga;