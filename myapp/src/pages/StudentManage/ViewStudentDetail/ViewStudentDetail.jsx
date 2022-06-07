import { Avatar, Drawer, Dropdown, Menu } from 'antd';
import React, { useState } from 'react';
import {MoreOutlined} from '@ant-design/icons'
import './ViewStudentDetail.scss'
import FeesStructure from '../FeesStructure/FeesStructure';
import UpdateFeesStructure from '../FeesStructure/UpdateFeesStructure';

const ViewStudentDetail = (props) => {
    const [OpenFeesModal,setOpenFeesModal] = useState(false)
    const [OpenUpdateFeesModal,setOpenUpdateFeesModal] = useState(null)
    const {data} = props

    const menu = (
      <Menu>
        {!data.userId.ScholarFees && <Menu.Item key="1" onClick={() => setOpenFeesModal(data)}>CREATE FEES</Menu.Item>}
        {data.userId.ScholarFees && <Menu.Item key="1" onClick={() => setOpenUpdateFeesModal(data)}>UPDATE FEES</Menu.Item>}
        <Menu.Item key="2">report this content</Menu.Item>        
      </Menu>
    );

    console.log('the view data is',data)
    return (
        <div className='ViewStudentDetail'>
          <div className='ViewStudentDetailAvatarContainer'>
            <div></div>
            <div className='ViewStudentDetailAvatar'>
            <Avatar src={data.userId.pic} alt="" style={{width:'100%',height:'100%'}}/>
            </div>
            <div>
              <Dropdown overlay={menu}>
              <MoreOutlined style={{fontSize:'25px' , cursor:'pointer'}}/>
              </Dropdown>
            </div>
            </div>                                    
            <div className='ViewStudentInfo'>
                <div className='ViewStudentInfoDiv'>
                    <label>
                      Name :  
                    </label>
                    <span className='ViewStudentInfoData'>{data.userId.name}</span>
                </div>
                <div className='ViewStudentInfoDiv'>
                    <label>
                      Email :  
                    </label>
                    <span className='ViewStudentInfoData'>{data.userId.email}</span>
                </div>

                <div className='ViewStudentInfoDiv'>
                    <label>
                      Class :  
                    </label>
                    <span className='ViewStudentInfoData'>{data.className}</span>
                </div>

                <div className='ViewStudentInfoDiv'>
                    <label>
                      Section :  
                    </label>
                    <span className='ViewStudentInfoData'>{data.section}</span>
                </div>

                <div className='ViewStudentInfoDiv'>
                    <label>
                      Gender :  
                    </label>
                    <span className='ViewStudentInfoData'>{data.gender}</span>
                </div>
                <div className='ViewStudentInfoDiv'>
                    <label>
                      Standard :  
                    </label>
                    <span className='ViewStudentInfoData'>{data.standard}</span>
                </div>
                
                <div className='ViewStudentInfoDiv'>
                    <label>
                      Age :  
                    </label>
                    <span className='ViewStudentInfoData'>{data.Age}</span>
                </div>                
                <div className='ViewStudentInfoDiv'>
                    <label>
                      DOB :  
                    </label>
                    <span className='ViewStudentInfoData'>{data.DOB}</span>
                </div>
                <div className='ViewStudentInfoDiv'>
                    <label>
                      Blood Group :  
                    </label>
                    <span className='ViewStudentInfoData'>{data.BloodGroup}</span>
                </div>
                <div className='ViewStudentInfoDiv'>
                    <label>
                      Father Name :  
                    </label>
                    <span className='ViewStudentInfoData'>{data.FatherName}</span>
                </div>

                <div className='ViewStudentInfoDiv'>
                    <label>
                      Mother Name :  
                    </label>
                    <span className='ViewStudentInfoData'>{data.MotherName}</span>
                </div>
                
                <div className='ViewStudentInfoDiv'>
                    <label>
                      Phone No. :  
                    </label>
                    <span className='ViewStudentInfoData'>{data.PhoneNo}</span>
                </div>

                <div className='ViewStudentInfoDiv'>
                    <label>
                      Siblings :  
                    </label>
                    <span className='ViewStudentInfoData'>{data.sibling}</span>
                </div>

                <div className='ViewStudentInfoDiv'>
                    <label>
                      Address :  
                    </label>
                    <span className='ViewStudentInfoData'>{data.address}</span>
                </div>

                <div className='ViewStudentInfoDiv'>
                    <label>
                      Country :  
                    </label>
                    <span className='ViewStudentInfoData'>{data.country}</span>
                </div>

                <div className='ViewStudentInfoDiv'>
                    <label>
                      State :  
                    </label>
                    <span className='ViewStudentInfoData'>{data.state}</span>
                </div>

                <div className='ViewStudentInfoDiv'>
                    <label>
                      City :  
                    </label>
                    <span className='ViewStudentInfoData'>{data.city}</span>
                </div>
                <div className='ViewStudentInfoDiv'>
                    <label>
                      Joining Date :  
                    </label>
                    <span className='ViewStudentInfoData'>{data.createdAt}</span>
                </div>
                <div className='ViewStudentInfoDiv'>
                    <label>
                      Description :  
                    </label>
                    <span className='ViewStudentInfoData'>{data.description}</span>
                </div>
            </div>
              <Drawer width={window.innerWidth < 786 ? '100%' : '60%'} visible={OpenFeesModal} onClose={() => setOpenFeesModal(null)}>
                {OpenFeesModal && <FeesStructure data={OpenFeesModal} />}
              </Drawer>
              <Drawer width={window.innerWidth < 786 ? '100%' : '60%'} visible={OpenUpdateFeesModal} onClose={() => setOpenUpdateFeesModal(null)}>
                {OpenUpdateFeesModal && <UpdateFeesStructure data={data} /> }
              </Drawer>
        </div>
    );
}
export default ViewStudentDetail;
