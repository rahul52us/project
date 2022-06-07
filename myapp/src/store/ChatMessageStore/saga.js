import { takeLatest , put , call, take } from "redux-saga/effects";
import api from "../../config/backendApi/BackendApi";
import { ACTIVATE_SOCKET_SUCCESS_ACTION, ADD_MESSAGE_NOTIFICATION_TO_CHAT_SUCCESS_ACTION, APPEND_SOCKET_NEW_MESSAGE_SUCCESS_ACTION, CREATE_NEW_CHAT_MESSAGE_FAILED_ACTION, CREATE_NEW_CHAT_MESSAGE_SUCCESS_ACTION, GET_CHAT_MESSAGE_FAILED_ACTION, GET_CHAT_MESSAGE_SUCCESS_ACTION, REMOVE_MESSAGE_NOTIFICATION_FROM_CHAT_SUCCESS_ACTION, SELECTED_CHAT_NULL_SUCCESS_ACTION, SELECTED_CHAT_SUCCESS_ACTION } from "./actions";
import { ACTIVATE_SOCKET, CREATE_NEW_CHAT_MESSAGE, GET_CHAT_MESSAGE , APPEND_SOCKET_NEW_MESSAGE, ADD_MESSAGE_NOTIFICATION_TO_CHAT, REMOVE_MESSAGE_NOTIFICATION_FROM_CHAT, SELECTED_CHAT, SELECTED_CHAT_NULL } from "./actionType";



const GetChatMessageApi = async(data) => {
    const response = await api.get(`/api/message/getMessages/${data.chatId}`)
    return response
}


const CreateNewChatMessageApi = async(data) => {
    const response = await api.post('/api/message/create',data)
    return response
}

function* GetChatMessageFunction({data})
{
    try
    {
        const response = yield call(GetChatMessageApi,data)
        yield put(GET_CHAT_MESSAGE_SUCCESS_ACTION(response.data))
    }
    catch(err)
    {
        yield put(GET_CHAT_MESSAGE_FAILED_ACTION(err))
    }
}

function* CreateChatMessageFunction({data})
{
    try
    {
        const response = yield call(CreateNewChatMessageApi,data)
        yield put(CREATE_NEW_CHAT_MESSAGE_SUCCESS_ACTION(response.data))
    }
    catch(err)
    {
        yield put(CREATE_NEW_CHAT_MESSAGE_FAILED_ACTION(err))
    }
}

function* ActivateSocketFunction({data})
{
    yield put(ACTIVATE_SOCKET_SUCCESS_ACTION(data))
}

function*  AppendSocketNewMessageFunction({data})
{
    yield put(APPEND_SOCKET_NEW_MESSAGE_SUCCESS_ACTION(data))
}

function* AddChatMessageNoticationFunction({data})
{
    yield put(ADD_MESSAGE_NOTIFICATION_TO_CHAT_SUCCESS_ACTION(data))
}

function* RemoveMessageNotificationFunction({data})
{
    yield put(REMOVE_MESSAGE_NOTIFICATION_FROM_CHAT_SUCCESS_ACTION(data))
}

function* SelectedChatFunction({data})
{
    yield put(SELECTED_CHAT_SUCCESS_ACTION(data))
}

function* SelectChatNullFunction({data})
{
    yield put(SELECTED_CHAT_NULL_SUCCESS_ACTION(data))
}

function* ChatMessageSaga()
{
    yield takeLatest(GET_CHAT_MESSAGE,GetChatMessageFunction)
    yield takeLatest(CREATE_NEW_CHAT_MESSAGE,CreateChatMessageFunction)
    yield takeLatest(ACTIVATE_SOCKET,ActivateSocketFunction)
    yield takeLatest(APPEND_SOCKET_NEW_MESSAGE,AppendSocketNewMessageFunction)
    yield takeLatest(ADD_MESSAGE_NOTIFICATION_TO_CHAT,AddChatMessageNoticationFunction)
    yield takeLatest(REMOVE_MESSAGE_NOTIFICATION_FROM_CHAT,RemoveMessageNotificationFunction)
    yield takeLatest(SELECTED_CHAT,SelectedChatFunction)
    yield takeLatest(SELECTED_CHAT_NULL,SelectChatNullFunction)
}

export default ChatMessageSaga;