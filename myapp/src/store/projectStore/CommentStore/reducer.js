import { CREATE_COMMENT_SUCCESS } from "./actionType";
import { CREATE_COMMENT_FAILED } from "./actionType";


const initialState = {
    newComment : null,
    allComment : [],
    error : null,
    loading : false
}

const CommentReducer = (state = initialState , action) => {

    switch(action.type)
    {
        case CREATE_COMMENT_SUCCESS:
            return {
                ...state,
                newComment : action.data,
                loading : false,
                error : null
            }
        case CREATE_COMMENT_FAILED:
            return {
                ...state,
                error : action.data,
                newComment:null,
                loading : false
            }
        default:
            return state;
    }
}

export default CommentReducer;
