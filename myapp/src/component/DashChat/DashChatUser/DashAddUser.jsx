import { Avatar, Checkbox, Tooltip } from 'antd';
import React from 'react';
import { Button } from 'antd';
import './DashChatUser.scss'

const DashAddUser = (props) => {
    const AddToGroupFunction = (userId) => {        
        props.ADD_MEMBERS_TO_GROUP_ACTION({chatId: props.Group._id , newUserToAdd:userId})
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
                {
                    props.Group.users.includes(props.user._id) ?  <Tooltip title="user is already exists"><Button>Exists</Button></Tooltip>:
                    <Tooltip title="Add user"><Button onClick={() => AddToGroupFunction(props.user._id)}>Add</Button></Tooltip>
                }            
            </div>        
        </div>
    );
}
export default DashAddUser;
