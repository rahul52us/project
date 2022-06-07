import { CREATE_COMMENT } from "./actionType";
import { CREATE_COMMENT_SUCCESS } from "./actionType";
import { CREATE_COMMENT_FAILED } from "./actionType";

export const CREATE_COMMENT_ACTION = (data) => {
    return {
        type : CREATE_COMMENT,
        data : data
    }
}

export const CREATE_COMMENT_SUCCESS_ACTION = (data) => {
    return {
        type : CREATE_COMMENT_SUCCESS,
        data : data
    }
}

export const CREATE_COMMENT_FAILED_ACTION = (data) => {
    return {
        type : CREATE_COMMENT_FAILED,
        data : data
    }
}