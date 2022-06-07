import React, { useState } from 'react';
import './CreateYoutubeVideoModal.scss'
import { Button, Input, message, Modal, Select } from 'antd';
import { CREATE_YOUTUBE_CATEGARY_ACTION } from '../../../store/projectStore/videos/action';
import { CREATE_VIDEOS_ACTION } from '../../../store/projectStore/videos/action';
import { connect } from 'react-redux';
import { PlusCircleOutlined, PlusCircleTwoTone } from '@ant-design/icons';


const Createyoutubevideomodal = (props) => {

    const [newCategary,setNewCategary] = useState('')
    const [showCategaryModal,setShowCategaryModal] = useState(null)

    const [NewVideo,setNewVideo] = useState({
        title : '',
        categary:null,
        urlCode:''
    })

    console.log(props)
    const CreateNewVideo = () => {
        if(!NewVideo.title || !NewVideo.categary || !NewVideo.urlCode)
        {            
            message.warn("please fill the all categary")
            return 
        }

        props.CREATE_VIDEOS_ACTION({
                categary : NewVideo.categary,
                title : NewVideo.title,
                url : NewVideo.urlCode
        })
        
    }

    const CreateNewVideoCategaryFunction = (e) => {
        e.preventDefault()
        if(!newCategary && !newCategary.trim())
        {
            message.info("Please provide the correct categary name")
            return 
        }
        var ss = props.YoutubeCategary.YoutubeCategary.filter((item,index)=> item.categary === newCategary)
        if(ss.length>0)
        {
            message.warn(`${newCategary} categary is already exists`)
            return 
        }
        props.CREATE_YOUTUBE_CATEGARY_ACTION({categary : newCategary})        
        setNewCategary('')
        setShowCategaryModal(false)
    }

    return (
        <div>            
            <Modal visible={props.newVideo} onCancel={() => props.setNewVideo(false)} onOk={() => CreateNewVideo()}>
            <div>
            <Button onClick={() => setShowCategaryModal(true)}><PlusCircleOutlined />Add New categary</Button>
            </div>
                <div className='CreateYouTubeVideoModal'>
                    <div className='CreateYoutubeModal__InputContainer'>
                        <label>
                            Title *
                        </label>
                        <Input placeholder='Enter the title for the video' type={"text"} value={NewVideo.title} onChange={(e) => setNewVideo({...NewVideo,'title':e.target.value})}/>
                    </div>
                    <div className='CreateYoutubeModal__InputContainer'>
                        <label>
                            youtube url code *
                        </label>
                        <Input placeholder='Enter the url code for the video' type={"text"} value={NewVideo.urlCode} onChange={(e) => setNewVideo({...NewVideo,'urlCode':e.target.value})}/>
                    </div>

                    <div className='CreateYoutubeModal__InputContainer'>
                        <label>
                            Categary *
                        </label>
                        <Select className="YouTubeVideoSelector" placeholder="select the categary" onChange={(e) => setNewVideo({...NewVideo,'categary':e})}>
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
            </Modal>

            {showCategaryModal && <Modal visible={showCategaryModal} footer={null} onCancel={() => setShowCategaryModal(null)}>
                <form onSubmit={CreateNewVideoCategaryFunction}>
                <p className='AddNewCategaryTitle'>Add New categary</p>
                <Input type="text" placeholder='Add New Cateagry' value={newCategary}  onChange={(e) => setNewCategary(e.target.value)} />                
                <Button style={{marginTop : '20px'}} onClick={CreateNewVideoCategaryFunction}>Add New Categary <PlusCircleTwoTone /></Button>
                </form>
                </Modal>
                }
        </div>
    );
}

const mapStateToProps = (state) => {

 console.log(state)

    return{
        YoutubeCategary : state.VideoReducer
    }
}

const mapDispatchToProps = {
    CREATE_VIDEOS_ACTION : CREATE_VIDEOS_ACTION,
    CREATE_YOUTUBE_CATEGARY_ACTION : CREATE_YOUTUBE_CATEGARY_ACTION
}

export default connect(mapStateToProps,mapDispatchToProps)(Createyoutubevideomodal)


{/* <p onClick={() => props.CREATE_YOUTUBE_CATEGARY_ACTION('beehive')}>this is rahul kushwah</p> */}