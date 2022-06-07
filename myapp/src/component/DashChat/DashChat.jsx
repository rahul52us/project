import { PlusSquareOutlined } from '@ant-design/icons';
import React,{useEffect, useState} from 'react';
import './DashChat.scss';
import {connect} from 'react-redux';
import DashChatCard from './DashChatCard';
import { Button, Form, message, Modal, Spin } from 'antd';
import Inputcomponent from '../../common/inputComponent/InputComponent';
import { FETCH_GROUP_CHAT_MEMBERS_ACTION, GET_GROUP_CHAT_ACTION, REMOVE_MEMBER_FROM_CHAT_GROUP_ACTION } from '../../store/DashchatStore/actions';
import { CREATE_NEW_CHAT_GROUP_ACTION } from '../../store/DashchatStore/actions';
import { DELETE_GROUP_CHAT_ACTION } from '../../store/DashchatStore/actions';
import { EDIT_GROUP_CHAT_NAME_ACTION } from '../../store/DashchatStore/actions';


const DashChat = (props) => {

    const [ShowNewGroupModal,setShowNewGroupModal] = useState(false)
    const [groupName,setGroupName] = useState('')


    useEffect(()=>{
        props.GroupChatReducer.GroupChats=[]
        props.GroupChatReducer.loading =  true
        props.GET_GROUP_CHAT_ACTION({page : 1})
    },[])
    
    const CreateGroupFunction = () => {
        if(groupName.trim())        
        {
        props.CREATE_NEW_CHAT_GROUP_ACTION({name : groupName})
        }
        else
        {
            message.warn("Please Provide the correct name")
            return 
        }        
        setGroupName('')
        setShowNewGroupModal(false)
    }


    return (
    <div className='DashChatContainer'>
        <div className='DashChatTop'>
        <Button onClick={() => setShowNewGroupModal(true)}><PlusSquareOutlined />Add New Group</Button>
        </div>
       <div className='DashChat'>
           {
               !props.GroupChatReducer.loading ? 
               props.GroupChatReducer.GroupChats.map((item)=>{
                   console.log(item)
                   return (
                    <DashChatCard key={item._id} GroupId={item._id} item={item} Group={item} GroupName={item.chatName} DELETE_GROUP_CHAT_ACTION={props.DELETE_GROUP_CHAT_ACTION} EDIT_GROUP_CHAT_NAME_ACTION={props.EDIT_GROUP_CHAT_NAME_ACTION} GroupChatReducer={props.GroupChatReducer} FETCH_GROUP_CHAT_MEMBERS_ACTION={props.FETCH_GROUP_CHAT_MEMBERS_ACTION} REMOVE_MEMBER_FROM_CHAT_GROUP_ACTION={props.REMOVE_MEMBER_FROM_CHAT_GROUP_ACTION}/>
                   )
               }) : <div className='ShowDrawerSpinner'><Spin size='large'/></div>
           }            
        </div>
        <Modal visible={ShowNewGroupModal} onCancel={() => setShowNewGroupModal(false)} footer={[<Button key={"GroupChatModalButton"} onClick={CreateGroupFunction}>Add</Button>]}>
            <Form onFinish={CreateGroupFunction}>
            <p>Create A New Group :-</p>
            <Inputcomponent type="text" value={groupName}  onChange={(e) => setGroupName(e.target.value)} placeholder={"Enter the GroupName"} required name="groupname" hint={"GroupName is required"} />
            </Form>
        </Modal>
    </div>
    );
}

const mapStateToProps = (state) => {
        return {
            GroupChatReducer : state.GroupChatReducer
        }
}

const mapDispatchToProps = {
    GET_GROUP_CHAT_ACTION:GET_GROUP_CHAT_ACTION,
    CREATE_NEW_CHAT_GROUP_ACTION : CREATE_NEW_CHAT_GROUP_ACTION,
    DELETE_GROUP_CHAT_ACTION : DELETE_GROUP_CHAT_ACTION,
    EDIT_GROUP_CHAT_NAME_ACTION : EDIT_GROUP_CHAT_NAME_ACTION,
    FETCH_GROUP_CHAT_MEMBERS_ACTION : FETCH_GROUP_CHAT_MEMBERS_ACTION,
    REMOVE_MEMBER_FROM_CHAT_GROUP_ACTION : REMOVE_MEMBER_FROM_CHAT_GROUP_ACTION

}


export default connect(mapStateToProps,mapDispatchToProps)(DashChat)



