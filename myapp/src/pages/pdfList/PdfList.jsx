import React, { useState, useEffect } from 'react';
import './PdfList.scss'
import { connect } from 'react-redux';
import { FETCH_ALL_PDF_CATEGARIES_ACTION } from '../../store/projectStore/pdf/createPdfCategaries/action';
import { Table, Tooltip , message, Button, Popconfirm, Select, Row } from 'antd';
import { CheckCircleOutlined, EditOutlined , PlusSquareOutlined  } from '@ant-design/icons';
import { DELETE_DASH_PDF_ACTION, GET_PDF_ACTION } from '../../store/dashPdfStore/action';
import { EDIT_PDF_ACTION } from '../../store/dashPdfStore/action';
import { Modal } from 'antd';
import Editpdfmodal from './EditPdfModal/EditPdfModal';
import PdfCreater from './CreatePdf/PdfCreater';

const PdfList = (props) => {
    const [page,setPage] = useState(1)
    const [data,setData] = useState([])
    const [ShowPdfCreate,setShowPdfCreate] = useState(false)
    const [EditModal,setEditModal] = useState(null)
    const [SelectCategary,setSelectCategary] = useState("all")
    const [pdfColumn,setPdfColumn] = useState([])

    useEffect(()=>{    
        props.ALL_PDF_CATEGARY.loading=true    
        props.FETCH_ALL_PDF_CATEGARIES_ACTION()
    },[])

    useEffect(()=>{
        props.CategaryPdf.PDF=[]
        props.CategaryPdf.loading=true
        setPage(1)
        SelectCategary === "all" ?  props.GET_PDF_ACTION({categary:"all",page:1}) : props.GET_PDF_ACTION({categary : SelectCategary,page:1})
    },[SelectCategary])
        
    useEffect(() => {                
        const data = []    
        props.CategaryPdf.PDF.forEach((item,index)=>{
            data.push({
                key:index,
                sno:index+1,
                title:item.title,
                isPaid:String(item.isPaid),
                categary:item.categary,
                pdf : item.pdf,
                edit : item,
                delete : item
            })   
           })
           setData(data)
    }, [props.CategaryPdf]);

    function DeleteFunction(item)
    {props.DELETE_DASH_PDF_ACTION({Id : item._id,PDF_DATA:props.CategaryPdf.PDF})}

    function EditFunction(item){        
        setEditModal(item)}

    useEffect(() => {        
        setPdfColumn([        
            {
            align:'center',
            title: "sno",
            dataIndex: "sno",
            filtered : true,    
            width:'40px',
            render : (text) => <p>{text}.</p>
           },
          {
            align:'center',
            title: "categary",
            dataIndex: "categary",
            filtered : true,
            width:'160px'           
          },
          {
            align:'center',
            title: "title",
            dataIndex: "title",
            width:'maxContent' ,         
          },
          {
           align:'center',
           title:"pdf",
           dataIndex:"pdf",
           render : (pdf) => <Tooltip title="click the link to see the preview of the file"><a href={`${process.env.REACT_APP_BACKEND_API}/pdf/${pdf}`} target="_blank">{pdf}</a></Tooltip>,
          },
          {
           align:"center",
           title:"isPaid",
           dataIndex:"isPaid",
           width:'60px'                      
          },
          {
            align:'center',
            title : "edit",
            dataIndex : "edit",
            render : (text) => <Popconfirm title="confirm to edit" onCancel={() => message.warn("denied for edit")} onConfirm={() => EditFunction(text)}><Button><EditOutlined /></Button></Popconfirm>
        },
        {           
           align:'center',
           title : "delete",
           dataIndex : "delete",
           render : (text) => <Popconfirm title="confirm to delete" onCancel={() => message.warn("denied for remove")} onConfirm={() => DeleteFunction(text)}><Button><CheckCircleOutlined /></Button></Popconfirm>
        }
    ])
    },[])


    const LoadMorePdf = () => {
        props.CategaryPdf.loading=true
        SelectCategary === "all" ?  props.GET_PDF_ACTION({categary:"all",page:page+1}) : props.GET_PDF_ACTION({categary : SelectCategary,page:page+1})
        setPage(page+1)
    }   

    return (
        <div>        
            <Modal footer={null} visible={ShowPdfCreate} onCancel={() => setShowPdfCreate(false)}>
            <PdfCreater setShowPdfCreate={setShowPdfCreate}/>
            </Modal>    
            <Row justify='space-between'>
            <Button onClick={() => setShowPdfCreate(true)}> <PlusSquareOutlined />Create New </Button>
            <Select style={{width:'200px'}} showSearch placeholder="Search pdfs here" defaultValue={SelectCategary} className='SelectCategary' onChange={(e) => setSelectCategary(e)} >
            <Select.Option value={"all"} key={"all"}>All pdf</Select.Option>                            
                        { props.ALL_PDF_CATEGARY.allPdf && props.ALL_PDF_CATEGARY.allPdf.map((item,index)=>{
                                return (
                                    <Select.Option value={item.title} key={index}>{item.title}</Select.Option>                            
                                )
                            })}                                                   
            </Select>            
            </Row>        
            <Table  
            style={{overflowX:'auto',backgroundColor:'white',height:'calc(100vh - 160px)',marginBottom:'5px'}}  
            bordered={true}
            loading={props.CategaryPdf.loading}
            columns={pdfColumn}
            dataSource={data}
            size="small"
            pagination={{ position: ['topRight'] , style:{position:'fixed',right:'20px',bottom:'10px',margin:'5px'}}}
            />               
            <Row justify='center'>
             { props.CategaryPdf.hasMoreData &&  <Button loading={props.CategaryPdf.loading} onClick={LoadMorePdf}>Load More</Button> }
            </Row>
        
            {                
                EditModal && <Editpdfmodal EditModal={EditModal} setEditModal={setEditModal} ALL_PDF_CATEGARY={props.ALL_PDF_CATEGARY} CategaryPdf={props.ALL_PDF_CATEGARY} PDF_DATA={props.CategaryPdf.PDF} EDIT_PDF_ACTION={props.EDIT_PDF_ACTION}/>            
            }            
        </div>
    );
}
const mapStateToProps = (state) => {    
    console.log(state)
return {
    ALL_PDF_CATEGARY:state.CreatepdfCategaryReducer,
    CategaryPdf : state.DashPdfReducer,
    user : state.AuthReducer.user
}
}
const mapDispatchToProsp = {
    GET_PDF_ACTION : GET_PDF_ACTION,
    FETCH_ALL_PDF_CATEGARIES_ACTION:FETCH_ALL_PDF_CATEGARIES_ACTION,
    DELETE_DASH_PDF_ACTION:DELETE_DASH_PDF_ACTION,
    EDIT_PDF_ACTION:EDIT_PDF_ACTION
}
export default connect(mapStateToProps,mapDispatchToProsp)(PdfList)

