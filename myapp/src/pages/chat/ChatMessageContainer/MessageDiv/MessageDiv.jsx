import React from 'react';
import './MessageDiv.scss'
import { Avatar } from 'antd';
import { MoreOutlined } from '@ant-design/icons';

const MessageDiv = (props) => {
    return (
        <div className={props.AuthReducer.user ? props.AuthReducer.user._id === props.message.sender?._id ? 'ChatMessageMainSenderContainer' : 'ChatMessageMainContainer' : 'ChatMessageMainContainer'}>
        <div className='ChatMessageDivContainer'>           
            <div className='ChatMessageDivUserInfo'>
                <div className='ChatMessageUserProfile'>
                 <Avatar src={props.message.sender?.pic}/>
                </div>
                <div className='ChatMessageDivUsername'>
                    <h4 className='ChatMessageUserNameTitle'>{props.message.sender?.name}<span>12/05/2020</span></h4>
                    <p className='ChatMessageContent'>
                        {props.message.content}
                    </p>
                </div>                
            </div>               
            <MoreOutlined className='ChatMessageMoreOutlined'/>
        </div>
    </div>
    );
}

export default MessageDiv;
