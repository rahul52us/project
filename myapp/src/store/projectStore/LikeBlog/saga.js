import { takeLatest , call , put } from "redux-saga/effects";
import { LIKE_BLOG } from "./actionType";
import { LIKE_BLOG_SUCCESS_ACTION } from "./action";
import { LIKE_BLOG_FAILED_ACTION } from "./action";
import api from '../../../config/backendApi/BackendApi';

const LikeBlogApi = async(data) => {
    const response = await api.put('/api/blog/likeBlog',{BlogId : data.BlogId , userId : data.userId})
    return response
}

function* LikeBlogFunction({data})
{
    try
    {
        var response = yield call(LikeBlogApi,data)
        yield put(LIKE_BLOG_SUCCESS_ACTION(response.data))
    }
    catch(err)
    {
        yield put(LIKE_BLOG_FAILED_ACTION(err))
    }
}

function* LikeBlogSaga()
{
    yield takeLatest(LIKE_BLOG,LikeBlogFunction)
}

export default LikeBlogSaga;