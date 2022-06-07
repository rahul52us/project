import React from 'react';
import './ChatMessageNotificationModal.scss'
import { Avatar, Divider } from 'antd';


const ChatMessageNotificatioModal = (props) => {

    const RemoveNotification = (message) => {
        props.REMOVE_MESSAGE_NOTIFICATION_FROM_CHAT_ACTION(message)        
        console.log(message)
        props.SELECTED_CHAT_ACTION(message.chat)
        props.setNotificationModal(false)
    }

    return (
        <div>
            {
                props.Notification.map((item)=>{
                    return (
                        <div className='ChatMessageNotificationModal' key={item._id}>  
                          <Divider><span style={{color:'gray',fontSize:'14px'}}>{item.createdAt}</span></Divider>
                        <div className='ChatMessageNotificationModal__container'>                                                                             
                                  <div className='ChatMessageNotificationModal__Avatar'>
                                      <Avatar src={item.sender.pic}/>
                                  </div>          
                                  <div className='ChatMessageNotificationModal__userInfo' onClick={() => RemoveNotification(item)}>
                                      <p className='ChatMessageNotificationModal__userName'>{item.sender.name}</p>
                                      <p className='ChatMessageNotificationModal__timeStamp'>({item.chat.chatName})</p>                                      
                                  </div>          
                        </div>               
                        <p className='ChatMessageNotificationModal__content' onClick={() => RemoveNotification(item)}>{item.content}</p>         
                        </div>
                    )
                })
            }
        </div>
    );
}

export default ChatMessageNotificatioModal;
