import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './SendChatInput.scss'
import { CREATE_NEW_CHAT_MESSAGE_ACTION } from '../../../store/ChatMessageStore/actions';

const SendChatInput = (props) => {

    const [TextMessage,setTextMessage] = useState('')
    const SendMessage = (e) => {
        e.preventDefault()
        if(!props.AuthReducer.user)
        {
            alert("user is not logged in !! ")
            return 
        }        
        if(TextMessage.trim())
        {
            props.CREATE_NEW_CHAT_MESSAGE_ACTION({
                userId : props.AuthReducer.user._id,
                content : TextMessage,
                chatId : props.selectedChat._id
            })
            setTextMessage('')
            return 
        }                
    }

    
    if(props.ChatMessageReducer.newMessage && props.ChatMessageReducer.socket)
    {
        props.ChatMessageReducer.socket.emit('send_newMessage',props.ChatMessageReducer.newMessage)
        props.ChatMessageReducer.newMessage = null
    }

    return (
        <div className='SendChatInputContainer'>
            <form className='SendChatForm' onSubmit={SendMessage}>
                <span className='EmojisContainer'>😃</span>
                <input type="text" placeholder='type message here' className='SendChatInput' value={TextMessage} onChange={(e) => setTextMessage(e.target.value)} />
            </form>
        </div>
    );
}



const mapStateToProps = (state) => {
    return {
        ChatMessageReducer : state.ChatMessageReducer
    }
}


const mapDispatchToProps = {
    CREATE_NEW_CHAT_MESSAGE_ACTION : CREATE_NEW_CHAT_MESSAGE_ACTION
}


export default connect(mapStateToProps,mapDispatchToProps)(SendChatInput)


