import { Notify } from "../../config/Notify/Notify"
import { FETCH_CATEGARY_STUDENT_FAILED, FETCH_CATEGARY_STUDENT_SUCCESS, CREATE_FEES_CATEGARY_STUDENT_FAILED, CREATE_FEES_CATEGARY_STUDENT_SUCCESS, UPDATE_FEES_CATEGARY_STUDENT_SUCCESS, UPDATE_FEES_CATEGARY_STUDENT_FAILED, FETCH_STUDENT_SINGLE_FEES_DETAILS_SUCCESS, FETCH_STUDENT_SINGLE_FEES_DETAILS_FAILED } from "./actionType"
    
const initialState = {
    AllStudent : [],
    FetchStudentLoading : false,
    error : null,
    hasMoreData:true,
    FetchScholarFees : null,
    FetchFeesLoading : false,  
    UpdateStudentFeesLoading : false,    
    singleFeesDetails : null
}

const UpdateCreateFeesCategary = (AllStudent,currentStudent) => {    
    var Index = AllStudent.findIndex((item)=> item.userId._id===currentStudent.userId)    
    if(Index.length!==1)
    {        
        AllStudent[Index].userId['ScholarFees'] = currentStudent._id        
    }
    return AllStudent
}

const CategaryStudentReducer = (state=initialState,action) => {
    switch(action.type)
    {
        case FETCH_CATEGARY_STUDENT_SUCCESS:
            Notify({type : 'success' , message :  `${action.data.length} users is loaded`})            
            return {
                AllStudent : [...state.AllStudent,...action.data],
                FetchStudentLoading : false,
                hasMoreData:action.data.length > 0 ? true : false,
                error : null
            }
        
        case FETCH_CATEGARY_STUDENT_FAILED:
            Notify({type : 'error' , message : `${action.data}`})
            return {
                AllStudent : state.AllStudent,
                error : action.data
            }
        case CREATE_FEES_CATEGARY_STUDENT_SUCCESS:                           
            return {
                ...state,
                AllStudent:UpdateCreateFeesCategary(state.AllStudent,action.data),
                error : null,
                FetchScholarFees : action.data,
                FetchFeesLoading:false
            }
        case CREATE_FEES_CATEGARY_STUDENT_FAILED:
            return {
                ...state,
                error : action.data,
                FetchFeesLoading : false,                
            }
        case UPDATE_FEES_CATEGARY_STUDENT_SUCCESS:
            return{
                ...state,
                UpdateStudentFeesLoading : false,
                UpdatedData : action.data,                
            }        
        case UPDATE_FEES_CATEGARY_STUDENT_FAILED:
            return {
                ...state,
                UpdateStudentFeesLoading : false,
                error : action.data
            }
        case FETCH_STUDENT_SINGLE_FEES_DETAILS_SUCCESS:
            return {
                ...state,
                UpdateStudentFeesLoading:false,
                singleFeesDetails:action.data
            }
        case FETCH_STUDENT_SINGLE_FEES_DETAILS_FAILED:
            return {
                ...state,
                UpdateStudentFeesLoading:false,
                error : action.data
            }
        default:
            return state;
    }
}
export default CategaryStudentReducer;