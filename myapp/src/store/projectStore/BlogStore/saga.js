import { takeLatest , call , all, take, put } from "redux-saga/effects";
import api from "../../../config/backendApi/BackendApi";
import { GET_BLOG_SUCCESS_ACTION, GET_BLOG_FAILED_ACTION, CREATE_BLOG_SUCCESS_ACTION, CREATE_BLOG_FAILED_ACTION, DELETE_BLOG_COMMENT_FAILED_ACTION } from "./action";
import { CREATE_BLOG, GET_BLOG } from "./actionType";
import { DELETE_BLOG_COMMENT_SUCCESS_ACTION } from "./action";
import { DELETE_BLOG_COMMENT } from "./actionType";


const GetBlogApi = async(page) => 
{    
    const response = await api.get(`/api/blog/getBlogs/${page}`,)
    return response
}

const CreateBlogApi = async(data) => 
{    
    const response = await api.post(`/api/blog/create/`,data)
    return response
}


const DeleteBlogCommentFunction = async(data) => {
    const response = await api.post('api/comment/delete',data)
    return response
}

function* GetBlogFunction({data})
{
    try
    {
        var response = yield call(GetBlogApi,data)
        yield put(GET_BLOG_SUCCESS_ACTION(response))
    }
    catch(err)
    {
        yield put(GET_BLOG_FAILED_ACTION(err.message))
    }
}

function* CreateBlogFunction({data})
{
    try
    {
        var response = yield call(CreateBlogApi,data)
        yield put(CREATE_BLOG_SUCCESS_ACTION(response))
    }
    catch(err)
    {
        yield put(CREATE_BLOG_FAILED_ACTION(err.message))
    }
}

function* DeleteBlogComment({data})
{
    try
    {
        var response = yield call(DeleteBlogCommentFunction,data)
        yield put(DELETE_BLOG_COMMENT_SUCCESS_ACTION(response.data))
    }
    catch(err)
    {
        yield put(DELETE_BLOG_COMMENT_FAILED_ACTION(err.message))
    }
}

function* BlogSaga()
{
    yield takeLatest(GET_BLOG,GetBlogFunction)
    yield takeLatest(CREATE_BLOG,CreateBlogFunction)
    yield takeLatest(DELETE_BLOG_COMMENT,DeleteBlogComment)
}

export default BlogSaga;