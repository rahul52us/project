import React,{useCallback, useState} from 'react';
import './QuizQuestion.scss'
import { Card , Divider , Button , Typography, Col, Row } from 'antd';

const Quizquestion = (props) => {
    const [showQuestion,setShowQuestion] = useState(null)    
    const AppliedNextQuestion = useCallback(() =>{
        if(props.currentQuestionNo === props.QuestionArray.length-2 && props.hasMoreData)
        {
            props.handleNext()               
            props.setCurrentQuestionNo(props.currentQuestionNo+1)
            setShowQuestion(null)        
            return
        }                
        props.setCurrentQuestionNo(props.currentQuestionNo+1)        
        setShowQuestion(null)        
    })
    
    console.log(props)
    
    const PreviousLogicFunction = () => {
        props.setCurrentQuestionNo(props.currentQuestionNo-1)
        setShowQuestion(null)
    }

    return (            
        <Col xxl={14} xl={10} sm={24} xs={24} style={{height:'50%'}}>                     
            <Card hoverable style={{marginTop:'80px',borderRadius:'10px'}}>
                <Col>
                <Typography.Title level={5}>{props.currentQuestionNo + 1} ) . {props.question}</Typography.Title>
                <Divider />
                </Col>     
                <Row justify='space-between' gutter={[20,20]}>{
                  props.answers?.map((ans,index)=>{
                      return (
                            <Col xs={{span:24}} sm={{span:24}} xl={{span:12}} xxl={{span:12}} md={{span:12}} key={index}>
                                <Button style={{ width:'100%',maxWidth:'maxContent', backgroundColor:showQuestion  ?  ans.description ? 'green' : showQuestion===index+1 ? 'red' : ''  : ''}} onClick={() => setShowQuestion(index+1)}>{ans.answer}</Button>
                                {ans.description &&  showQuestion  && <p>{ans.description}</p>}
                            </Col>
                            )})}
                </Row>
                <Divider />
                <Row justify='space-between'>                    
                <Button disabled={props.currentQuestionNo > 0 ? false : true } onClick={PreviousLogicFunction}>Previous</Button>                
                    {
                        props.currentQuestionNo < props.QuestionArray.length-1 && 
                        <Button onClick={AppliedNextQuestion}>                
                             Next
                        </Button>                      
                    }                
                </Row>
            </Card> 
        </Col> 
    );
}
export default Quizquestion;