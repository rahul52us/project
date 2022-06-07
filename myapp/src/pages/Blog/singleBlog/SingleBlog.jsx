import React, { useState , useEffect } from 'react';
import '../BlogComp/BlogComp.scss';
import './SingleBlog.scss';
import { Link, useParams } from 'react-router-dom'
import BlogComp from '../BlogComp/BlogComp'
import api from '../../../config/backendApi/BackendApi'
import { Result, Button } from 'antd';
import { connect } from 'react-redux';


const SingleBlog = (props) => {
    const [undefinedState,setUndefinedState] = useState(false)
    const [BlogState,setBlogState] = useState(null)
    const  {id} = useParams()

    const GetBlogFunction = async (id) => {
        try
        {
            const response = await api.post('/api/blog/getsingleBlog',{_id:id})
            setBlogState(response.data)
        }
        catch(err)
        {
            console.log(err)
            setUndefinedState(true)
        }
    }
    useEffect(()=>{
        if(id)
        {
            GetBlogFunction(id)
        }
        else        
        {
            setUndefinedState(true)
        }
    },[])

  return (
    <div>
        {
            !undefinedState  ? 
            <div className='blog_container'>
            <div className='blogs'>
               {BlogState &&  <BlogComp item={BlogState} key={BlogState._id} index={1} user={props.user} singleBlog="singleBlog"/> } 
            </div>
            </div>            
             :  
             <div className='ErrorPart'>
              <Result
                    status="warning"
                    title="There are some problems with your operation."
                    extra={
                    <Button type="primary" key="console">
                    <Link to="/blog">click</Link>
                   </Button>                
             }
           />
           </div>
        }
    </div>
  )
}
const mapStateToProps = (state) => {
    return {        
        user : state.AuthReducer.user
    }
  }
export default connect(mapStateToProps,null)(SingleBlog)