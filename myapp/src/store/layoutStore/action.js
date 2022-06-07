import { OPENCOLLAPSE, OPENCOLLAPSE_FAILED, OPENCOLLAPSE_SUCCESS  } from "./actionType";

export const OPENCOLLAPSE_ACTION = (data) => {
    return {
        type : OPENCOLLAPSE,
        data : data
    }
}

export const OPENCOLLAPSE_SUCCESS_ACTION = (data) => {
    return {
        type : OPENCOLLAPSE_SUCCESS,
        data : data
    }
}

export const OPENCOLLAPSE_FAILED_ACTION = (data) => {
    return {
        type : OPENCOLLAPSE_FAILED,
        data : data
    }
}