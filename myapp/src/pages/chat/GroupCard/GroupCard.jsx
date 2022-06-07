import { Avatar } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import './GroupCard.scss'

const GroupCard = (props) => {

    const {item} = props
    console.log(item)

    return (
        <div className='GroupChatCard' onClick={() => props.SELECTED_CHAT_ACTION(item)}>
            <div className='GroupCardLogo'>
                <Avatar src="https://s3-eu-central-1.amazonaws.com/websites-production/unicaf/wp-content/uploads/2016/05/EDUCATION-text.jpg" alt="" />
                <div className='GroupChatMesageDiv'>
                <h4 className='GroupChatGroupName'>{item.chatName}</h4>
                <p className='GroupChatMessagePreview'>{item?.latestMessage?.content.substring(0,20)}....</p>            
                </div>                
             </div>             
        </div>
    );
}
export default GroupCard;
