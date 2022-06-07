import React, { useEffect, useState } from 'react';
import './DashQuiz.scss'
import { connect } from 'react-redux';
import { GET_QUIZ_CATEGARY_ACTION } from '../../store/projectStore/Quiz/action';
import {PlusSquareOutlined} from '@ant-design/icons'
import { Select , Button, Spin, Modal, Input,message} from 'antd';
import { CREATE_QUIZ_CATEGARY_ACTION } from '../../store/projectStore/Quiz/action';
import TopicQuizModal from './CreateTopicQuizModal/TopicQuizModal';


const Dashquiz = (props) => {

    const [NewCategary,setNewCategary] = useState(null)
    const [openCategaryModal,setOpenCategaryModal] = useState(null) 
    const [OpenTopicModal,setOpenTopicModal] = useState(null)
    useEffect(() => {     
        props.Quiz.quiz=[]   
        props.GET_QUIZ_CATEGARY_ACTION()
    },[])


    const CreateNewCatagaryFunction = (e) => {
        e.preventDefault()

        var filteredData = props.Quiz.QuizCategary.filter((item)=> item.categary === NewCategary)
        console.log(filteredData)
        if(filteredData.length>0)
        {
            message.loading({content:'Action in progress...',duration:2 , style:{marginTop : '100px'}}).then(()=> message.error({content:`${NewCategary} are already in use`,duration:3,style:{marginTop:'100px'}}))
            setNewCategary(null)
            setOpenCategaryModal(null)
            return
        }        
        props.CREATE_QUIZ_CATEGARY_ACTION(NewCategary)        
        setOpenCategaryModal(null)
        setNewCategary(null)
        message.loading({ content:`creating ${NewCategary} categary`, duration: 2.5 , style : {marginTop:'100px'} })        
        .then(() => message.success({ content:`Created ${NewCategary} categary`, duration: 2.5 , style : {marginTop:'100px'} }))
        .then(() => message.success({ content:`Done`, duration: 2.5 , style : {marginTop:'100px'} }));
  };
    
  

    const SelectQuizCategary = (e) => {

        var selected = props.Quiz.QuizCategary.filter((item) => item.categary === e)
        if(selected.length>0)
        {
            setOpenTopicModal(selected[0])
        }
        else
        {
            message.loading({ content:`Action in progress`, duration: 2.5 , style : {marginTop:'100px'} })        
           .then(() => message.warn({ content:`cannot be selected due to some isseu`, duration: 2.5 , style : {marginTop:'100px'} }))
           .then(() => message.info({ content:`try again later or refresh the page once`, duration: 2.5 , style : {marginTop:'100px'} }));
        }       
    }
    return (
            props.AuthUser ? (             
            <div className='DashQuiz'>
            <div className='DashQuiz_TopContainer'>
            <div className='DashQuiz_ImageContainer'>
            <img src="https://st.depositphotos.com/1032577/4119/i/600/depositphotos_41197145-stock-photo-quiz.jpg" alt="" />           
            </div>
            <div className='DashQuiz__Title'>
            <p>Let's create the new quizes</p>
            </div>
            </div>

            <div className='DashQuiz_DetailContainer'>
                <div className='DashQuiz_Detail_Left'>
                <p className='Select_catagary_title'>Select the categary:-</p>
                <Select placeholder="Seach Categary here" className='DashQuiz__Select' onChange={SelectQuizCategary}>                    
                {
                    props.Quiz.QuizCategary.map((item,index)=>{
                        return (
                            <Select.Option key={item._id} value={item.categary}>
                                {item.categary}                        
                            </Select.Option>                            
                        )
                    })
                }
                </Select>
                </div>
                <div className='DashQuiz_Detail_Right'>
                                      
                    <Modal visible={openCategaryModal} onCancel={() => setOpenCategaryModal(null)} footer={null} >
                        <form onSubmit={CreateNewCatagaryFunction}>
                        <h4><span>* </span>Create New Categary</h4>
                        <Input placeholder='Enter the New Categary' value={NewCategary} onChange={(e) => setNewCategary(e.target.value)}/>
                        </form>
                    </Modal>
                    {
                        
                        OpenTopicModal && 
                        <TopicQuizModal visible={OpenTopicModal}  OpenTopicModal={OpenTopicModal} setOpenTopicModal={setOpenTopicModal} />                        
                    }
                    <Button onClick={() => setOpenCategaryModal(!openCategaryModal)}><PlusSquareOutlined />Create New Categary</Button>
                </div>                          
            </div>    
        </div>
            ) : <Spin />        
    );
}

const mapStateToProps = (state) => {
    return {
        Quiz : state.QuizReducer,
        AuthUser : state.AuthReducer
    }
}

const mapDispatchToProps = {
GET_QUIZ_CATEGARY_ACTION : GET_QUIZ_CATEGARY_ACTION,
CREATE_QUIZ_CATEGARY_ACTION : CREATE_QUIZ_CATEGARY_ACTION
}

export default connect(mapStateToProps,mapDispatchToProps)(Dashquiz)

