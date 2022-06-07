import { combineReducers } from "redux";
import AuthReducer from "./AuthStore/reducer";
import VideoReducer from "./projectStore/videos/reducer";
import CreatepdfCategaryReducer from "./projectStore/pdf/createPdfCategaries/reducer";
import BlogReducer from "./projectStore/BlogStore/reducer";
import LikeBlogReducer from "./projectStore/LikeBlog/reducer";
import QuizReducer from "./projectStore/Quiz/reducer";
import CommentReducer from "./projectStore/CommentStore/reducer";
import DashUserReducer from "./dashUserStore/reducer";
import DashPdfReducer from "./dashPdfStore/reducer";
import GroupChatReducer from "./DashchatStore/reducer";
import ChatMessageReducer from "./ChatMessageStore/reducer";
import layOutReducer from "./layoutStore/reducer";
import CategaryStudentReducer from "./StudentManageStore/reducer";
const rootReducers =  combineReducers({
    
    AuthReducer,
    VideoReducer,
    CreatepdfCategaryReducer,
    BlogReducer,
    LikeBlogReducer,
    QuizReducer,
    CommentReducer,
    DashUserReducer,
    DashPdfReducer,
    GroupChatReducer,
    ChatMessageReducer,   
    CategaryStudentReducer, 
    layOutReducer

})

export default rootReducers;

