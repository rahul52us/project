import React, { useState, useEffect, useMemo } from 'react';
import './Chat.scss'
import { connect } from 'react-redux';
import { GET_GROUP_CHAT_ACTION } from '../../store/DashchatStore/actions';
import GroupCard from './GroupCard/GroupCard';
import { Avatar, Badge, Drawer, message, Modal } from 'antd';
import {MoreOutlined, NotificationOutlined} from '@ant-design/icons';
import SendChatInput from './SendChatInput/SendChatInput';
import { ArrowLeftOutlined } from '@ant-design/icons';
import {SearchOutlined} from '@ant-design/icons'
import ChatMessageContainer from './ChatMessageContainer/ChatMessageContainer';
import { APPEND_SOCKET_NEW_MESSAGE_ACTION, GET_CHAT_MESSAGE_ACTION, ADD_MESSAGE_NOTIFICATION_TO_CHAT_ACTION ,REMOVE_MESSAGE_NOTIFICATION_FROM_CHAT_ACTION, SELECTED_CHAT_ACTION, SELECTED_CHAT_NULL_ACTION } from '../../store/ChatMessageStore/actions';
import { ACTIVATE_SOCKET_ACTION } from '../../store/ChatMessageStore/actions';
import  { io } from "socket.io-client";
import { Link } from 'react-router-dom';
import { Notify } from '../../config/Notify/Notify';
import ChatMessageNotificatioModal from './NotificationModal/ChatMessageNotificatioModal';



