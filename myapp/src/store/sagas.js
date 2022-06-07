import {all} from 'redux-saga/effects';
import authUserSaga from './AuthStore/saga';
import VideoSaga from './projectStore/videos/saga';
import CreatePfdCategarySaga from './projectStore/pdf/createPdfCategaries/saga';
import BlogSaga from './projectStore/BlogStore/saga';
import LikeBlogSaga from './projectStore/LikeBlog/saga';
import QuizSaga from './projectStore/Quiz/saga';
import CommentSaga from './projectStore/CommentStore/saga';
import DashhUserSaga from './dashUserStore/saga';
import DashPdfSaga from './dashPdfStore/saga';
import GroupChatSaga from './DashchatStore/saga';
import layoutSaga from './layoutStore/saga';
import ChatMessageSaga from './ChatMessageStore/saga';
import CategaryStudentSaga from './StudentManageStore/saga';

function* rootSagas()
{
    yield all([
        authUserSaga(),
        VideoSaga(),        
        CreatePfdCategarySaga(),
        BlogSaga(),
        LikeBlogSaga(),
        CommentSaga(),
        QuizSaga(),
        DashhUserSaga(),
        DashPdfSaga(),
        GroupChatSaga(),
        ChatMessageSaga(),
        CategaryStudentSaga(),
        layoutSaga()
    ])
}

export default rootSagas;