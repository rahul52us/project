import { GET_USERS_SUCCESS, GET_USERS_FAILED, CREATE_USER_ACCESS_PDF_SUCCESS, CREATE_USER_ACCESS_PDF_FAILED, CREATE_NEW_DASH_USER_FAILED, CREATE_NEW_DASH_USER_SUCCESS, BLOCK_USER_SUCCESS, BLOCK_USER_FAILED, GET_BLOCK_USER_SUCCESS, GET_BLOCK_USER_FAILED, GET_BLOCK_USER, UPDATE_EXTRA_INFO_USER_SUCCESS } from "./actionType";
import { DELETE_PDF_ACCESS_SUCCESS } from "./actionType";
import { DELETE_PDF_ACCESS_FAILED } from "./actionType";
import { DELETE_USER_TOKEN_SUCCESS } from "./actionType";
import { DELETE_USER_TOKEN_FAILED } from "./actionType";
import { UNBLOCK_USER_SUCCESS } from "./actionType";
import { UNBLOCK_USER_FAILED } from "./actionType";

const initialState = {    
    error : null,
    loading : true,
    headers:[],
    AllUsers:[],
    hasMoreUser:false,
    newAccessPdf : null,
    newCreateUser : null,
    deletedToken : null,
    newblockUser : null,
    BlockUser : [],
    hasMoreBlockUser:null,
    unblockuser : null
}
function DeletePdfFunction(AllUsers,responseData)
{
    try
    {
        var Index = AllUsers.findIndex((item) => item._id === responseData.data.userId)
        if(Index!==-1)
        {
            var filterpdf = AllUsers[Index].pdfAccess.filter((item) => item!==responseData.data.DeletePdf)           
            AllUsers[Index].pdfAccess = filterpdf            
        }
        else
        {
            return AllUsers    
        }                           
    }
    catch(err)
    {
        return AllUsers
    }
    return AllUsers
}
function AddPdfAccessFunction(AllUsers,responseData)
{
    try
    {
        var Index = AllUsers.findIndex((item) => item._id === responseData.data.userId)
        if(Index!==-1)
        {
            AllUsers[Index].pdfAccess.push(responseData.data.Addpdf)
        }
        else
        {
            return AllUsers    
        }                           
    }
    catch(err)
    {
        return AllUsers
    }
    return AllUsers
}
function BlockUserReducerFunction(AllBlockState,responseData)
{
    AllBlockState.push(responseData.responseData)
    return AllBlockState
}
function AfterBlockAllUserFunction(AllUsers,BlockUser)
{
    var AllUser = AllUsers.filter((item) => item._id !== BlockUser.responseData._id)
    return AllUser
}
function DeleteUserTokenFunction(AllData,responseData)
{
    
    const Index = AllData.findIndex((item) => item._id===responseData.responseData._id)    
    if(Index!==-1)
    {
        AllData.splice(Index,1,responseData.responseData)
        return AllData
    }
    return AllData
}
const FilterUnBlockUserFunction = (BlockUsers,user) => {
    var FilterBlockUser = BlockUsers.filter((item) => item._id!==user._id)
    return FilterBlockUser
}
const UpdateExtraInfoUserFunction = (AllUser,response) => {
    var Index = AllUser.findIndex((item) => item._id === response._id)
    if(Index!==-1)
    {
        AllUser.splice(Index,1,response)
    }
    return AllUser
}

const DashUserReducer = (state=initialState,action) => {        
    switch(action.type)
    {
        case CREATE_NEW_DASH_USER_SUCCESS:
            return {
                ...state,
                AllUsers:[...state.AllUsers,action.data],
                loading : false,
                error:null,
                newCreateUser : action.data
            }
        case CREATE_NEW_DASH_USER_FAILED:
            return {
                ...state,
                AllUsers : [...state.AllUsers],
                loading:false,
                error : action.data,
                newCreateUser : null
            }
        case GET_USERS_SUCCESS:
            return {
                ...state,
                hasMoreUser:action.data.users.length > 0 ? true : false,
                AllUsers : [...state.AllUsers,...action.data.users],
                headers:action.data.headers,
                loading : false,
                error : null
            }
        case GET_USERS_FAILED:
            return {
                ...state,
                AllUsers : [...state.AllUsers],
                loading : false,
                error : action.data
            }
        case DELETE_PDF_ACCESS_SUCCESS:
            return {     
                ...state,
                AllUsers : DeletePdfFunction([...state.AllUsers],action.data),
                loading : false,                                     
            }
        case DELETE_PDF_ACCESS_FAILED:
            return {
                ...state,
                AllUsers : [...state.AllUsers],
                loading : false,
                error : action.data
            }
        case CREATE_USER_ACCESS_PDF_SUCCESS:            
            return {
                ...state,
                AllUsers :  AddPdfAccessFunction([...state.AllUsers],action.data),
                loading:false,
                error : action.data
            }
        case CREATE_USER_ACCESS_PDF_FAILED:
            return {
                ...state,
                newAccessPdf:null,
                loading:false,
                error:null
            }
        case DELETE_USER_TOKEN_SUCCESS:
            return {
                ...state,
                AllUsers : DeleteUserTokenFunction(state.AllUsers,action.data),
                deletedToken : action.data,
                error : null,
                loading:false
            }
        case DELETE_USER_TOKEN_FAILED:
            return {
                ...state,
                error : action.data,
                deletedToken:null,
                loading:false
            }
        case BLOCK_USER_FAILED:
            return {
                ...state,
                error :action.data,
                loading : false,
                BlockUser : state.BlockUser,
                newblockUser:null,
                AllUsers:state.AllUsers
            }
        case  BLOCK_USER_SUCCESS:
        return {
            ...state,
            newblockUser:action.data,
            error : null,            
            BlockUser:BlockUserReducerFunction(state.BlockUser,action.data),
            AllUsers : AfterBlockAllUserFunction(state.AllUsers,action.data),
            loading :false,
        }
        case GET_BLOCK_USER_SUCCESS:
            console.log(action.data)
            return {
                ...state,
                error : null,
                hasMoreBlockUser : action.data.length > 0 ? true : false,
                BlockUser : [...state.BlockUser,...action.data],
                loading : false
            }            
        case GET_BLOCK_USER_FAILED:
            return {
                ...state,
                error : action.data,
                BlockUser : state.BlockUser,
                loading : false                
            }            
        case UNBLOCK_USER_SUCCESS:
            return {
                ...state,
                error : null,
                loading : false,
                unblockuser:action.data,
                BlockUser : FilterUnBlockUserFunction(state.BlockUser,action.data),
                AllUsers : [...state.AllUsers,action.data]
            }
        case UNBLOCK_USER_FAILED:
            return {
                ...state,
                error:action.data,
                loading : false,
                unblockuser : null,
                AllUsers : state.AllUsers
            }
        case UPDATE_EXTRA_INFO_USER_SUCCESS:
            return {
                ...state,
                AllUser : UpdateExtraInfoUserFunction(state.AllUsers,action.data),
                loading:false
            }
        default:
            return state;
    }
}
export default DashUserReducer;