import React,{useEffect, useState} from 'react';
import SunEditor from 'suneditor-react';
import CodeMirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
import { CREATE_BLOG_ACTION } from '../../store/projectStore/BlogStore/action';
import { connect } from 'react-redux';
import { Button, message, Modal, Row , Input } from 'antd';
import api from '../../config/backendApi/BackendApi';
import { useNavigate } from 'react-router-dom';

const MyEditor = (props) => {
  const [showTitleModal,setShowTitleModal] = useState(false)
  const [title,setTitle] = useState('')
  const [data,setData] = useState()
  const navigate = useNavigate()

  useEffect(()=>{
    if(!props.user)
    {
      navigate('/login')
    }
  },[props.user])

  const handleChange = (blogData) => {
    setData(blogData)
  }
  
  const createBlog = async() => {
    try
    {            
      if(!title.trim()){ 
        message.error('Title Name is required ') 
        return 
      }
      props.CREATE_BLOG_ACTION({createdby:props.user.email,body : data , title : title})           
      message.info('blog has been created')
    }catch(err){} 
  }

  const imageUploadToServer = (files, info, uploadHandler) => {
    const newForm = new FormData()
    newForm.append('file',files[0])
    try
    {      
      api.post(`/api/blog/upload-blog/`,newForm)
      .then((res)=>{
        if (res.status >= 400) return
        const resultss = {
          result : [
            {
              url : `${process.env.REACT_APP_BACKEND_API}/images/${files[0].name}`,
              name : files[0].name,
              size : files[0].size
            }]}      
        uploadHandler(resultss)})}
    catch(err){}    
  }
  

  return (   
    <>
    <Row justify="space-between" style={{margin:'5px'}}>
      <Button onClick={() => setShowTitleModal(true)}>CREATE TITLE</Button>
      <Button onClick={createBlog}>HIT ON IT</Button></Row>
      <SunEditor      
      placeholder='Please type here'            
      imageHeightShow={false}     
      onChange={handleChange}
      height = '75vh'
      showInline={true}
      autoFocus={true}            
      onImageUploadBefore={imageUploadToServer}      
      setOptions={{               
        imageHeightShow:false,
        imageAlignShow:'center',        
        imageMultipleFile:true,   
        height :'70vh',                   
        showPathLabel: false ,
        templates: [
          {
              name: 'Template-1',
              html: '<div style={{color:red}}">HTML sourdsgsfdgfdgvfdhyu ogfdhgkjfdhjkgvfdhjk ce1</p>'
          },
          {
              name: 'Template-2',
              html: '<p>HTML source2</p>'
          }
      ],        
        codeMirror: CodeMirror,                             
        buttonList: [          
          ['undo', 'redo'],
          [':p-More Paragraph-default.more_paragraph', 'font', 'fontSize', 'formatBlock', 'paragraphStyle', 'blockquote'],
          ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
          ['fontColor', 'hiliteColor', 'textStyle'],
          ['removeFormat'],
          ['outdent', 'indent'],
          ['align', 'horizontalRule', 'list', 'lineHeight'],
          ['-right', ':i-More Misc-default.more_vertical', 'fullScreen', 'showBlocks', 'codeView', 'preview', 'print', 'save', 'template'],
          ['-right', ':r-More Rich-default.more_plus', 'table', 'imageGallery'],
          ['-right', 'image', 'video', 'audio', 'link'],
          // (min-width: 992)
          ['%992', [
              ['undo', 'redo'],
              [':p-More Paragraph-default.more_paragraph', 'font', 'fontSize', 'formatBlock', 'paragraphStyle', 'blockquote'],
              ['bold', 'underline', 'italic', 'strike'],
              [':t-More Text-default.more_text', 'subscript', 'superscript', 'fontColor', 'hiliteColor', 'textStyle'],
              ['removeFormat'],
              ['outdent', 'indent'],
              ['align', 'horizontalRule', 'list', 'lineHeight'],
              ['-right', ':i-More Misc-default.more_vertical', 'fullScreen', 'showBlocks', 'codeView', 'preview', 'print', 'save', 'template'],
              ['-right', ':r-More Rich-default.more_plus', 'table', 'link', 'image', 'video', 'audio', 'imageGallery']
          ]],
          // (min-width: 767)
          ['%767', [
              ['undo', 'redo'],
              [':p-More Paragraph-default.more_paragraph', 'font', 'fontSize', 'formatBlock', 'paragraphStyle', 'blockquote'],
              [':t-More Text-default.more_text', 'bold', 'underline', 'italic', 'strike', 'subscript', 'superscript', 'fontColor', 'hiliteColor', 'textStyle'],
              ['removeFormat'],
              ['outdent', 'indent'],
              [':e-More Line-default.more_horizontal', 'align', 'horizontalRule', 'list', 'lineHeight'],
              [':r-More Rich-default.more_plus', 'table', 'link', 'image', 'video', 'audio', 'imageGallery'],
              ['-right', ':i-More Misc-default.more_vertical', 'fullScreen', 'showBlocks', 'codeView', 'preview', 'print', 'save', 'template']
          ]],
          // (min-width: 480)
          ['%480', [
              ['undo', 'redo'],
              [':p-More Paragraph-default.more_paragraph', 'font', 'fontSize', 'formatBlock', 'paragraphStyle', 'blockquote'],
              [':t-More Text-default.more_text', 'bold', 'underline', 'italic', 'strike', 'subscript', 'superscript', 'fontColor', 'hiliteColor', 'textStyle', 'removeFormat'],
              [':e-More Line-default.more_horizontal', 'outdent', 'indent', 'align', 'horizontalRule', 'list', 'lineHeight'],
              [':r-More Rich-default.more_plus', 'table', 'link', 'image', 'video', 'audio', 'imageGallery'],
              ['-right', ':i-More Misc-default.more_vertical', 'fullScreen', 'showBlocks', 'codeView', 'preview', 'print', 'save', 'template']
          ]]]
      }}/> 
      {
        <Modal title="Article's Title :-" centered visible={showTitleModal} closable={false} onOk={() => setShowTitleModal(false)} onCancel={() => setShowTitleModal(false)}>
          <Input type="text" onChange={(e) => setTitle(e.target.value)} value={title} placeholder="Title Name "/>          
        </Modal>
      }    
    </>               
  );
};

const mapStateToProps = (state) => {  
  return {
    user : state.AuthReducer.user
  }
}

const mapDispatchToProps = {
  CREATE_BLOG_ACTION:CREATE_BLOG_ACTION
}
export default connect(mapStateToProps,mapDispatchToProps)(MyEditor)