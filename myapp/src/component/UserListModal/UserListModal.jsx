import { Checkbox, Popconfirm , message , Tooltip , Select, Button } from 'antd'
import React,{useState} from 'react'
import Moment from 'react-moment'
import './UserListModal.scss'
import { CheckCircleOutlined, CopyOutlined } from '@ant-design/icons';


const UserListModal = ({flag,data,DELETE_PDF_ACCESS_ACTION,CREATE_USER_ACCESS_PDF_ACTION,pdfCategary,DELETE_USER_TOKEN_ACTION , setShowModal}) => {

  const [SelectAccessPdf,setSelectAccessPdf] = useState(null)

  async function confirm(DeletePdf) {    
    await DELETE_PDF_ACCESS_ACTION({DeletePdf:DeletePdf,userId:data._id})
    message.info(`${DeletePdf} has been removed`);
  }

  function GiveAccessFunction(e)
  {
    setSelectAccessPdf(e)    
  }
  function AddPdfAccessFunction()
  {      
    if(!data.pdfAccess.includes(SelectAccessPdf))
    {
      CREATE_USER_ACCESS_PDF_ACTION({Addpdf:SelectAccessPdf,userId:data._id})
    }
    else
    {
      message.warn(`this user has access for ${SelectAccessPdf} already`)
    } 
    setSelectAccessPdf(null)   
  }

  function DeleteTokenFunction(data)
  {    
    DELETE_USER_TOKEN_ACTION(data)    
    message.info('done')
    setShowModal(false)
    
  }

  console.log('the pdf data is ',data)
  console.log('the pdf categary function is ',pdfCategary)

  return (
    <div className='UserListModal'>
      <div className='UserModalTop'>
     <p>Account Created At :- <span><Moment data={data.createdAt} format="YYYY/MM/DD"/></span></p>
      <p>Last Time Updated At :- <span><Moment data={data.updatedAt} format="YYYY/MM/DD"/></span></p>
      </div>
      <div className='UserListModalHeader'>        
        <p>{data.name}</p>        
      </div>        
      {
          flag === 1 ? (
           <div className='UserListModalMiddle'>
             <p className='UserListModalPdfTitle'>pdf Accessibility</p>
             <div className='UserModalDivContainer'>
               {
                  data.pdfAccess.map((item,index)=>{
                   return (
                    <Tooltip title={`you can delete ${item} pdf access for email : ${data.email} user`} key={index}>
                     <div className='UserModelPdfDiv'>                      
                       <p className='UserModelPdfDivItem'>{item}</p>      
                       <Popconfirm                       
                        placement="topRight"
                        title={"confirm to remove the pdf access"}
                        onConfirm={() => confirm(item)}
                        onCancel={() => message.info("denied for remove pdf")}
                        okText="Yes"
                        cancelText="No">
                       <Checkbox />                                 
                       </Popconfirm>
                      </div>  
                      </Tooltip>                                          
                    )
                 })
               }                                            
             </div>             
             <p className='UserListModalPdfTitle'>Give the pdf access</p>
               <Select style={{width:'100%'}} placeholder="give the new pdf access" onChange={GiveAccessFunction}>
                 {
                   pdfCategary.allPdf.map((item,index)=>{
                     return (
                       <Select.Option value={item.title} key={index}>{item.title}</Select.Option>
                     )
                   })
                 }
                 </Select>              
                {
                 SelectAccessPdf &&
                  <Popconfirm title="confirm to add the pdf access" onConfirm={() => AddPdfAccessFunction(SelectAccessPdf)} onCancel={() => setSelectAccessPdf(null)}>
                    <Button style={{marginTop:'20px'}}  >Click here to confirm</Button>
                  </Popconfirm>
                }   
            </div>
          ) : (
            <div style={{height:'70%',overflowY:'auto'}}>
              {
                data?.tokens && data.tokens.map((item,index)=>{
                  return (
                    <div key={index} className="UserModelTokenDiv">
                      <Tooltip title="copy the user access token"><CopyOutlined /></Tooltip>
                    <p key={index}>{item.token}</p>
                    <Popconfirm title="comfirm to delete"  onConfirm={() => DeleteTokenFunction({userId : data._id,tokenId : item._id , token : item.token}) } ><Button><CheckCircleOutlined /></Button></Popconfirm>                    
                    </div>
                  )
                })
              }
            </div>
          )
        }
    </div>    
  )
}
export default UserListModal;