const Chat = (props) => {
    const [NoticationModal,setNotificationModal] = useState(false)
    useEffect(()=>{        
        if(props.ChatMessageReducer.socket===null && props.AuthReducer.user)
        {                        
            var socket = io(`${process.env.REACT_APP_BACKEND_API}`)
            var userData = {
                _id : props.AuthReducer.user._id,
                name : props.AuthReducer.user.name,
                email : props.AuthReducer.user.email,
                pic : props.AuthReducer.user.pic
            }
            socket.emit('JOIN_USER',(userData))
            props.ACTIVATE_SOCKET_ACTION(socket)
        }        
    },[props.AuthReducer.user])


    useEffect(()=>{
        props.GroupChatReducer.GroupChats = [] 
        props.GET_GROUP_CHAT_ACTION()        
    },[])

    useEffect(()=>{
        props.ChatMessageReducer.ChatMessages=[]
        if(props.ChatMessageReducer.selectedChat && props.ChatMessageReducer.socket)
        {
            console.log(props.ChatMessageReducer.selectedChat)
            props.ChatMessageReducer.socket.emit("JOIN_ROOM",props.ChatMessageReducer.selectedChat._id)
            props.GET_CHAT_MESSAGE_ACTION({chatId : props.ChatMessageReducer.selectedChat._id})            
        }        
    },[props.ChatMessageReducer.selectedChat])


   const GroupCardMemo = useMemo(()=>{  
    return (
      props.GroupChatReducer.GroupChats.map((item)=>{
        return (            
                <GroupCard key={item._id}  item={item}  SELECTED_CHAT_ACTION={props.SELECTED_CHAT_ACTION}/>
            )
    }))
   },[props.GroupChatReducer.GroupChats])
      
   useEffect(()=>{
    if(props.ChatMessageReducer.socket)
    {
       props.ChatMessageReducer.socket.off('TELL_NEW_USER_JOIN').on('TELL_NEW_USER_JOIN',(data) => {  
           Notify({description:`${data.name} online 😃`})
       })       
    }
    if(props.ChatMessageReducer.socket)
    {
        props.ChatMessageReducer.socket.off('send_message_recieved').on('send_message_recieved',(data) => {            
            if(props.ChatMessageReducer.selectedChat && props.ChatMessageReducer.selectedChat._id == data.chat._id)
            {
                props.APPEND_SOCKET_NEW_MESSAGE_ACTION(data)       
                return 
            }
            props.ADD_MESSAGE_NOTIFICATION_TO_CHAT_ACTION(data)
        })
    }
   },[props.ChatMessageReducer.socket,props.ChatMessageReducer.selectedChat])

   
   const SmallDeviceBackArrowFunction = () => { 
       props.SELECTED_CHAT_NULL_ACTION(null)          
   }

   console.log(props.ChatMessageReducer)
    return (
        <div className='ChatContainer'>
            <div className={props.ChatMessageReducer.selectedChat ?  'ChatSidebar' : 'SelectedChatSidebar' } >
                <div className='ChatSidebar__Search'>
                    <input type="text" placeholder="Search Group here" />
                    <SearchOutlined className="ChatGroup__Search"/>
                </div>
            {GroupCardMemo}              
            </div>
            <div className={props.ChatMessageReducer.selectedChat ? 'ChatBox' : 'SelectedChatBox'} > 
            {              
             props.ChatMessageReducer.selectedChat ? 
             <>
                <div className='ChatBox__Header'>
                    <div className='ChatBox__HeaderLeft'>
                        <ArrowLeftOutlined className='ChatBox__HeaderLeftArrow' onClick={SmallDeviceBackArrowFunction}/>
                        <Link to="/"><Avatar src="https://s3-eu-central-1.amazonaws.com/websites-production/unicaf/wp-content/uploads/2016/05/EDUCATION-text.jpg" alt="" /></Link> 
                        <div className='chatBox__HeaderLeftContainer'>                                                        
                        <span className='HeaderTitle'>{props.ChatMessageReducer.selectedChat?.chatName}</span>  
                        <span className='HeaderBio'>{"this is rahul kushwah and this is bio for the all users".substring(0, window.innerWidth > 600 ? 200 : 20)}... </span>
                        </div>                      
                    </div>
                    <div className='ChatBox__HeaderRight'>
                        <Badge count={props.ChatMessageReducer.notifications.length}>
                        <NotificationOutlined  className="Notification__Icon" onClick={() => setNotificationModal(true)}/>
                        </Badge>
                        <MoreOutlined className='MoreOutLined__Icon'/>                        
                    </div>
                </div>
                <div className='ChatBox__MessageContainer'>
                    <ChatMessageContainer ChatMessageReducer={props.ChatMessageReducer} AuthReducer={props.AuthReducer}/>
                </div>
                <div className='ChatBox__Footer'>
                    <SendChatInput selectedChat={props.ChatMessageReducer.selectedChat}  AuthReducer={props.AuthReducer} />                    
                </div>
                </>        
                : "Please select the chat first"
            }
            </div>  

            <Drawer visible={NoticationModal} onClose={() => setNotificationModal(false)}>
                <p style={{textAlign:'center'}}>Notifications</p>
                <ChatMessageNotificatioModal Notification={props.ChatMessageReducer.notifications} REMOVE_MESSAGE_NOTIFICATION_FROM_CHAT_ACTION={props.REMOVE_MESSAGE_NOTIFICATION_FROM_CHAT_ACTION} SELECTED_CHAT_ACTION={props.SELECTED_CHAT_ACTION} setNotificationModal={setNotificationModal}/>
            </Drawer>
        </div>
    );
}

const mapStateToProps = (state) => { 
    return {
        GroupChatReducer : state.GroupChatReducer,
        AuthReducer : state.AuthReducer,
        ChatMessageReducer : state.ChatMessageReducer
    }
}

const mapDispatchToProps = {
    GET_GROUP_CHAT_ACTION : GET_GROUP_CHAT_ACTION,
    GET_CHAT_MESSAGE_ACTION : GET_CHAT_MESSAGE_ACTION,
    ACTIVATE_SOCKET_ACTION : ACTIVATE_SOCKET_ACTION,
    SELECTED_CHAT_ACTION : SELECTED_CHAT_ACTION,
    APPEND_SOCKET_NEW_MESSAGE_ACTION : APPEND_SOCKET_NEW_MESSAGE_ACTION,
    ADD_MESSAGE_NOTIFICATION_TO_CHAT_ACTION : ADD_MESSAGE_NOTIFICATION_TO_CHAT_ACTION,
    REMOVE_MESSAGE_NOTIFICATION_FROM_CHAT_ACTION : REMOVE_MESSAGE_NOTIFICATION_FROM_CHAT_ACTION,
    SELECTED_CHAT_NULL_ACTION : SELECTED_CHAT_NULL_ACTION
}

export default connect(mapStateToProps,mapDispatchToProps)(Chat)
 
