import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Drawer, Popconfirm , Avatar ,Row } from 'antd';
import { connect } from 'react-redux';
import { DELETE_USER_TOKEN_ACTION, GET_USERS_ACTION } from '../../store/dashUserStore/action';
import UserListModal from '../UserListModal/UserListModal';
import { DELETE_PDF_ACCESS_ACTION } from '../../store/dashUserStore/action';
import { FETCH_ALL_PDF_CATEGARIES_ACTION } from '../../store/projectStore/pdf/createPdfCategaries/action';
import { CREATE_USER_ACCESS_PDF_ACTION } from '../../store/dashUserStore/action';
import EditUserDetail from './EditUserDetails/EditUserDetails';
import CreateDashProfileDetail from './CreateDashProfileDetail/CreateDashProfileDetail';
import CreateNewUserModal from './CreateNewUserModal/CreateNewUserModal';
import { BLOCK_USER_ACTION } from '../../store/dashUserStore/action';
import { UPDATE_EXTRA_INFO_USER_ACTION } from '../../store/dashUserStore/action';
import AppsBreadcrumbComponent from '../../config/AppBreadCrum/AppBreadCrumComponent'

const UserList = (props) => {
  const [data,setData] = useState([])
  const [Columnheaders,setColumnHeaders] = useState([])
  const [page,setPage] = useState(1)
  const [ShowRegister,setShowRegister] = useState(null)
  const [showModal,setShowModal] = useState(false)  
  const [EditModal,setEditModal] = useState(null)
  const [showCreatedModal,setShowCreatedModal] = useState(null)

  useEffect(()=>{    
    props.AllUsers.AllUsers = []
    props.AllUsers.loading=true    
    props.GET_USERS_ACTION(page)
  },[])
  
  useEffect(()=>{
    props.AllUsers.loading=true
    props.FETCH_ALL_PDF_CATEGARIES_ACTION()
  },[])

  function ShowModalFunction(flag,data)
  {        
    setShowModal({flag : flag , data : data })
  }

  const BlockUserFunction = (data) => {
    props.AllUsers.loading=true
    props.BLOCK_USER_ACTION(data._id)  
  }

  const userDetailInfoFunction  = (data) => {       
    if(data.ExtraInfo)
    {            
      setEditModal(data)
      return 
    }    
    if(!data.ExtraInfo)
    {
      setShowCreatedModal(data)
      return
    }    
  }
  const LoadMoreUserFunction = () => {
    props.AllUsers.loading=true
    setPage(page + 1)
    props.GET_USERS_ACTION(page + 1)
  }
  
  useEffect(() => {
    var headers = []
    props.headers.forEach((item)=>{  
      if(item==="Email")
      {
          headers.push({
            align:'center',          
            title: item,          
            dataIndex: item,          
            render : (data) =>  <Popconfirm title="block the user" onConfirm={() => BlockUserFunction(data)}><p className='DashBlockUser_tag'>{data.email}</p></Popconfirm>
          })      
      }
      else if(item === "pic")
      {
        headers.push({
          align:'center',
          title: item,
          dataIndex: item,
          render : (text) => <Avatar src={text} alt=""/> 
        })      
      }    
      else if(item==="Tokens")    
        {
          headers.push({
            align:'center',
            title: item,
            dataIndex: item,
            render : (text) => <Button onClick={() => ShowModalFunction(2,text)}>Tokens</Button>
          })      
      }
      else if(item==="pdfAccess")
        {
          headers.push({
            align:'center',
            title: item,
            dataIndex: item,
            render : (text) => <Button onClick={() => ShowModalFunction(1,text)}>Pdf Accessbility</Button>
          })      
      }  
    else if(item==="Extra") 
      {
        headers.push({
          align:'center',
          title: item,
          dataIndex: item,
          render : (text) => <Button onClick={() => userDetailInfoFunction(text)}>Extra</Button>
        })      
      }  
    else
    {
      headers.push({
        align:'center',
        title: item,
        dataIndex: item      
      })
    }
    })
    setColumnHeaders(headers)
  },[props.headers]);

  useEffect(() => {
    var data = []
    props.AllUsers.AllUsers.forEach((item,index)=>{
      data.push({
          key: index,
          Name: `${item.name}` ,
          Email :item,
          pic : `${item.pic}`,
          pdfAccess : item,
          Tokens : item,
          Extra : item
      }) 
    })      
    setData(data)
  },[props.AllUsers]);

  return (
    <div>
      <Modal footer={null} visible={showModal} onCancel={() => setShowModal(false)}>
        {showModal && <UserListModal flag={showModal.flag} setShowModal={setShowModal} DELETE_USER_TOKEN_ACTION={props.DELETE_USER_TOKEN_ACTION} data={showModal.data} DELETE_PDF_ACCESS_ACTION={props.DELETE_PDF_ACCESS_ACTION} CREATE_USER_ACCESS_PDF_ACTION={props.CREATE_USER_ACCESS_PDF_ACTION} pdfCategary={props.Allpdfs} /> } 
      </Modal>
      <Row justify='space-between' style={{alignItems:'center'}}>
      <AppsBreadcrumbComponent items={[{name : 'dashboard' , link : '/dashboard'},{name : 'Block Users' , link :'/dashboard/users/Blocks'},{name : 'userList'}]}/>
      <Button style={{margin:'5px'}} onClick={() => setShowRegister(true)}>Create New User</Button>                   
      </Row>             
      {
        Columnheaders.length > 0 && 
        <Table      
        style={{overflowX:'auto',backgroundColor:'white',height:'calc(100vh - 160px)'}}             
        size='middle'
        bordered={true}
        loading={props.AllUsers.loading}              
        columns={Columnheaders}
        dataSource={data}
        pagination={{ position: ['bottomRight'] , style:{position:'fixed',right:'20px',bottom:'20px',margin:'2px'}}}
      />      
      }
      <Row justify='center' style={{marginTop:'20px'}}>
      { props.AllUsers.hasMoreUser && <Button loading={props.AllUsers.loading} onClick={LoadMoreUserFunction}>Load More</Button>}    
      </Row>
      <Drawer visible={EditModal} width={window.innerWidth < 786 ? '100%' : '40%'} onClose={() => setEditModal(null)}>
          { EditModal &&   <EditUserDetail state={EditModal} setEditModal={setEditModal} />}
      </Drawer>              
      <Drawer visible={showCreatedModal} width={window.innerWidth < 786 ? '100%' : '40%'} onClose={() => setShowCreatedModal(null)}>
      { showCreatedModal && <CreateDashProfileDetail UPDATE_EXTRA_INFO_USER_ACTION={props.UPDATE_EXTRA_INFO_USER_ACTION} state={showCreatedModal} setShowCreatedModal={setShowCreatedModal} /> }
      </Drawer>

     <Drawer visible={ShowRegister} width={window.innerWidth < 786 ? '100%' : '40%'}  onClose={() => setShowRegister(null)}>
     { ShowRegister &&   <CreateNewUserModal /> }
     </Drawer>

    </div>
  );
};

const mapStateToProps = (state) => {  
  return {
    AllUsers : state.DashUserReducer,
    headers : state.DashUserReducer.headers,
    Allpdfs : state.CreatepdfCategaryReducer
  }
}

const mapDispatchToProps = {
  GET_USERS_ACTION : GET_USERS_ACTION,
  DELETE_PDF_ACCESS_ACTION : DELETE_PDF_ACCESS_ACTION,
  CREATE_USER_ACCESS_PDF_ACTION : CREATE_USER_ACCESS_PDF_ACTION,
  FETCH_ALL_PDF_CATEGARIES_ACTION:FETCH_ALL_PDF_CATEGARIES_ACTION,
  DELETE_USER_TOKEN_ACTION : DELETE_USER_TOKEN_ACTION,
  BLOCK_USER_ACTION : BLOCK_USER_ACTION,
  UPDATE_EXTRA_INFO_USER_ACTION : UPDATE_EXTRA_INFO_USER_ACTION
}

export default connect(mapStateToProps,mapDispatchToProps)(UserList)
