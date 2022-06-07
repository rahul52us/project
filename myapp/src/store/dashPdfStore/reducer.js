import { DELETE_DASH_PDF_SUCCESS, EDIT_PDF_FAILED, EDIT_PDF_SUCCESS } from "./actionType";
import { DELETE_DASH_PDF_FAILED } from "./actionType";
import { CREATE_PDF_SUCCESS } from "./actionType";
import { CREATE_PDF_FAILED } from "./actionType";
import { GET_PDF_SUCCESS } from "./actionType";
import { GET_PDF_FAILED } from "./actionType";


const initialState = {
    PDF : [],    
    loading : false,
    error : null,
    newPdf:null,
    hasMoreData:false,

}

const DeletePdfFunction = (AllPdf,data) => {    
    var ss = AllPdf.filter((item) => item._id!==data.Data.Id)  
    return ss
}

const EditPdfFunction = (AllPdf,data) => {
    console.log(data)
    var Index = AllPdf.findIndex((item) => item._id === data.Data.Id)
    if(Index!=-1)
    {
       AllPdf.splice(Index,1,data.responseData)
       return AllPdf
    }
    return AllPdf
}

const DashPdfReducer = (state=initialState,action) => {
    switch(action.type)
    {
        case GET_PDF_SUCCESS:
            return {
                ...state,
                PDF : [...state.PDF,...action.data.data],
                loading:false,
                hasMoreData : action.data.data.length > 0
            }
        case GET_PDF_FAILED:
            return {
                ...state,
                loading:false,
                PDF : [...state.PDF],
                error:action.data
            }            
        case DELETE_DASH_PDF_SUCCESS:            
            return {
                ...state,
                PDF : DeletePdfFunction(state.PDF,action.data),
                error : null,
                loading : false
            }
        case DELETE_DASH_PDF_FAILED:
            return {
                ...state,                
                error : action.data,
                loading : false                
            }
        case CREATE_PDF_SUCCESS:
                return {
                    ...state,
                    newPdf:action.data,
                    PDF:[...state.PDF,action.data],
                    loading:false,
                    error:null
                }                            
        case EDIT_PDF_SUCCESS:
            return {
                ...state,
                PDF : EditPdfFunction(state.PDF,action.data),
                loading : false,
                error : null
            }
        case CREATE_PDF_FAILED:
                return {
                    ...state,
                    newPdf:null,
                    loading:false,
                    error:action.data
            }
        case EDIT_PDF_FAILED:
            return{
                ...state,
                error: action.data,
                loading:false                
            }
        default:
            return state
    }
}
export default DashPdfReducer;