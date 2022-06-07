import { Avatar, Tooltip } from 'antd';
import React from 'react';
import { Button } from 'antd';
import './DashChatUser.scss'

const DashChatUser = (props) => {

    const RemoveUserFunctionApi = (GroupId,userId) => {
        props.REMOVE_MEMBER_FROM_CHAT_GROUP_ACTION({chatId : GroupId , userToRemove : userId})
    }
    
    return (
        <div className='DashChatUser'>
            <div className='DashChatUserTop'>
            <Avatar src={props.user.pic} alt="" />
            <div className='DashChatUserInfo'>
            <p className='DashChatUserName'>{props.user.name}</p>
            <p className='DashChatUserEmail'>{props.user.email}</p>
            </div>
            </div>
            <div>                
            <Tooltip title="Remove Access for this Chat"><Button onClick={() => RemoveUserFunctionApi(props.GroupId, props.user._id)}>Remove user</Button></Tooltip>
            </div>        
        </div>
    );
}

export default DashChatUser;
