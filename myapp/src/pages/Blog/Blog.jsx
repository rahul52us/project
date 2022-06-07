import React,{useState , useEffect , useMemo } from 'react';
import './Blog.scss'
import { Button, Row } from 'antd';
import { connect } from 'react-redux';
import { GET_BLOG_ACTION } from '../../store/projectStore/BlogStore/action';
import Blogcomp from './BlogComp/BlogComp';
import { Loader } from '../../config/Notify/Notify';

const Blog = (props) => {  
  const [page,setPage] = useState(1)

  useEffect(()=>{
    props.blogs.loading=true
    props.blogs.BLOG=[]
    setPage(1)
    props.GET_BLOG_ACTION(page)
  },[])

  const handleMoreData = () => {
    props.blogs.loading=true
    props.GET_BLOG_ACTION(page+1)
    setPage(page + 1)    
  }

  const BlogMemo = useMemo(()=>{
    return (
      <div className='blogs'>
    {
       props.blogs &&  props.blogs.BLOG.map((item,index)=>{                
        return (
          <Blogcomp item={item} key={item._id} index={index} user={props.user} />
        )
      })
    }
    </div>
    )
  },[props.blogs.BLOG,props.user])

  return (    
    <Row className='blog_container'>    
      {BlogMemo}    
    {props.blogs.loading ? <Loader size={"large"} text="Please Wait "/> : props.blogs.hasMoreData &&  <Button onClick={handleMoreData} className='blog_load_button'> Load More </Button>}
    </Row>    
  );
}

const mapStateToProps = (state) => {
  return {
      blogs : state.BlogReducer,
      user : state.AuthReducer.user
  }
}
const mapDispatchToProps = {
  GET_BLOG_ACTION : GET_BLOG_ACTION
}
export default connect(mapStateToProps,mapDispatchToProps)(Blog)




