import { LIKE_BLOG_SUCCESS } from "./actionType";
import { LIKE_BLOG_FAILED } from "./actionType";

const initialState = {

    blogLiked : null,
    error : null,
    loading : false
}

const LikeBlogReducer = (state=initialState,action) => {

    switch(action.type)
    {
        case LIKE_BLOG_SUCCESS:
            return {
                ...state,
                blogLiked : action.data,
                loading:false,
                error : null                
            }
        
        case LIKE_BLOG_FAILED:
            return {
                ...state,
                blogLiked : action.data,
                loading:false,
                error : action.data
            }
        default:
            return state;
    }
}

export default LikeBlogReducer;