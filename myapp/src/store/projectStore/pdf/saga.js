import { takeLatest , call , put } from "redux-saga/effects";
import api from "../../../config/backendApi/BackendApi";
import { GET_PDF_SUCCESS_ACTION, GET_PDF_FAILED_ACTION, CREATE_PDF_SUCCESS_ACTION, CREATE_PDF_FAILED_ACTION } from "./action";
import { GET_PDF } from "./actionType";
import { CREATE_PDF } from "./actionType";

const GetpdfApi = async(data) => 
{    
    const response = await api.post('/api/pdf/getAllPdf',{categary:data})
    return response
    //const response = await api.get(`/api/youtube/${data.selectVideoCategary}?page=${data.page}`)

}

const CreatePdfApi = async(data) => 
{
    const response =  await api.post('/api/pdf/create',data)
    return response

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

function* CreatePdfFuntion({data})
{
    try
    {
        var response = yield call(CreatePdfApi,data)
        yield put(CREATE_PDF_SUCCESS_ACTION(response.data))
    }
    catch(err)
    {
        console.log(err.message)
        yield put(CREATE_PDF_FAILED_ACTION(err.message))
    }
}

function* PdfSaga()
{
    yield takeLatest(GET_PDF,GetPdfFunction)
    yield takeLatest(CREATE_PDF,CreatePdfFuntion)
}

export default PdfSaga;