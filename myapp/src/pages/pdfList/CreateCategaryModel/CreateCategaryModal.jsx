import React from 'react';
import {Modal , Input } from 'antd'


const LabelClass = {
    marginBottom:'25px',
    color:'blue'
}

const Createcategarymodal = (props) => {
    return (
        <div>
             <Modal visible={props.visible} onCancel={props.HideModal}  onOk={props.CreateCategaryPdfApi} >
                   <label style={LabelClass}>Enter the categary : </label>
                   <Input type="text" value={props.categaryTitle} onChange={(e) => props.setCategaryTitle(e.target.value)}  />
            </Modal>
        </div>
    );
}

export default Createcategarymodal;
