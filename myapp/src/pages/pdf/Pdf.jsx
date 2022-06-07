import React, { useEffect , useState , useMemo } from 'react';
import './pdf.scss';
import { connect } from 'react-redux';
import { Empty, Row, Select, Spin , Col } from 'antd';
import { FETCH_ALL_PDF_CATEGARIES_ACTION } from '../../store/projectStore/pdf/createPdfCategaries/action';
import Pdfcategarycomp from './PdfCategaryComp/PdfCategaryComp';
import { GET_PDF_ACTION } from '../../store/projectStore/pdf/action';

const Pdf = (props) => {
    const [selectedPdf,setSelectedPdf]= useState(null)
    
    useEffect(()=>{
        props.CategaryPdf.PDF=[]
        props.GET_PDF_ACTION({categary : "all" , page : 1})        
        props.FETCH_ALL_PDF_CATEGARIES_ACTION()
        setSelectedPdf("All Types Notes")
    },[])

    const handleCategaryChange = (e) => {
        props.CategaryPdf.PDF=[]
        props.GET_PDF_ACTION({categary : e , page : 1})                
        setSelectedPdf(e)      
    }
    
    const PdfCompMemo = useMemo(()=>{
        return(        
            props.CategaryPdf && props.CategaryPdf.PDF.map((item,index)=>{
                return (
                    <Col xxl={{span:7}} xl={{span:7}} md={{span:11}} sm={{span:20}} xs={{span:20}} key={index}>
                    <Pdfcategarycomp item={item} key={index} user={props.user} selectedPdf={selectedPdf}/>                              
                    </Col>
                )
            })
     )          
    },[props.CategaryPdf])

    return (
        <Row style={{width:'100%'}}>
            <Col span={24}>
            <Row justify='end'>
            <Select showSearch placeholder="Search pdfs here" style={{width:'200px'}} onChange={handleCategaryChange}>
            <Select.Option value={"all"} >All Types Notes</Select.Option>                            
                {                    
                    props.ALL_PDF_CATEGARY.allPdf && props.ALL_PDF_CATEGARY.allPdf.map((item,index)=>{
                        return (
                            <Select.Option value={item.title} key={index}>{item.title}</Select.Option>                            
                        )
                    })
                }                                                   
              </Select>
            </Row>            
            </Col>
              <Col span={24}>
                  <Row justify='space-around'>
                 {PdfCompMemo}                   
                 </Row>                  
                 </Col>
              <div className='Loader'>
              <Spin/>
              </div>
              <Empty description="No More Notes ☹️" />
        </Row>
    );
}

const mapStateToProps = (state) => {
return {
    ALL_PDF_CATEGARY:state.CreatepdfCategaryReducer,
    CategaryPdf : state.DashPdfReducer,
    user : state.AuthReducer.user
}
}

const mapDispatchToProsp = {
    GET_PDF_ACTION : GET_PDF_ACTION,
    FETCH_ALL_PDF_CATEGARIES_ACTION:FETCH_ALL_PDF_CATEGARIES_ACTION    
}

export default connect(mapStateToProps,mapDispatchToProsp)(Pdf)
