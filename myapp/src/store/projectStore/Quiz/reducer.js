import { CREATE_NEW_QUIZ_SUCCESS, CREATE_QUIZ_CATEGARY_FAILED, CREATE_QUIZ_CATEGARY_SUCCESS, EDIT_QUIZ_QUESTION_FAILED, EDIT_QUIZ_QUESTION_SUCCESS, GET_QUIZ_CATEGARY_FAILED, GET_QUIZ_CATEGARY_SUCCESS } from "./actionType";
import { CREATE_NEW_QUIZ_FAILED } from "./actionType";
import { GET_ALL_CATEGARY_QUIZ_FAILED } from "./actionType";
import { GET_ALL_CATEGARY_QUIZ_SUCCESS } from "./actionType";
import { CREATE_NEW_CATEGARY_TOPIC_SUCCESS } from "./actionType";
import { CREATE_NEW_CATEGARY_TOPIC_FAILED } from "./actionType";
import { DELETE_QUIZ , DELETE_QUIZ_SUCCESS , DELETE_QUIZ_FAILED } from "./actionType";

const initialState = {
    loading : false,
    newQuiz : null,    
    error : null,
    quiz : [],
    QuizCategary : [],
    newQuizCategary : null,
    deleteQuiz : null,
    hasMoreQuiz : false
}


const AddTopicFunction = (AllCategary,responseData) => 
{
    return AllCategary
}


const DeleteQuizFunction = (AllQuiz,responseData) => 
{
    var FilterData = AllQuiz.filter((item) => item._id!==responseData.Data)
    return FilterData    

}


const EditQuizQuestionFunction = (AllQuestion,responseData) => {

    console.log(responseData)
    var Index = AllQuestion.findIndex((item) => item._id === responseData.Data.Id)
    if(Index!==-1)
    {
        AllQuestion[Index] = responseData.response
        console.log(AllQuestion)
    }
    return AllQuestion
}


const QuizReducer = (state=initialState,action) => {

    switch(action.type)
    {        
        case CREATE_NEW_QUIZ_SUCCESS:
            return {
                ...state,
                quiz : [...state.quiz,action.data],
                newQuiz : action.data,
                loading : false,
                error : null
            }
        case CREATE_NEW_QUIZ_FAILED:
            return {
                ...state,
                newQuiz : null,
                error : action.data,
                loading:false
            }
        case DELETE_QUIZ_SUCCESS:
            return {
                ...state,
                quiz : DeleteQuizFunction(state.quiz,action.data),
                deleteQuiz : action.data,
                loading:false,
                error : null
            }
        case DELETE_QUIZ_FAILED:
            return {
                ...state,
                loading : false,
                error : action.data                
            }        
        case GET_ALL_CATEGARY_QUIZ_SUCCESS:
            console.log(action.data)
            console.log(action.data.length > 0)
            return {
                ...state,
                quiz : [...state.quiz,...action.data],
                loading : false,
                hasMoreData :  action.data.length > 0
            }
        case GET_ALL_CATEGARY_QUIZ_FAILED:
            return {
                ...state,
                quiz : state.quiz,
                loading : false,              
            }
        case GET_QUIZ_CATEGARY_SUCCESS:
            return {
                ...state,
                QuizCategary:action.data,
                loading:false,                
            }
        case GET_QUIZ_CATEGARY_FAILED:
            return{
                ...state,
                QuizCategary : state.QuizCategary,
                error : action.data,
                loading:false
            }
        case CREATE_QUIZ_CATEGARY_SUCCESS:
            return{
                ...state,
                QuizCategary : [...state.QuizCategary,action.data],
                newQuizCategary : action.data,
                loading:false
            }
        case CREATE_QUIZ_CATEGARY_FAILED:
            return {
                ...state,
                QuizCategary : [...state.QuizCategary],
                error : action.data,
                loading:false
            }
        case CREATE_NEW_CATEGARY_TOPIC_SUCCESS:
            return {
                ...state,
                QuizCategary : AddTopicFunction(state.QuizCategary,action.data),
                loading : false,
                error : null
            }

        case CREATE_NEW_CATEGARY_TOPIC_FAILED:
            return {
                ...state,
                QuizCategary:[...state.QuizCategary],
                loading : false,
                error : action.data
            }        

        case EDIT_QUIZ_QUESTION_SUCCESS:
            return {
                ...state,
                quiz : EditQuizQuestionFunction(state.quiz,action.data),
                loading : false            
            }

        case EDIT_QUIZ_QUESTION_FAILED:
            return {
                ...state,
                quiz : state.quiz,
                loading:false,
                error : action.data
            }

        default:
            return state;
    }
}


export default QuizReducer;