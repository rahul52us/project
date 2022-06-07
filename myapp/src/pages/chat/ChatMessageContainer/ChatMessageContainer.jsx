import React from 'react';
import './ChatMessageContainer.scss'
import MessageDiv from './MessageDiv/MessageDiv';

const ChatMessageContainer = (props) => {

    return (
        <div className='chatMessageContainer'>
            {
                props.ChatMessageReducer.ChatMessages.map((message)=>{
                    console.log(message)
                    return (
                        <MessageDiv key={message._id} message={message} AuthReducer={props.AuthReducer}/>
                    )
                })
            }
        </div>
    );
}

export default ChatMessageContainer;

