import { LIKE_BLOG } from "./actionType";
import { LIKE_BLOG_SUCCESS } from "./actionType";
import { LIKE_BLOG_FAILED } from "./actionType";

export const LIKE_BLOG_ACTION = (data) => 
{
    return {
        type : LIKE_BLOG,
        data : data 
    }
}

export const LIKE_BLOG_SUCCESS_ACTION = (data) => 
{
    return {
        type : LIKE_BLOG_SUCCESS,
        data : data
    }
}

export const LIKE_BLOG_FAILED_ACTION = (data) =>
{
    return {
        type : LIKE_BLOG_FAILED,
        data : data
    }
}