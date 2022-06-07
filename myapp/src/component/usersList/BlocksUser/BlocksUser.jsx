import { Avatar, Button, message, Popconfirm, Row, Typography } from 'antd';
import React, { useEffect , useState } from 'react';
import './BlocksUser.scss'
import { connect } from 'react-redux';
import { GET_BLOCK_USER_ACTION } from '../../../store/dashUserStore/action';
import { UNBLOCK_USER_ACTION } from '../../../store/dashUserStore/action';
import { Loader } from '../../../config/Notify/Notify';

const Blocksuser = (props) => {

    const [page,setPage] = useState(1)
    useEffect(() => {
        props.DashUserReducer.BlockUser = []
        props.DashUserReducer.loading=true
        props.GET_BLOCK_USER_ACTION(page)
    },[])

    const LoadMoreBlockUser = () => {     
        props.DashUserReducer.loading=true 
        setPage(page + 1)  
        props.GET_BLOCK_USER_ACTION(page + 1)
    }
    
    const UnBlockUserFunction = (Id) => {
        props.DashUserReducer.loading=true 
        props.UNBLOCK_USER_ACTION(Id)
    }

    return (
        <div className='BlockUser'>
            <Row justify='center'><Typography.Title level={3}>Block Users</Typography.Title></Row>
            {                                
                props.DashUserReducer.BlockUser.length > 0 && props.DashUserReducer.BlockUser.map((item,index)=>{
                    return (                        
                            <div key={index} className='BlockUserContainer'>                                
                            <div className='BlockUserInfo'>
                                <Avatar src={item.pic} alt={item.name}/>
                                <div className='BlockUserDetails'>                      
                                <p>{item.name}</p>                              
                                <p className='BlockUserEmail'>{item.email}</p>               
                                </div>               
                                </div>
                                <Popconfirm title="unblock user" onConfirm={() => UnBlockUserFunction(item._id)} onCancel={() => message.info({content:'deny for unblock user !'})}>
                                <Button>unblock</Button>
                                </Popconfirm>
                            </div>                        
                    )
                })
            }            
            <Row justify="center" style={{margin:'15px 0px'}}>
               {props.DashUserReducer.loading ?  <Loader size="large" title="Please Wait " /> : props.DashUserReducer.hasMoreBlockUser && <Button onClick={LoadMoreBlockUser}>Load More</Button>  }
                </Row>                                             
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        DashUserReducer : state.DashUserReducer
    }
}

const mapDispatchToProps =  {
    GET_BLOCK_USER_ACTION : GET_BLOCK_USER_ACTION,
    UNBLOCK_USER_ACTION : UNBLOCK_USER_ACTION    
}

export default connect(mapStateToProps,mapDispatchToProps)(Blocksuser)


