import { Input, Modal } from 'antd';
import React, { useState } from 'react';
import { useStore } from 'react-redux';
import './EditVideoModal.scss'
import { Select } from 'antd';
import { connect } from 'react-redux';
import { EDIT_YOUTUBE_VIDEOS_ACTION } from '../../../store/projectStore/videos/action';

const Editvideomodal = (props) => {

    const [state,setState] = useState({
        _id : props.EditModal._id,
        title : props.EditModal.title,
        url : props.EditModal.url,
        categary : props.EditModal.categary
    })

    const EditVideoFunction = () => {
        props.EDIT_YOUTUBE_VIDEOS_ACTION(state)
        props.setEditModal(null)
    }

    return (
        <div>
            <Modal visible={props.EditModal} onCancel={() => props.setEditModal(null)} onOk={EditVideoFunction}>
                <div className='EditVideoModalContainer'>
                    <div className='EditVideoModalHeader'>
                        <p>{props.EditModal.categary}</p>
                    </div>
                    <div className='EditVideoModalContainer'>
                        <div className='EditVideoModalInputDiv'>
                        <label>
                        title *
                        </label>
                        <Input value={state.title} onChange={(e) => setState({...state,'title':e.target.value})} placeholder="Enter the title" />
                        </div>
                        <div className='EditVideoModalInputDiv'>
                        <label>
                        url Id *
                        </label>
                        <Input value={state.url} onChange={(e) => setState({...state,'url':e.target.value})} placeholder="Enter the url Id" />
                        </div>

                        <div className='EditVideoModalInputDiv'>
                        <label>
                            categary *
                        </label>
                        <div>
                    <Select className="YouTubeVideoSelector" defaultValue={state.categary} onChange={(e) => setState({...state,'categary':e})} >
                        {
                            props.youtubeCategary.map((item,index)=>{
                            return (
                                <Select.Option key={index} value={item.categary}>{item.categary}</Select.Option>
                            )
                            })
                        }              
                    </Select>
                    </div>                                    
                        </div>
                    </div>
                </div>
            </Modal>
            
        </div>
    );
}

const mapDispatchToProps = {
    
    EDIT_YOUTUBE_VIDEOS_ACTION : EDIT_YOUTUBE_VIDEOS_ACTION
}

export default connect(null,mapDispatchToProps)(Editvideomodal)

 
