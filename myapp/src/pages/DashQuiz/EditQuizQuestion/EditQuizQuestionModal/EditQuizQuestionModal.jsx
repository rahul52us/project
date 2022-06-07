import React,{useState} from 'react'
import { Button, Checkbox, Input, message, Modal, Tooltip } from 'antd'
import { EDIT_QUIZ_QUESTION_ACTION } from '../../../../store/projectStore/Quiz/action';
import { connect } from 'react-redux';

const EditQuizQuestionModal = (props) => {    
    const [questionText, setQuestionText] = useState(props.item.Question);   
    const {OpenQuizQuestionModal , setOpenQuizQuestionModal } = props;        

    var initialArray = []
    props.item.Answers.forEach((item,index) => {
        initialArray.push({ name: index, value:item.answer, description: item.description, correct: item.correct },)
    })
    const [AnswerIncre,setAnswerIncre] = useState(initialArray)    
    
    console.log(props)
    const { TextArea } = Input;
  
    const IncreamentAnswerDiv = () => {
      setAnswerIncre([
        ...AnswerIncre,
        { name: AnswerIncre.length, value : "", description: "", correct: false },
      ]);
    };
  
    const handleAnswerChange = (e) => {
        var newState = [...AnswerIncre]
        newState[parseInt(e.target.name)].value = e.target.value
        setAnswerIncre(newState)      
    };
  
    const handleCheckBox = (e) => {      
      var newState = [...AnswerIncre]
      newState[parseInt(e.target.name)].correct = e.target.checked
      setAnswerIncre(newState)            
    };
  
    const handleDescription = (e) => {
        var newState = [...AnswerIncre]
        newState[parseInt(e.target.name)].description = e.target.value
        setAnswerIncre(newState)        
    };
  
    const handleSubmitData = (e) => {
      e.preventDefault();
  
      if(!questionText.trim())
      {
        message.warn("please give the question")
        return
      }
      
      var arr = []
      AnswerIncre.forEach((item) => {
        if(item.value.trim())
        {
          var description = item.correct ? item.description : null;      
          arr.push({answer : item.value , description : description , correct : item.correct})
        }      
      });
  
      if(arr.length<2)
      {        
          message.warn("atleast 2 answer options should been given")
          return 
      }
          
      var UpdatedData = 
      {
        Question : questionText,
        Answers : JSON.stringify(arr),
        Categary : props.item.Categary,
        Topic : props.item.Topic,
        Id : props.item._id
      }
      props.EDIT_QUIZ_QUESTION_ACTION(UpdatedData)
      setAnswerIncre([])      
      setQuestionText('')
      setOpenQuizQuestionModal(null)
    };

  return (
    <div>
        <Modal visible={OpenQuizQuestionModal} onCancel={() => setOpenQuizQuestionModal(null)}>
        <div className="questionContainer">
      <form onSubmit={handleSubmitData}>
        <p className="dashQuestionLabel">
          {" "}
          <span>*</span> Write your Questions here:
        </p>
        <TextArea
          className="textArea_class"
          placeholder="write your question here"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
        />
        <div className="dashAnswersContainer">
          {AnswerIncre.map((item, index) => {
            return (
              <div key={index}>
                <div className="dashAnswerInputBox">
                  <Input
                    type="text"
                    value={item.value}
                    placeholder={`Enter the choose answer`}
                    name={item.name}
                    onChange={handleAnswerChange}
                    className="dashAnswerInput"
                  />
                  <Tooltip title="tick for the correct answer">
                    <Checkbox
                      className="checkIcon"
                      name={item.name}
                      checked={item.correct}
                      onChange={handleCheckBox}
                    />
                  </Tooltip>
                </div>
                {item.correct && (
                  <Tooltip
                    title={`give the reason for the question ${questionText} . why is it right`}
                  >
                    <TextArea
                      placeholder={`write the reason for ${item.value}`}
                      name={item.name}
                      value={item.description}
                      onChange={handleDescription}
                    />
                  </Tooltip>
                )}
                <div></div>
              </div>
            );
          })}
        </div>
        <div className="CreateQuizButton">
          <Button onClick={IncreamentAnswerDiv}>Add More Answer</Button>
          <Button htmlType="submit">Save Question</Button>
        </div>
      </form>
    </div>
        </Modal>
        
    </div>
  )
}

const mapDispatchToProps = {
    EDIT_QUIZ_QUESTION_ACTION : EDIT_QUIZ_QUESTION_ACTION
}

export default connect(null,mapDispatchToProps)(EditQuizQuestionModal)
