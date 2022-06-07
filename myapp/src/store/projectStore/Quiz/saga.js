import { takeLatest , call , all, take, put } from "redux-saga/effects";
import api from "../../../config/backendApi/BackendApi";
import { CREATE_BLOG_FAILED_ACTION } from "../BlogStore/action";
import { CREATE_NEW_QUIZ_SUCCESS_ACTION, CREATE_QUIZ_CATEGARY_FAILED_ACTION, CREATE_QUIZ_CATEGARY_SUCCESS_ACTION, DELETE_QUIZ_FAILED_ACTION, DELETE_QUIZ_SUCCESS_ACTION, GET_QUIZ_CATEGARY_FAILED_ACTION, GET_QUIZ_CATEGARY_SUCCESS_ACTION } from "./action";
import { CREATE_NEW_QUIZ, CREATE_QUIZ_CATEGARY, GET_ALL_CATEGARY_QUIZ, GET_QUIZ_CATEGARY } from "./actionType";
import { GET_ALL_CATEGARY_QUIZ_SUCCESS_ACTION } from "./action";
import { GET_ALL_CATEGARY_QUIZ_FAILED_ACTION } from "./action";
import { CREATE_NEW_CATEGARY_TOPIC } from "./actionType";
import { CREATE_NEW_CATEGARY_TOPIC_SUCCESS_ACTION } from "./action";
import { CREATE_NEW_CATEGARY_TOPIC_FAILED_ACTION } from "./action";
import { DELETE_QUIZ } from "./actionType";
import { EDIT_QUIZ_QUESTION } from "./actionType";
import { EDIT_QUIZ_QUESTION_SUCCESS_ACTION } from "./action";
import { EDIT_QUIZ_QUESTION_FAILED_ACTION } from "./action";



const QuizCreateApi = async(data) => {
    const response = await api.post('/api/quiz/create',data)
    return response
}


const GetQuizApi = async(data) => {
    console.log(data)
    const response = await api.post('/api/quiz/get/Allquiz',{categary : data.Categary , Topic : data.Topic , Page : data.Page})
    return response
}



const CreateQuizCategaryApi = async(data) => {
    console.log(data)
    const response = await api.post('/api/quiz/createQuizCategary',{categary : data })
    console.log(response)
    return response
}



const GetQuizCategaryApi = async() => {
    const response = await api.get('/api/quiz/getQuizCategary')
    return response
}


const AddNewCategaryTopicApi = async(data) => {
    console.log(data)
    const response =  await api.put('/api/quiz/addNewCategaryTopic',data)
    return response
    
}


const DeleteQuizApi = async(data) => {
    
    const response = await api.post('/api/quiz/deletequiz',{Id : data})
    return response
}

const EditQuizQuestionApi = async(data) => {
    console.log(data)
    const response = await api.put('/api/quiz/editQuizQuestion',data)
    console.log(response)
    return response    
}


function* QuizCreateFunction({data})
{
    try
    {
        const response = yield call(QuizCreateApi,data)
        yield put(CREATE_NEW_QUIZ_SUCCESS_ACTION(response.data))
    }
    catch(err)
    {
        yield put(CREATE_BLOG_FAILED_ACTION(err.message))
    }
}

function* GetQuizFunction({data})
{
    try
    {
        const response = yield call(GetQuizApi,data)
        yield put(GET_ALL_CATEGARY_QUIZ_SUCCESS_ACTION(response.data))
    }
    catch(err)
    {
        yield put(GET_ALL_CATEGARY_QUIZ_FAILED_ACTION(err.message))
    }
}

function* CreateQuizCategaryFunction({data})
{
    try
    {
        var response = yield call(CreateQuizCategaryApi,data)
        yield put(CREATE_QUIZ_CATEGARY_SUCCESS_ACTION(response.data))
    }
    catch(err)
    {
        yield put(CREATE_QUIZ_CATEGARY_FAILED_ACTION(err.message))
    }
}


function* GetQuizCategaryFunction()
{
    try
    {
        const response = yield call(GetQuizCategaryApi)
        yield put(GET_QUIZ_CATEGARY_SUCCESS_ACTION(response.data))
    }
    catch(err)
    {
        yield put(GET_QUIZ_CATEGARY_FAILED_ACTION(err.message))
    }
}


function* AddNewCategaryTopicFunction({data})
{
    try
    {
        const response = yield call(AddNewCategaryTopicApi,data)
        yield put(CREATE_NEW_CATEGARY_TOPIC_SUCCESS_ACTION({responseData : response,Data : data }))
    }
    catch(err)
    {
        yield put(CREATE_NEW_CATEGARY_TOPIC_FAILED_ACTION(err))
    }
}


function* DeleteQuizFunction({data})
{
    try
    {
        const response = yield call(DeleteQuizApi,data)
        yield put(DELETE_QUIZ_SUCCESS_ACTION({response : response.data , Data : data}))
    }
    catch(err)
    {
        yield put(DELETE_QUIZ_FAILED_ACTION(err))
    }
}


function* EditQuestionQuizFunction({data})
{
    try
    {
        const response = yield call(EditQuizQuestionApi,data)
        yield put(EDIT_QUIZ_QUESTION_SUCCESS_ACTION({response : response.data , Data : data}))
    }
    catch(err)
    {
        yield put(EDIT_QUIZ_QUESTION_FAILED_ACTION(err))
    }
}


function* QuizSaga()
{
    yield takeLatest(CREATE_NEW_QUIZ,QuizCreateFunction)    
    yield takeLatest(GET_ALL_CATEGARY_QUIZ,GetQuizFunction)
    yield takeLatest(CREATE_QUIZ_CATEGARY,CreateQuizCategaryFunction)
    yield takeLatest(GET_QUIZ_CATEGARY,GetQuizCategaryFunction)
    yield takeLatest(CREATE_NEW_CATEGARY_TOPIC,AddNewCategaryTopicFunction)
    yield takeLatest(DELETE_QUIZ,DeleteQuizFunction)
    yield takeLatest(EDIT_QUIZ_QUESTION,EditQuestionQuizFunction)
}


export default QuizSaga;