import { takeLatest , call , all, take, put } from "redux-saga/effects";
import api from "../../../config/backendApi/BackendApi";
import { CREATE_COMMENT } from "./actionType";
import { CREATE_COMMENT_SUCCESS_ACTION } from "./action";
import { CREATE_COMMENT_FAILED_ACTION } from "./action";


const CreateCommentApi = async (data) => 
{
    const response = await api.post('/api/comment/create',data)
    return response
}

function* CreateCommentFunction({data})
{
    try
    {
        const response = yield call(CreateCommentApi,data)
        yield put(CREATE_COMMENT_SUCCESS_ACTION(response.data))
    }
    catch(err)
    {
        yield put(CREATE_COMMENT_FAILED_ACTION(err.message))
    }
}


function* CommentSaga()
{
    yield takeLatest(CREATE_COMMENT,CreateCommentFunction)
}

export default CommentSaga;