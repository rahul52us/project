import { CREATE_PDF_CATEGARY_SUCCESS } from "./actionType";
import { CREATE_PDF_CATEGARY_FAILED } from "./actionType";
import { FETCH_ALL_PDF_CATEGARIES_SUCCESS } from "./actionType";
import { FETCH_ALL_PDF_CATEGARIES_FAILED } from "./actionType";


const initialState ={

    newPdf : null,
    error : null,
    loading : false,
    allPdf : []

}

const CreatePdfCategaryReducer = (state=initialState,action) => {

    switch(action.type)
    {
        case CREATE_PDF_CATEGARY_SUCCESS:
            return {
                ...state,
                allPdf : [...state.allPdf,action.data],  
                newPdf : action.data,              
                loading : false
            }
        case CREATE_PDF_CATEGARY_FAILED:
            return {
                ...state,
                newPdf:null,
                error : action.data,
                loading : false
            }
        case FETCH_ALL_PDF_CATEGARIES_SUCCESS:
            return {
                ...state,
                allPdf:action.data,
                error : null,
                loading:false
            }
        case FETCH_ALL_PDF_CATEGARIES_FAILED:
            return {
                ...state,
                allPdf : [],
                error : action.data,
                loading : false                
            }
        default:
            return state;
    }
}

export default CreatePdfCategaryReducer;