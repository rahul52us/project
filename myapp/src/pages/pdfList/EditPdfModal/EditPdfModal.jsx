import React, { useState } from 'react';
import Moment from 'react-moment';
import { InboxOutlined } from '@ant-design/icons';
import { Switch , Input , Select , Modal } from 'antd';


const Editpdfmodal = (props) => {

    const [EditData,setEditData] = useState({
        _id:props.EditModal._id,
        title : props.EditModal.title,
        categary : props.EditModal.categary,
        pdf : props.EditModal.pdf,
        isPaid : props.EditModal.isPaid
    })

    const functionUpdateData = () => {
        props.EDIT_PDF_ACTION({Id : EditData?._id,contentData:EditData,PDF_DATA:props.CategaryPdf.PDF}) 
        props.setEditModal(null)               
    }
    return (
        <div>
                <Modal visible={props.EditModal} onCancel={() => props.setEditModal(null)} onOk={functionUpdateData}>
                <div className='EditModalContainer'>
                    <div className='EditModalTop'>
                        <p>created At : <Moment format='YYYY/MM/DD'>{props.EditModal.createdAt}</Moment></p>
                        <p>Last updated At : <Moment format='YYYY/MM/DD'>{props.EditModal.updatedAt}</Moment></p>
                    </div>
                <p className='EditModalHeader'>{EditData.title}</p>
                <div className='EditModalMiddle'>
                    <div className='EditModalInputs'>
                        <label className='EditModalLabel'>
                            Title : 
                        </label>
                        <Input placeholder='Enter the title' value={EditData.title} onChange={(e) => setEditData({...EditData,title : e.target.value})}/>
                    </div>
                    <div className='EditModalInputs'>
                        <label className='EditModalLabel'>
                            Change the paid version of the pdf : 
                            <Switch checked={EditData.isPaid} onChange={() => setEditData({...EditData,isPaid : !EditData.isPaid})}/>
                        </label>                       
                    </div>
                    <div className='EditModalInputs'>
                       <label className='EditModalLabel'>
                            Categary : 
                        </label>
                        <Select showSearch placeholder="Search pdfs here" defaultValue={props.EditModal.categary} className='SelectCategary' onChange={(e) => setEditData({...EditData,categary:e})} >
                        {
                            props.ALL_PDF_CATEGARY.allPdf && props.ALL_PDF_CATEGARY.allPdf.map((item,index)=>{
                                return (
                                    <Select.Option value={item.title} key={index}>{item.title}</Select.Option>                            
                                )
                            })
                        }                                                   
                        </Select>
                    </div>
                    <div className='EditModalInputs'>                        
                        <label className='ImageUploadIcon'htmlFor='file' ><InboxOutlined  className="PlusOutlineIcon" /></label>                        
                            <input type="file" id="file" style={{display:'none'}} onChange={(e) => setEditData({...EditData,pdf:e.target.files[0]})}/>   
                            <p className='UploadTitle'>upload the pdf</p>                                                                         
                    </div>
                </div>
                </div>                
            </Modal>
        </div>
    );
}
export default Editpdfmodal;
