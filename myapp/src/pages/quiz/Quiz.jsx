import React, { useEffect , useState , useMemo } from 'react';
import './Quiz.scss'
import { GET_ALL_CATEGARY_QUIZ_ACTION, GET_QUIZ_CATEGARY_ACTION } from '../../store/projectStore/Quiz/action';
import { connect } from 'react-redux';
import QuizAllquestion from './QuizAllQuestion/QuizAllQuestion';
import { Dropdown,Modal,Button, Empty } from 'antd';

const Quiz = (props) => {
  
    const [selectCategaryTopic,setSelectCategaryTopic] = useState(null)
    const [displaySelectionQuiz,setDisplaySelectionQuiz] = useState(true)
    const [selectQuizCategary,setSelectedQuizCategary] = useState(null)

    useEffect(()=>{        
        props.GET_QUIZ_CATEGARY_ACTION()
    },[])  

    const selectCategaryTopicFunction = (item) => 
    {      
      setSelectCategaryTopic(item)
      setDisplaySelectionQuiz(false)
    }
    
    const menu = () => {
      return (
        <div className='Quiz_selection_dropdown_container'>
        { 
        props.Quiz.QuizCategary.map((item,index)=>{
          return (
            <div key={index} className="Quiz_selection_dropdown">              
               <Button onClick={() => selectCategaryTopicFunction(item)}>{item.categary}</Button>
           </div>
          )          
        })
        }
        </div>
      )
    }

    const RenderSelectCategaryQuizFunction = (data) => {
      setSelectedQuizCategary(data)
      setSelectCategaryTopic(null)
    }

    const QuizAllQuestion = useMemo(() => {
      if(selectQuizCategary)
      return (
          <QuizAllquestion categary={selectQuizCategary.categary} topic={selectQuizCategary.topic}/>
      )      
  },[selectQuizCategary])

    return (
        <div className='QuizContainer'>  
        <div className='QuizContainer__Header'>
          <div className='QuizContainer_header_left'>
          <p>Quiz section</p>
          </div>
          <div className='QuizContainer_header_right'>
          <Dropdown onClick={() => setDisplaySelectionQuiz(!displaySelectionQuiz)} visible={displaySelectionQuiz} trigger="hover" overlay={menu} placement="bottomLeft" >
                  <p>Select the quiz categary</p>
          </Dropdown>                    
          </div>              
        </div>        
        <div className='Quiz_container_body'>          
           {
              selectCategaryTopic && 
              <Modal mask={false} visible={selectCategaryTopic} footer={null} onCancel={() => setSelectCategaryTopic(null)}>
                <p className='ModalQuizSelectedTitle'>Select the topic of {selectCategaryTopic.categary} quiz</p>
                <h3 className='ModalQuizSelectedHeadingTitle'>{selectCategaryTopic.categary}</h3>
                <div className='SelectQuizModalTopicContainer'>
                {
                  selectCategaryTopic.Topic.length <= 0 ? <Empty /> :
                  selectCategaryTopic.Topic.map((topic,index)=>{
                    return (
                      <div key={index} className="SelectQuizModalTopic" onClick={() => RenderSelectCategaryQuizFunction({categary : selectCategaryTopic.categary,topic : topic})}>                        
                      <p className='SelectQuizModalTopic'>{topic}</p>
                      </div>
                    )
                  })
                }
                </div>
              </Modal> 
              }              
            {selectQuizCategary?.topic  &&   QuizAllQuestion }
            </div>
            {
              !selectQuizCategary  && <div className='QuizNotSelect'><p>Please select the quiz categary</p></div>
            }
        </div>        
    );
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        Quiz : state.QuizReducer,
    }
}
const mapDispatchToProps = {
    GET_ALL_CATEGARY_QUIZ_ACTION : GET_ALL_CATEGARY_QUIZ_ACTION,
    GET_QUIZ_CATEGARY_ACTION : GET_QUIZ_CATEGARY_ACTION
}
export default connect(mapStateToProps,mapDispatchToProps)(Quiz)

