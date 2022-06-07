import React,{useState} from 'react';
import Picker from 'emoji-picker-react';
import './InputCommentBox.scss'
import { connect } from 'react-redux';
import { CREATE_COMMENT_ACTION } from '../../store/projectStore/CommentStore/action';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';


const Inputcommentbox = (props) => {

    const navigate = useNavigate()
    const [Message, setMessage] = useState('');
    const [showEmojiPicker,setShowEmojiPicker] = useState(false)

    const sendMessage = (e) => {
        setShowEmojiPicker(false)
        e.preventDefault()
        if(Message.trim() && Message!="")
        {       
           
            if(props.user)
            {
                props.CREATE_COMMENT_ACTION({userId : props.user._id , blogId:props.blogId , comment : Message })
                setMessage('')
            }   
            else  
            {
                setTimeout(()=>{                    
                        message.warn({content:"please logged in first for the comment... 🥺",style:{marginTop : '100px'}})
                },[2000])
                navigate('/register')
            }            
        }        
    }        

    return (
        <form onSubmit={sendMessage}>
        <div className={showEmojiPicker ? 'InputCommentBox' : 'InputCommentBox_false'}>            
        <div className='Emoji_container'>
            {showEmojiPicker && <Picker className="emoji-picker-react" onEmojiClick={(e,emojis) => setMessage(Message+emojis.emoji)}/> }
            <div className='emoji'><span style={{cursor:'pointer'}} onClick={() => setShowEmojiPicker(!showEmojiPicker)}>😃</span></div> 
        </div>        
            <input type="text" placeholder='comments here' value={Message} onChange={(e) => setMessage(e.target.value)} onBlur={() => setShowEmojiPicker(false)}/>                    
        </div>
        </form>
    );
}

const mapStateToProps = (state) => {
    return {        
        user : state.AuthReducer.user
    }
}
const mapDisapatchToProps = {
    CREATE_COMMENT_ACTION : CREATE_COMMENT_ACTION
}

export default connect(mapStateToProps,mapDisapatchToProps)(Inputcommentbox)

