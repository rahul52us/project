import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Popconfirm } from 'antd';
import React,{useState} from 'react';
import { connect } from 'react-redux';
import './EditQuizQuestion.scss'
import { DELETE_QUIZ_ACTION } from '../../../store/projectStore/Quiz/action';
import EditQuizQuestionModal from './EditQuizQuestionModal/EditQuizQuestionModal';

const EditQuizQuestion = (props) => {
    const [OpenQuizQuestionModal,setOpenQuizQuestionModal] = useState(null)    
    const {item , index } = props;

    const DeleteQuizQuestion = (id) => {
        props.DELETE_QUIZ_ACTION(id)
    }

    const EditQuestionFunction = () => {
        setOpenQuizQuestionModal(true)
    }

  return (
    <div className='EditQuizQuestion'>
        <div className='EditQuizQuestion__container'>
        <div className='EditQuizQuestion_Question'>
            <h4 className='Edit_quiz_Question'><span>{index}). </span>{item.Question}</h4>
            {
                item.Answers.map((ans,index)=>{
                    return (
                        <p key={index}>{index +1}. {ans.answer}</p>
                    )
                })
            }
        </div>
        <div className='EditQuizQuestion_Actions'>
            <Popconfirm title="confirm to edit" onConfirm={() => EditQuestionFunction()}><Button><EditOutlined /></Button></Popconfirm>
            <Popconfirm title="confirm to delete" onConfirm={() => DeleteQuizQuestion(item._id)}><Button><DeleteOutlined /></Button></Popconfirm>
        </div>
        {
            OpenQuizQuestionModal && <EditQuizQuestionModal OpenQuizQuestionModal={OpenQuizQuestionModal} item={item} setOpenQuizQuestionModal={setOpenQuizQuestionModal}/>
        }
        </div>
    </div>
  )
}

const mapDispatchToProps = {
    DELETE_QUIZ_ACTION : DELETE_QUIZ_ACTION
}

export default connect(null,mapDispatchToProps)(EditQuizQuestion)
