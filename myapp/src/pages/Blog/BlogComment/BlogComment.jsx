import React,{useEffect , useState} from 'react';
import './BlogComment.scss'
import { Drawer } from 'antd';
import { connect } from 'react-redux';
import Showcommentdiv from '../ShowCommentDiv/ShowCommentDiv';
import InputCommentBox from '../../../common/InputCommentBox/InputCommentBox';
import { DELETE_BLOG_COMMENT_ACTION } from '../../../store/projectStore/BlogStore/action';

const Blogcomment = (props) => {    
    const [commentMessage,setCommentMessage] = useState('')    
    const [AllComments,setAllComments] = useState(props.comments)

    if(props.newComment.newComment)
    {
        if(props.newComment.newComment.Blog === props.blogId)
        {
        props.comments.push(props.newComment.newComment)                
        props.newComment.newComment=null
        setAllComments(props.comments)
        }
    }   

    const DeleteCommentFunction = (blogId,CommentId) => {
        props.DELETE_BLOG_COMMENT_ACTION({BlogId:blogId,commentId:CommentId})
        var FilterComment  =  AllComments.filter((item) => item._id!== CommentId)
        setAllComments(FilterComment)
    }

    

    return (
        <div className='BlogCommentContainer'>
            <Drawer  title="Comments" placement="right" onClose={props.onClose} visible={props.visible}>
             <div className='BlogCommentDrawser'>
                {                    
                  props.visible && AllComments && AllComments.map((item,index)=>{
                        return (
                            <Showcommentdiv blogId={props.blogId} DeleteCommentFunction={DeleteCommentFunction} CommentId={item?._id} commentId={item?._id} commentsMessage={item.comment} userId={item.user?._id} name={item.user?.name} pic={item.user?.pic} key={index} />
                        )                        
                    })                 
                }   
             </div>   
             <InputCommentBox value={commentMessage} userId={props.userId} blogId={props.blogId} setCommentMessage={setCommentMessage}/>             
             </Drawer>
        </div>
    );
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        newComment : state.CommentReducer
    }
  }
const mapDispatchToProps = {
    DELETE_BLOG_COMMENT_ACTION : DELETE_BLOG_COMMENT_ACTION 
}
export default connect(mapStateToProps,mapDispatchToProps)(Blogcomment)

  





