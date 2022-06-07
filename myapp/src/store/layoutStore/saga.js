import { takeLatest , call , put } from "redux-saga/effects";
import { OPENCOLLAPSE } from "./actionType";
import { OPENCOLLAPSE_SUCCESS_ACTION } from "./action";


function* openCollapseFunction({data})
{
    yield put(OPENCOLLAPSE_SUCCESS_ACTION(data))
}

function* layoutSaga()
{
    yield takeLatest(OPENCOLLAPSE,openCollapseFunction)
}

export default layoutSaga;