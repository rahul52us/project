import React,{useState} from 'react';
import { Button, Empty, Input, Modal, Popconfirm , message, Row, Col, Typography } from 'antd';
import { PlusSquareOutlined, RightCircleOutlined } from '@ant-design/icons';
import { CREATE_NEW_CATEGARY_TOPIC_ACTION } from '../../../store/projectStore/Quiz/action';
import {connect} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { disFlexCol } from '../../../scssfile/InlineVariable';

const TopicQuizModal = (props) => {
    const [openTopicModal,setOpenTopicModal] = useState(null)
    const [newTopic,setNewTopic] = useState('')
    const navigate = useNavigate()

    const OpenCategaryTopicComp = (Topic) => {
        navigate(`/dashboard/quiz/${props.OpenTopicModal.categary}/${Topic}`)
    }

    const CreateNewTopic = (e)  => {
        e.preventDefault()         
        if(!newTopic.trim())
        {
            message.warn({ content:`Please Enter the valid topic name`, duration: 2.5 , style : {marginTop:'100px'} })
            return                           
        }        
        var selected = props.OpenTopicModal.Topic.filter((item) => item === newTopic)        
        if(selected.length>0)
        {
           message.warn({ content:`this topic name for this categary is already exists please choose another`, duration: 2.5 , style : {marginTop:'100px'} })           
        }
        else
        {
           props.CREATE_NEW_CATEGARY_TOPIC_ACTION({Id : props.OpenTopicModal._id , Topic : newTopic})           
           setOpenTopicModal(null)
           props.OpenTopicModal.Topic.push(newTopic)
           return
        }
    }

  return (
    <Modal title={<Row justify='space-between'><Typography.Title level={4}>{props.OpenTopicModal.categary}</Typography.Title><Button onClick={() => setOpenTopicModal(!openTopicModal)}>{<PlusSquareOutlined />} Add New Topic</Button></Row>} destroyOnClose={() => props.setOpenTopicModal(null)} visible={props.OpenTopicModal} onCancel={() => props.setOpenTopicModal(null)} confirmLoading={true} closable={false} footer={[<Button key="closebutton" onClick={() => props.setOpenTopicModal(null)}>Close</Button>]}>        
                <div style={{height:'40vh',overflowY:'auto'}}>{
                    props.OpenTopicModal.Topic.length > 0 ? 
                        props.OpenTopicModal.Topic.map((item,index)=>{
                            return (
                                    <Row key={index} justify="space-between" style={{backgroundColor:'lightblue',marginTop:'10px',paddingLeft:'5px'}}>                                                        
                                    <Col style={disFlexCol}><Typography.Title level={5}>{item}</Typography.Title></Col>                                            
                                    <Popconfirm title="confirm to ok" onConfirm={() => OpenCategaryTopicComp(item)} onCancel={() => message.info('cancel successfully')}><Button><RightCircleOutlined/></Button></Popconfirm>
                                    </Row>
                                   )
                }):<Empty description="No topic"/>}</div>        
            {openTopicModal && 
            <Modal title={`New Topic for ${props.OpenTopicModal.categary}`} visible={openTopicModal} onCancel={() => setOpenTopicModal(null)} onOk={CreateNewTopic} closable={false} >                    
            <form onSubmit={CreateNewTopic}>
            <Input type="text" placeholder='Enter the New Topic' value={newTopic} onChange={(e) => setNewTopic(e.target.value)}/>
            </form>
            </Modal>
        }
    </Modal>
  )
}
const mapDispatchToProps = {
    CREATE_NEW_CATEGARY_TOPIC_ACTION : CREATE_NEW_CATEGARY_TOPIC_ACTION
}
export default connect(null,mapDispatchToProps)(TopicQuizModal)