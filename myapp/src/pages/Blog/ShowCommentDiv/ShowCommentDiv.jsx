import React from 'react';
import './ShowCommentDiv.scss'
import { MoreOutlined } from '@ant-design/icons';
import {Avatar, Dropdown, Menu} from 'antd'

const Showcommentdiv = (props) => {
    const menu = (
        <Menu>
          <Menu.Item key="1" onClick={() => props.DeleteCommentFunction(props.blogId,props.CommentId)} id="CopyBlogLink"><span style={{color:'gray',fontSize:'12px'}}>Delete Comment</span></Menu.Item>            
        </Menu>
      );
    return (
        <div className='ShowMessageCommentDiv'>
            <div className='ShowMessageCommentContainer'>
            <div className='ShowMessagCommenteTop'>
                <Avatar src={props.pic} alt="" />
                <p className='ShowMessageCommentUsername'>{props.name}</p>
            </div>
            <div className='ShowMessageBodyDiv'>
                <p className='CommentMessage'>{props.commentsMessage}</p>
            </div>
            </div>            
            <Dropdown overlay={menu} trigger={"click"} placement="topLeft">
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                 <MoreOutlined style={{fontSize : '18px'}}/>
            </a>
           </Dropdown>   
        </div>
    );
}
export default Showcommentdiv;

