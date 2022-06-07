import React,{useState} from 'react';
import { Button, Card, Divider, Drawer, Form, message, Modal, Popconfirm, Spin, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import DashChatUser from './DashChatUser/DashChatUser';
import Inputcomponent from '../../common/inputComponent/InputComponent';
import DashAddMember from './DashAddMember/DashAddMember';

const DashChatCard = (props) => {

    const [page,setPage] = useState(1)
    const [showDrawser,setShowDrawer] = useState(false)
    const [ShowEditModal,setShowEditModal] = useState(false)
    const [ShowAddMemberModal,setShowtddMemberModal] = useState(false)
    const [EditData,setEditData] = useState(props.GroupName)
    const DeleteGroupFunction = (GroupId) => {
        props.DELETE_GROUP_CHAT_ACTION({chatId:GroupId})
    }


    const EditGroupNameFunction = () => {
        if(!EditData.trim())
        {
            message.info("Please Provide the Correct GroupName ")
            return
        }

        props.GroupChatReducer.loading = true
        props.EDIT_GROUP_CHAT_NAME_ACTION({GroupName : EditData,chatId : props.GroupId})
        setEditData('')
        setShowEditModal(false)
    }


    const FetchMoreDashUser = () => {
        props.GroupChatReducer.FetchUserLoader=true
        props.FETCH_GROUP_CHAT_MEMBERS_ACTION({chatId:props.GroupId,page : page + 1 })
        setPage(page + 1)
    }

    const ShowGroupMemberFunction = async() => {
        props.GroupChatReducer.FetchUserLoader=true
        props.FETCH_GROUP_CHAT_MEMBERS_ACTION({chatId:props.GroupId,page : page })
        setShowDrawer(true)
    }



    return (
        <div className='DashChatCard'>             
            <Card title={<Tooltip title={props.GroupName}>{props.GroupName}</Tooltip>} extra={<Button onClick={ShowGroupMemberFunction}>Click here to see members</Button>} style={{ width: 320 }}>
                <p>Total Members : {props.item.users.length}</p>
                <div className='DashChatCardButton'>
                    <p className='DashChatGroupName'>Edit GroupName</p>
                    <Button onClick={() => setShowEditModal(true)}><EditOutlined />Edit</Button>
                </div>
                <div className='DashChatCardButton'>
                    <p className='DashChatGroupName'>Delete Group</p>
                    <Button><Popconfirm title="confirm to delete" onConfirm={() => DeleteGroupFunction(props.GroupId)}><DeleteOutlined style={{marginRight:'4px'}}/>Delete</Popconfirm></Button>
                </div>                            
            </Card>                 

            {/* this is a section for the fetch group  users display */}
            <Drawer className='DashChatCardDrawer' visible={showDrawser} width={window.innerWidth < 576 ? '100%' : '40%'} onClose={() => setShowDrawer(false)}>
                <div className='DrawerNewMemberButton'>
                <Button onClick={() => setShowtddMemberModal(true)}><PlusCircleOutlined />Add More Member</Button>
                </div>
                {
                    !props.GroupChatReducer.FetchUserLoader ? 
                    props.GroupChatReducer.GroupMembers.map((user) => {
                        return(
                        <DashChatUser GroupId={props.GroupId} REMOVE_MEMBER_FROM_CHAT_GROUP_ACTION={props.REMOVE_MEMBER_FROM_CHAT_GROUP_ACTION} user={user} key={user._id} />       
                        )
                    }) : <div className='ShowDrawerSpinner'><Spin size='large'/><p style={{marginTop:'10px'}}>Please Wait</p></div>
                }
            </Drawer>

            {/*  this is a end section of the fetch group users display  */}

            <Modal visible={ShowEditModal} onCancel={() => setShowEditModal(false)} footer={[<Button onClick={EditGroupNameFunction} key={"EditButton"}>Add</Button>]}>
                <Form onFinish={EditGroupNameFunction}>
                <p>Enter the Edit Group Name:-</p>
                <Inputcomponent type="text" value={EditData} onChange={(e) => setEditData(e.target.value)} name="EditName" placeholder={"Enter the Rename GroupName"} />
                </Form>
            </Modal>
            
            <Drawer visible={ShowAddMemberModal} onClose={() => setShowtddMemberModal(false)}  width={window.innerWidth<576 ? '100%' : '70%'}>
                <DashAddMember Group={props.Group} FetchMoreDashUser={FetchMoreDashUser}/>
            </Drawer>            
    </div>
    )
}
export default DashChatCard;
