import React, { useMemo, useState } from "react";
import "./CreateQuiz.scss";
import {connect} from 'react-redux';
import { Button, message, Tooltip } from "antd";
import { Input, Checkbox } from "antd";
import { CREATE_NEW_QUIZ_ACTION
 } from "../../../store/projectStore/Quiz/action";



const Createquiz = (props) => {
  const [renderComp, setRenderComp] = useState(false);
  
  const [AnswerIncre, setAnswerIncre] = useState([
    { name: 0, value : "", description: "", correct: false },
    { name: 1, value : "", description: "", correct: false },
    { name: 2, value : "", description: "", correct: false },    
    { name: 3, value : "", description: "", correct: false },    
  ]);

  const [questionText, setQuestionText] = useState("");
  const { TextArea } = Input;
  const IncreamentAnswerDiv = () => {
    setAnswerIncre([
      ...AnswerIncre,
      { name: AnswerIncre.length, value: "", description: "", correct: false },
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
    AnswerIncre.forEach((item, index) => {
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
    props.CREATE_NEW_QUIZ_ACTION({
        question : questionText,
        answers : JSON.stringify(arr),
        categary : props.Categary,
        Topic : props.Topic

    })

    setAnswerIncre([
      { name: 0, value : "", description: "", correct: false },
      { name: 1, value : "", description: "", correct: false },
      { name: 2, value : "", description: "", correct: false },    
      { name: 3, value : "", description: "", correct: false },    
    ]); 
    setQuestionText('')
  };
  

  return (
    <>
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
                    placeholder={`Enter the choose answer ${index + 1 }`}
                    name={item.name}
                    value={item.value}
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
    </>
  );
};


const mapStateToProps = (state) => {
    return {
        newQuiz : state.QuizReducer.newQuiz
    }
}
const mapDispatchToProps = {
    CREATE_NEW_QUIZ_ACTION : CREATE_NEW_QUIZ_ACTION    
}
export default connect(mapStateToProps,mapDispatchToProps)(Createquiz)

