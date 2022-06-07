import React from 'react';
import { Modal, Typography } from 'antd';

const Youtubemodel = ({state,VisibilityToggle}) => {    
    return (        
            <Modal visible={state.visibility} cancelText="close"  footer={null}  onCancel={() => VisibilityToggle()}>
            <Typography.Title level={5}>{state.VideoTitle}</Typography.Title>
            <iframe width="100%" height="350" style={{margin:'0px',objectFit:'cover'}}           
             src={`https://www.youtube.com/embed/${state.Videourl}`} 
             title="YouTube video player" frameBorder="0" 
             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
             allowFullScreen >
             </iframe>
            </Modal>        
    );
};
export default Youtubemodel;
