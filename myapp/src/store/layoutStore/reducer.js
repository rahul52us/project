import { OPENCOLLAPSE_SUCCESS } from "./actionType";

const initialState = {
    collapse : false
}

const layOutReducer = (state=initialState,action) => {
    switch(action.type)
    {
        case OPENCOLLAPSE_SUCCESS:
            return {
                ...state,
                collapse : !state.collapse
            }
        default:
            return state
        
    }
}

export default layOutReducer;