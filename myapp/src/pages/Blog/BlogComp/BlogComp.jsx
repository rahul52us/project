import React, { useState } from 'react';
import './BlogComp.scss';
import Moment from 'react-moment';
import { Tooltip , message, Card, Row, Typography } from 'antd';
import { connect } from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import { LikeOutlined, MoreOutlined } from '@ant-design/icons';
import intToString from '../../../config/projectFunction/ConvertNumberToFormat';
import { LIKE_BLOG_ACTION } from '../../../store/projectStore/LikeBlog/action';
import Blogcomment from '../BlogComment/BlogComment';
import { Menu , Dropdown } from 'antd';
import {CommentOutlined } from '@ant-design/icons'

const Blogcomp = (props) => {
    const {item , user } = props;
    const [like,setLike] =  useState(item.likes.includes(user?._id))
    const [visible, setVisible] = useState(false);
    const [likeState,setLikeState] = useState(item.likes.length)
    const navigate = useNavigate()
    
    const LikeBlog = (userId,BlogId) => {        
        props.LIKE_BLOG_ACTION({userId : userId,BlogId : BlogId})        
        setLike(!like)
        if(like)
        {
          setLikeState(likeState - 1)
        }
        else
        {
          setLikeState(likeState + 1)
        }        
      }
      const showDrawer = () => {
        setVisible(true);
      };
        
      const onClose = () => {
        setVisible(false);
      };     

      const copyBlogLink = (id) => {
         navigator.clipboard.writeText(`${window.location.origin}/blog/${id}`);   
         message.info("link has been copied")    
      }
      const menu = (
        <Menu>
          <Menu.Item key="1" onClick={() => copyBlogLink(item._id)} id="CopyBlogLink">copy content link</Menu.Item>
          <Menu.Item key="2">report this content</Menu.Item>
          <Menu.Item key="3">delete this content</Menu.Item>
        </Menu>
      );
      
      const navidateToRegister = () => {
        setTimeout(()=>{                    
          message.warn({content:"please logged in first for the like... 🥺",style:{marginTop : '100px'}})
             },[2000])
          navigate('/register')
      }

    return (      
        <div key={item._id} className="blog_div_container" >                    
        <Card style={{margin:'-20px'}}>
              <div style={{userSelect : 'text'}} className="sun-editor">              
              <Row justify="space-between" style={{margin:'10px'}}>
              <Dropdown overlay={menu} trigger={"click"} placement="bottomLeft">
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                <MoreOutlined style={{fontSize : '18px'}}/>
                </a>
            </Dropdown>   
            <Typography.Title level={4}><Link to={`${item._id}`}>{item.title}</Link></Typography.Title>              
              <p className='blog_header_timeSlot'><Moment format="YYYY/MM/DD" >{item.createdAt}</Moment></p>               
              </Row>
                <div className="sun-editor-editable">                
               {
                 !props.singleBlog ? 
                 <>
                 <div className='content_classs' dangerouslySetInnerHTML={{ __html: item.body.substring(0,1800) }}></div>
                 <span className='Blog_Read_Full_Article'><Link to={`${item._id}`}>Read Full Article</Link></span>
                 </> : 
                  <div className='content_classs' dangerouslySetInnerHTML={{ __html: item.body }}></div>             
               }
              </div>
              <div className='sociai_user_div'>
                <div className='user_likes'>
                  <Tooltip color={"blue"} title={like ? 'you like this blog' : 'like blog'}>
                  {                  
                  user ?  <span style={{cursor:'pointer'}} onClick={() => LikeBlog(user._id,item._id)}><span style={{fontSize:'10px',color:'gray'}}>{intToString(parseInt(likeState))}</span>
                  {like ? <LikeOutlined className='blog_like_Icon' style={{color : 'blue'}} /> : <LikeOutlined  className='blog_like_Icon'  />}
                  </span> :
                  <LikeOutlined className='blog_like_Icon' onClick={() => navidateToRegister()}/>                  
                  }
                  </Tooltip>                
                </div>
                <div  className="Blog_comment_icon">
                  <Tooltip title={`total comment ${item.comments.length}`}>
                  <CommentOutlined onClick={showDrawer} />
                  <span className='blog_total_comment'>{item.comments.length}</span>
                  </Tooltip>              
                </div>
              </div>            
              </div>              
                <Blogcomment blogId={item._id} userId={user?._id} comments={item.comments} visible={visible} onClose={onClose} />                             
                </Card>
        </div>        
    );
}
const mapDispatchToProps = {
    LIKE_BLOG_ACTION : LIKE_BLOG_ACTION
}
export default connect(null,mapDispatchToProps)(Blogcomp)

