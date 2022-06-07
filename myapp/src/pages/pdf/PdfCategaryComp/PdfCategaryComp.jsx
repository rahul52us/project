import { Card, Row, Tooltip , Col } from 'antd';
import React from 'react';
import './PdfCategaryComp.scss'
import { Document, Page } from 'react-pdf';
import {useNavigate,Link} from 'react-router-dom'
import Filepaymentpage from '../FilePaymentPage/FilePaymentPage';

const Pdfcategarycomp = ({item,user,selectedPdf}) => {
    
    return (
        <Row>
            <Card title={item.title}> 
            <Row justify='center' gutter={[10,20]}>
            <Col span={12}>
                <a href={`${process.env.REACT_APP_BACKEND_API}/pdf/${item.pdf}`} target="_blank" rel="noreferrer" >
                   <img src={`${process.env.PUBLIC_URL}/searchicon.png`} alt="" style={{width:'100%'}} download />            
                </a>
            </Col>
            </Row>
            <div className='pdfcontainer_bottom'>
            <p className='pdf_title'>{item.title}</p>
            {
                item.isPaid ? user?.pdfAccess.includes(selectedPdf) ? <a href={`${process.env.REACT_APP_BACKEND_API}/pdf/${item.pdf}`} download>Download</a> : 
                <Tooltip title={user?.pdfAccess.includes(selectedPdf) ? `download ${item.title} pdf` :  `${user ? `you have to purchase the subscription for  ${item.title} pdf of ${selectedPdf}` : 'login your account to download the pdf'}`} >
                <Link to="/paid/file/payment" >download</Link>                    
                </Tooltip>
                :                
                <a href={`${process.env.REACT_APP_BACKEND_API}/pdf/${item.pdf}`} download target="_blank" rel="noreferrer">Download</a>                 
            }            
            </div>
            </Card>            
        </Row>
    );
}
export default Pdfcategarycomp;

{/* <a href={`${process.env.REACT_APP_BACKEND_API}/pdf/${item.pdf}`} download>Download</a> */}
