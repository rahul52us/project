import { DELETE_BLOG_COMMENT_SUCCESS, GET_BLOG_SUCCESS } from "./actionType";
import { GET_BLOG_FAILED } from "./actionType";
import { CREATE_BLOG_SUCCESS } from "./actionType";
import { CREATE_BLOG_FAILED } from "./actionType";


const initialState = {
    BLOG : [],
    error : null,
    loading: true,
    hasMoreData:false,
    newBlog:null 
}

const DeleteBlogCommentFunction = (AllBlog,response) => {
        
    var Index = AllBlog.findIndex((item) => item._id == response.Blog)    
    console.log('all comments is ',AllBlog)
    console.log(Index)
    if(Index !== -1)
    {
        var FilterComment = AllBlog[Index].comments.filter((item) => item._id !== response._id)

        console.log('the filter comment is ',FilterComment)
        AllBlog[Index].comments = FilterComment        
    }
    return AllBlog
}


const BlogReducer = (state=initialState,action) => {

    switch(action.type)
    {
        case GET_BLOG_SUCCESS:
            return {
                ...state,
                BLOG :[...state.BLOG,...action.data.data],
                loading:false,
                hasMoreData :  action.data.data.length > 0
            }
        case GET_BLOG_FAILED:
            return {
                ...state,
                BLOG : [...state.BLOG],
                error:action.data
            }
        case CREATE_BLOG_SUCCESS:
            return {
                ...state,
                newBlog:action.data,
                loading:false,
                error:null
            }
        case CREATE_BLOG_FAILED:
            return {
                ...state,
                newBlog:null,
                error:action.data
            }
        case DELETE_BLOG_COMMENT_SUCCESS:
            return {
                ...state,
                BLOG : DeleteBlogCommentFunction(state.BLOG,action.data),
                loading : false,
                error : null
            }
        default:
            return state                                    
    }
}
export default BlogReducer;
