import { GET_PDF_SUCCESS } from "./actionType";
import { GET_PDF_FAILED } from "./actionType";
import { CREATE_PDF_SUCCESS } from "./actionType";
import { CREATE_PDF_FAILED } from "./actionType";


const initialState = {
    PDF : [],
    error : null,
    loading: false,
    hasMoreData:false,
    newPdf:null 
}

const PdfReducer = (state=initialState,action) => {

    switch(action.type)
    {
        case GET_PDF_SUCCESS:
            return {
                ...state,
                PDF :[...state.PDF,...action.data.data],
                loading:false,
                hasMoreData : action.data.data.length > 0
            }
        case GET_PDF_FAILED:
            return {
                ...state,
                PDF : [...state.PDF],
                error:action.data,
                loading:false
            }

        case CREATE_PDF_SUCCESS:
            return {
                ...state,
                newPdf:action.data,
                loading:false,
                error:null
            }
                        
        case CREATE_PDF_FAILED:
            return {
                ...state,
                newPdf:null,
                error:action.data,
                loading:false,
            }
        default:
            return state                                    
    }
}
export default PdfReducer;
