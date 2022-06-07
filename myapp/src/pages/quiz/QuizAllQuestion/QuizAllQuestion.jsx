import { Row } from 'antd';
import React,{useEffect, useState} from 'react';
import {connect} from 'react-redux';
import { FullHeightLoader } from '../../../config/Notify/Notify';
import { GET_ALL_CATEGARY_QUIZ_ACTION } from '../../../store/projectStore/Quiz/action';
import Quizquestion from '../QuizQuestionDiv/QuizQuestion';

const QuizAllquestion = (props) => {

    const [currentQuestionNo,setCurrentQuestionNo] = useState(0)
    const [page,setPage] = useState(1)
    const [QuestionArray,setQuestionArray] = useState([])

    useEffect(()=>{
        props.quizes.loading = true
        props.quizes.quiz = []    
        setQuestionArray([])    
        setCurrentQuestionNo(0)        
        setPage(1)
        props.GET_ALL_CATEGARY_QUIZ_ACTION({Categary:props.categary , Topic :props.topic,Page : 1})
    },[props.categary,props.topic])

    useEffect(()=>{
        if(props.quizes.quiz.length>0)
        setQuestionArray(props.quizes.quiz)
    },[props.quizes.quiz])

    const handleQuizPagination = () => {
        props.quizes.loading = true
        props.GET_ALL_CATEGARY_QUIZ_ACTION({Categary:props.categary , Topic :props.topic,Page : page + 1})
        setPage(page + 1)        
    }        
    const handleNext = () => {        
        handleQuizPagination()        
    }
    return (
        !props.quizes.loading ? 
        <Row justify='center' style={{margin:'20px 10px'}}>
        {
            QuestionArray.length > 0 &&
            <Quizquestion question={QuestionArray[currentQuestionNo]?.Question} answers={QuestionArray[currentQuestionNo]?.Answers} key={QuestionArray[0]?._id} questionId={QuestionArray[currentQuestionNo]?._id} index={currentQuestionNo} currentQuestionNo={currentQuestionNo} handleNext={handleNext} setCurrentQuestionNo={setCurrentQuestionNo} hasMoreData={props.quizes.hasMoreData} QuestionArray={QuestionArray}/>
        }        
        </Row> : <FullHeightLoader size="large" text="Question are loading , please wait "/>
    );
}
const mapStateToProps = (state) => {    
    return {
        quizes : state.QuizReducer
    }
}
const mapDispatchToProps = {
    GET_ALL_CATEGARY_QUIZ_ACTION : GET_ALL_CATEGARY_QUIZ_ACTION
}
export default connect(mapStateToProps,mapDispatchToProps)(QuizAllquestion)
