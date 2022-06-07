import { CREATE_YOUTUBE_CATEGARY_FAILED, CREATE_YOUTUBE_CATEGARY_SUCCESS, GET_VIDEOS_SUCCESS, GET_YOUTUBE_CATEGARY_FAILED, GET_YOUTUBE_CATEGARY_SUCCESS } from "./actionType";
import { GET_VIDEOS_FAILED } from "./actionType";
import { CREATE_VIDEOS_SUCCESS } from "./actionType";
import { CREATE_VIDEOS_FAILED } from "./actionType";
import { DELETE_YOUTUBE_VIDEOS_SUCCESS } from "./actionType";
import { DELETE_YOUTUBE_VIDEOS_FAILED } from "./actionType";
import { EDIT_YOUTUBE_VIDEOS_SUCCESS } from "./actionType";
import { EDIT_YOUTUBE_VIDEOS_FAILED } from "./actionType";

const DeleteVideoFunction = (AllVideo,responseData) => {    
    var filterData = AllVideo.filter((item)=> item._id!==responseData.Data) 
    return filterData
}


const EditYoutubeFuction = (AllVideo,responseData) => {
    var Index = AllVideo.findIndex((item) => item._id === responseData.Data._id)    
    if(Index!==-1)
    {
        AllVideo.splice(Index,1,responseData.response)          
    }
    return AllVideo
} 

const initialState = {
    videos : [],
    error : null,
    loading: false,
    hasMoreData:false,
    newVideo:null,
    YoutubeCategary:[],
    deletedVideo:null
}

const VideoReducer = (state=initialState,action) => {

    switch(action.type)
    {
        case GET_VIDEOS_SUCCESS:
            return {
                ...state,
                videos :[...state.videos,...action.data.data],
                loading:false,
                hasMoreData : action.data.data.length > 0
            }
        case GET_VIDEOS_FAILED:
            return {
                ...state,
                videos : [...state.videos],
                error:action.data
            }
        case DELETE_YOUTUBE_VIDEOS_SUCCESS:
            return {
                ...state,
                videos : DeleteVideoFunction(state.videos,action.data),
                error : null,
                deletedVideo:action.data,
                loading:false                
            }
        case DELETE_YOUTUBE_VIDEOS_FAILED:
            return {
                ...state,
                videos : state.videos,
                error : action.data,
                loading:false
            }
        case CREATE_VIDEOS_SUCCESS:
            return {
                ...state,
                videos:[...state.videos,action.data],
                newVideo:action.data,
                loading:false,
                error:null
            }
        case CREATE_VIDEOS_FAILED:
            return {
                ...state,
                newVideo:null,
                error:action.data
            }
        case CREATE_YOUTUBE_CATEGARY_SUCCESS:
            console.log(state.YoutubeCategary)
            console.log(action.data)
            return {
                ...state,
                YoutubeCategary:[...state.YoutubeCategary,action.data.response],                
                loading : false,
                error:null
            }
        case CREATE_YOUTUBE_CATEGARY_FAILED:
            return {
                ...state,
                loading : false,
                error : action.data,
                YoutubeCategary:[...state.YoutubeCategary]
            }
        case GET_YOUTUBE_CATEGARY_SUCCESS:
            return {
                ...state,
                loading :false,
                YoutubeCategary : action.data,
                error : null
            }
        case GET_YOUTUBE_CATEGARY_FAILED: 
        return {
            ...state,
            loading:false,
            YoutubeCategary:state.YoutubeCategary,
            error : action.data
        }

        case EDIT_YOUTUBE_VIDEOS_SUCCESS:
            return {
                ...state,
                loading :false,
                YoutubeCategary : EditYoutubeFuction(state.videos,action.data),
                error : null
            }
        case EDIT_YOUTUBE_VIDEOS_FAILED: 
        return {
            ...state,
            loading:false,
            YoutubeCategary:state.YoutubeCategary,
            error : action.data
        }


        default:
            return state                                    
    }
}

export default VideoReducer;
