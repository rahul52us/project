import React, { useState , useEffect } from 'react';
import axios from 'axios';
import './PdfCreater.scss'
import  {  InboxOutlined, PlusSquareOutlined, UploadOutlined  } from '@ant-design/icons';
import { Switch } from 'antd';
import {Select , Input , Button , message} from 'antd'
import Createcategarymodal from '../CreateCategaryModel/CreateCategaryModal';
import {connect} from 'react-redux'
import { GET_PDF_ACTION } from '../../../store/projectStore/pdf/action' 
import { CREATE_PDF_ACTION } from '../../../store/projectStore/pdf/action';
import { CREATE_PDF_CATEGARY_ACTION } from '../../../store/projectStore/pdf/createPdfCategaries/action';
import { FETCH_ALL_PDF_CATEGARIES_ACTION } from '../../../store/projectStore/pdf/createPdfCategaries/action';




const Pdfcreater = (props) => {

    const [data,setData] = useState({
        title : '',
        uploadPdf:null,
        isPaid:true,
        categary:'',          
    })


    useEffect(() => {        
            props.FETCH_ALL_PDF_CATEGARIES_ACTION()
    }, []);

    

    const [categaryTitle,setCategaryTitle] = useState('')

    const [showModel,setShowModel] = useState(false)

    const handleChange = (e) => {
        setData({...data,[e.target.name]:e.target.value})
    }

    const handleSwitchButton = (e) => {
        setData({...data,'isPaid':e})
    }

    const handleDropDown = (e) => {        
        setData({...data,'categary':e})
    }

    const sendData = (e) => {
        e.preventDefault()        
                
        if(data.uploadPdf)
        {
        const newForm = new FormData()
        newForm.append('file',data.uploadPdf,`${data.categary+'_'+data.title+'_'+data.uploadPdf.name}`)        
        try
        {
          axios.post(`${process.env.REACT_APP_BACKEND_API}/api/pdf/upload/pdf/`,newForm,{withCredentials:true})
          .then((res)=>{
            if (res.status === 200) {
              props.CREATE_PDF_ACTION({
                categary:data.categary,title : data.title, isPaid:data.isPaid , pdf:`${data.categary+'_'+data.title+'_'+data.uploadPdf.name}`
              })
              props.setShowPdfCreate(false)        
            }
            else
            {
                message.error('upload failed try again later')
            }
        })
        }
        catch(err)
        {
            message.error('upload failed try again later')
            return 
        }
       }
       else
       {
           message.warn("pdf is required")
           return 
       }
        setData({
            title :'',
            uploadPdf : null,
            isPaid:true,
            categary:''
        })
    }
    const CreateCategaryPdfApi = () => {        
        if(categaryTitle.trim() && categaryTitle.length>0)
        {
            props.CREATE_PDF_CATEGARY_ACTION(categaryTitle)
            setCategaryTitle('')
            setShowModel(false)
        }
        else
        {
            message.warn("please give the categary")
        }        
    }
    return (
        <div className='createpdf'>
        
            <form onSubmit={sendData}>

                <Button onClick={() => setShowModel(true)}><PlusSquareOutlined /> Create New Categary</Button>
                <div className='PdfInputDiv'>
                    <label htmlFor="title">Title</label>
                    <Input type="text" placeholder='Enter the Title' name="title" value={data.title} onChange={handleChange} required />
                 </div>                 
                 <div className='PdfInputDiv'>
                     <label>Select the Pdf catogary</label>
                     <Select onChange={handleDropDown} placeholder="Select the categary">                                                              
                     { props.Allpdfs.allPdf && props.Allpdfs.allPdf.map((item,index)=>{
                         return (
                            <Select.Option value={item.title} key={index}>{item.title}</Select.Option>
                         )
                     })
                     }
                     </Select>                                                                          
                 </div>
                 <div className='PdfInputDiv'>
                    <label htmlFor="title">{data.isPaid ? 'THIS IS PAID PDF' : 'THIS IS FREE PDF'}</label>
                    <Switch checked={data.isPaid} onClick={handleSwitchButton}/>
                 </div>
                 <div className='PdfInputDiv'>
                    <div className='fileInput'>
                      <label className='ImageUploadIcon' htmlFor='fileupload' ><InboxOutlined  className="PlusOutlineIcon" /></label>                                                
                        <Input type="file"  id="fileupload" style={{display:'none'}} placeholder='upload the pdf file' onChange={(e) => setData({...data,'uploadPdf':e.target.files[0]})} required />                    
                    </div>
                 </div>
                 <Button className='CreatePdfBtn' htmlType='submit'>create</Button>                 
            </form>
            {
                showModel && <Createcategarymodal visible={showModel} categaryTitle={categaryTitle} setCategaryTitle={setCategaryTitle} HideModal={() => setShowModel(false)} CreateCategaryPdfApi={CreateCategaryPdfApi}/>               
            }                   
        </div>
    );
};

const mapStateToProps = (state) => {    
    return {
        GetPdfs : state.PdfReducer,
        Allpdfs : state.CreatepdfCategaryReducer
    
    }
}
const mapDispatchToProps = {
    GET_PDF_ACTION:GET_PDF_ACTION,
    CREATE_PDF_ACTION : CREATE_PDF_ACTION,
    CREATE_PDF_CATEGARY_ACTION : CREATE_PDF_CATEGARY_ACTION,
    FETCH_ALL_PDF_CATEGARIES_ACTION:FETCH_ALL_PDF_CATEGARIES_ACTION        
}
export default connect(mapStateToProps,mapDispatchToProps)(Pdfcreater);
