import { takeLatest , call , all, take, put } from "redux-saga/effects";
import api from "../../../config/backendApi/BackendApi";
import { GET_VIDEOS_SUCCESS_ACTION, GET_VIDEOS_FAILED_ACTION, CREATE_YOUTUBE_CATEGARY_SUCCESS_ACTION, CREATE_YOUTUBE_CATEGARY_FAILED_ACTION, GET_YOUTUBE_CATEGARY_SUCCESS_ACTION, GET_YOUTUBE_CATEGARY_FAILED_ACTION, DELETE_YOUTUBE_VIDEOS_SUCCESS_ACTION, DELETE_YOUTUBE_VIDEOS_FAILED_ACTION, EDIT_YOUTUBE_VIDEOS_SUCCESS_ACTION, EDIT_YOUTUBE_VIDEOS_FAILED_ACTION, CREATE_VIDEOS_SUCCESS_ACTION, CREATE_VIDEOS_FAILED_ACTION } from "./action";
import { CREATE_VIDEOS, CREATE_YOUTUBE_CATEGARY, DELETE_YOUTUBE_VIDEOS, EDIT_YOUTUBE_VIDEOS, GET_VIDEOS, GET_YOUTUBE_CATEGARY } from "./actionType";


const GetVideoApi = async(data) => 
{
    console.log(data)
    const response = await api.get(`/api/youtube/${data.selectVideoCategary}?page=${data.page}`)
    return response
}

const CreateYoutubeCategaryApi = async(data) => {
    console.log(data)
    const response = await api.post('/api/youtube/create/youtubecategary',data)
    return response 
}


const GetYoutubeCategaryApi = async() => {
    const response = await api.get('/api/youtube/get/getYouTubeAllCategary')
    console.log(response)
    return response
}


const DeleteVideoApi = async(data) => {
    console.log(data)
    const response = await api.post('/api/youtube/delete',{id : data })
    console.log(response)
    return response
}


const EditVideoApi = async(data) => {
    console.log(data)
    var response = await api.put('/api/youtube/edit', data)
    console.log(response)
    return data    
}


const CreateYoutubeVideoApi = async(data) => {
    const response = await api.post('/api/youtube/create',data)
    return response
}

function* GetVideoFunction({data})
{
    try
    {
        var response = yield call(GetVideoApi,data)
        yield put(GET_VIDEOS_SUCCESS_ACTION(response))
    }
    catch(err)
    {
        yield put(GET_VIDEOS_FAILED_ACTION(err.message))
    }
}



function* CreateYoutubeCategaryFunction({data})
{
    try
    {
        const response = yield call(CreateYoutubeCategaryApi,data)
        yield put(CREATE_YOUTUBE_CATEGARY_SUCCESS_ACTION({response:response.data,Data:data}))
    }
    catch(err)
    {
        yield put(CREATE_YOUTUBE_CATEGARY_FAILED_ACTION(err.message))
    }
}

function* GetYoutubeCategaryFunction()
{
    try
    {
        const response = yield call(GetYoutubeCategaryApi)
        yield put(GET_YOUTUBE_CATEGARY_SUCCESS_ACTION(response.data))

    }
    catch(err)
    {
        yield put(GET_YOUTUBE_CATEGARY_FAILED_ACTION(err.message))
    }
}


function* DeleteVideoFunction({data})
{
    try
    {
        var response = yield call(DeleteVideoApi,data)
        yield put(DELETE_YOUTUBE_VIDEOS_SUCCESS_ACTION({response : response.data,Data : data}))

    }
    catch(err)
    {
        yield put(DELETE_YOUTUBE_VIDEOS_FAILED_ACTION(err))
    }
}

function* EditYoutubeFuction({data})
{
    try
    {
        var response = yield call(EditVideoApi,data)
        yield put(EDIT_YOUTUBE_VIDEOS_SUCCESS_ACTION({response : response,Data : data}))
    }
    catch(err)
    {
        yield put(EDIT_YOUTUBE_VIDEOS_FAILED_ACTION(err))
    }
}


function*  CreateYoutubeVideoFunction({data})
{
    try
    {
        const response = yield call(CreateYoutubeVideoApi,data)
        yield put(CREATE_VIDEOS_SUCCESS_ACTION(response.data))
    }
    catch(err)
    {
        yield put(CREATE_VIDEOS_FAILED_ACTION(err))
    }
}

function* VideoSaga()
{
    yield takeLatest(GET_VIDEOS,GetVideoFunction)
    yield takeLatest(CREATE_VIDEOS,CreateYoutubeVideoFunction)
    yield takeLatest(CREATE_YOUTUBE_CATEGARY,CreateYoutubeCategaryFunction)
    yield takeLatest(GET_YOUTUBE_CATEGARY,GetYoutubeCategaryFunction)
    yield takeLatest(DELETE_YOUTUBE_VIDEOS,DeleteVideoFunction)
    yield takeLatest(EDIT_YOUTUBE_VIDEOS,EditYoutubeFuction)
}

export default VideoSaga;