import { takeLatest , put , call } from 'redux-saga/effects';
import { CREATE_PDF_CATEGARY, FETCH_ALL_PDF_CATEGARIES } from './actionType';
import api from '../../../../config/backendApi/BackendApi';
import { CREATE_PDF_CATEGARY_FAILED_ACTION, FETCH_ALL_PDF_CATEGARIES_FAILED_ACTION, FETCH_ALL_PDF_CATEGARIES_SUCCESS_ACTION } from './action';
import { CREATE_PDF_CATEGARY_SUCCESS_ACTION } from './action';


const CreatePdfCategaryApi = async(data) => {

        const response = await api.post('/api/pdf/createPdfCategary',{title : data })
        console.log(response)
        return response
}

const FetchAllPdfCategariesApi = async(data) => {

    const response = await api.get('/api/pdf/fetchpdfCategaries')
    return response

}

function* CreatePdfCategary({data})
{
    try
    {
        var response = yield call(CreatePdfCategaryApi,data)
        yield put(CREATE_PDF_CATEGARY_SUCCESS_ACTION(response.data))
    }
    catch(err)
    {
        yield put(CREATE_PDF_CATEGARY_FAILED_ACTION(err))
    }
}

function* fetchAllCategiesFunction()
{
    try
    {
        const response = yield call(FetchAllPdfCategariesApi)
        yield put(FETCH_ALL_PDF_CATEGARIES_SUCCESS_ACTION(response.data))

    }
    catch(err)
    {
        yield put(FETCH_ALL_PDF_CATEGARIES_FAILED_ACTION(err))
    }
}

function* CreatePfdCategarySaga()
{
    yield takeLatest(CREATE_PDF_CATEGARY , CreatePdfCategary)
    yield takeLatest(FETCH_ALL_PDF_CATEGARIES,fetchAllCategiesFunction)
}

export default CreatePfdCategarySaga;


