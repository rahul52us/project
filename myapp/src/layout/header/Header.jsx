import React,{useState} from 'react';
import { Avatar, Button, Col, Drawer, Dropdown, Menu, Row } from 'antd';
import Userprofilemodal from '../../component/userProfileModal/UserProfileModal';
import { connect } from 'react-redux';
import EditUserDetail from '../../component/usersList/EditUserDetails/EditUserDetails';
import CreateProfileDetail from '../../component/usersList/CreateProfileDetail/CreateProfileDetail';
import { DELETE_USER_ACCOUNT_ACTION } from '../../store/AuthStore/action';
import { OPENCOLLAPSE_ACTION } from '../../store/layoutStore/action';
import { ME_USER_ACTION } from '../../store/AuthStore/action';
import { Link } from 'react-router-dom';

const Header = (props) => {
    const [showHeaderModal,setShowHeaderModal] = useState(false)
    const [EditModal,setEditModal] = useState(null)
    const [showCreatedModal,setShowCreatedModal] = useState(null)
    
  const userDetailInfoFunction  = (data) => {   
    if(data.ExtraInfo)
    {      
      setEditModal(data)      
    }else
     {setShowCreatedModal(data)}    
  }
      const menu = (
        <Menu>          
          <Menu.Item key="2"><Link to="/login">Login Account</Link></Menu.Item>          
        </Menu>
      );

  function CollapseSidebar()
  {
      props.OPENCOLLAPSE_ACTION(props.collapse)
  }
    return (        
        <Row justify='space-between' className='main-header'>
                    <Col>
                    <Button onClick={CollapseSidebar} style={{ display : !props.collapse ? 'block' : 'block'}} >Click me</Button>
                    </Col>                                            
                    <Col style={{marginRight:'20px'}}>                    
                            {props.user ? <Avatar src={props.user.pic} onClick={() => setShowHeaderModal(true)}/> 
                            : <Dropdown overlay={menu} trigger={"click"} placement="bottomLeft">                            
                                <Avatar />                            
                            </Dropdown>} 
                            {props.user && showHeaderModal && <Userprofilemodal userDetailInfoFunction={userDetailInfoFunction} showHeaderModal={showHeaderModal} setShowHeaderModal={setShowHeaderModal} user={props.user} />}                       
                   </Col>                                                                  
                   {                 
                        props.user &&     
                        <Drawer visible={EditModal} width={window.innerWidth < 786 ? '100%' : '30%'} onClose={() => setEditModal(null)}>
                            { EditModal && <EditUserDetail  state={EditModal} setEditModal={setEditModal} DELETE_USER_ACCOUNT_ACTION={props.DELETE_USER_ACCOUNT_ACTION}/> }
                        </Drawer>  
                    }                                          
                    {
                        props.user && 
                        <Drawer visible={showCreatedModal} width={window.innerWidth < 786 ? '100%' : '30%'}  onClose={() => setShowCreatedModal(null)}>
                            {showCreatedModal && <CreateProfileDetail ME_USER_ACTION={props.ME_USER_ACTION} state={showCreatedModal} setShowCreatedModal={setShowCreatedModal} />}
                        </Drawer>
                    }     
        </Row>      
    );
}
const mapStateToProps = (state) => {
    return {
        collapse : state.layOutReducer.collapse, 
        user : state.AuthReducer.user
    }
}
const mapDispatchToProps = {
OPENCOLLAPSE_ACTION : OPENCOLLAPSE_ACTION,
DELETE_USER_ACCOUNT_ACTION : DELETE_USER_ACCOUNT_ACTION,
ME_USER_ACTION : ME_USER_ACTION
}
export default connect(mapStateToProps,mapDispatchToProps)(Header)




