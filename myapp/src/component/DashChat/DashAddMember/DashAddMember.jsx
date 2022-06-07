import { Input , Button, Spin, Empty } from 'antd'
import React,{useEffect, useState} from 'react';
import './DashAddMember.scss';
import { connect } from 'react-redux'
import { GET_ALL_USERS_ACTION } from '../../../store/DashchatStore/actions'
import DashAddUser from '../DashChatUser/DashAddUser';
import { ADD_MEMBERS_TO_GROUP_ACTION } from '../../../store/DashchatStore/actions';

const DashAddMember = (props) => {
  
  const [searchUser,setSearchUser] = useState('')
  const [page,setPage] = useState(1)
  
  useEffect(() => {
      props.GroupChatReducer.AllUsers = []    
      props.GET_ALL_USERS_ACTION({page : page})
  },[])

  const FetchMoreUser = () => {
    props.GET_ALL_USERS_ACTION({page : page + 1})
    setPage(page + 1)

  }

  return (
    <div className='DashAddMember'>
        <div className='DashAddMemberTop'>
            <Input placeholder='Search members here' value={searchUser} onChange={(e) => setSearchUser(e.target.value)} />
        </div>
        <div className='DashAddMemberBody'>
            {
                !props.GroupChatReducer.loading ? 
                props.GroupChatReducer.AllUsers.map((item) => {                     
                    return (                    
                        <DashAddUser user={item} key={item._id} Group={props.Group} ADD_MEMBERS_TO_GROUP_ACTION={props.ADD_MEMBERS_TO_GROUP_ACTION}/>               
                    )
                }) : 
                <div className='ShowDrawerSpinner'>
                    <Spin size='large'/>
                </div>
            }
        </div>        
        <div className='ShowLoadMoreButton'>
            {console.log(props.GroupChatReducer.hasMoreUser)}
            {
                props.GroupChatReducer.loading ? <Spin /> 
                : 
                (
                props.GroupChatReducer.hasMoreUser 
                ? 
                <Button onClick={FetchMoreUser}>Load More</Button> : <Empty />
                )
            }
            
        </div>
    </div>
  )
}


const mapStateToProps = (state) => {    
    return {
        GroupChatReducer : state.GroupChatReducer
    }
}


const mapDispatchToProps = {
    GET_ALL_USERS_ACTION : GET_ALL_USERS_ACTION,
    ADD_MEMBERS_TO_GROUP_ACTION : ADD_MEMBERS_TO_GROUP_ACTION        
}

export default connect(mapStateToProps,mapDispatchToProps)(DashAddMember)

