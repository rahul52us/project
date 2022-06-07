import { Input , Button } from 'antd'
import React,{useState} from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import api from '../../../config/backendApi/BackendApi'
import { Notify } from '../../../config/Notify/Notify'

const ForgotEmailPassword = () => {
  const [email,setEmail] = useState('')
  const navigate = useNavigate()
  const SendEmail = async(e) => {

      e.preventDefault()
      if(email && email.trim())
      {
          try
          {
            var response = await api.post('/api/auth/forgot-email-password/',{email : email })
            if(response.status===200)
            {
              Notify({type : 'success' , message : 'check your email ! and hit the link for change the password '}) 
              navigate('/')                           
              return
            }            
          }
          catch(error)
          {
            console.log(error)
            Notify({type : 'error' , message : error.response.data})              
          }          
      }
  }
  return (
    <div>
    <form onSubmit={SendEmail}>
    <Input type="email" placeholder='Enter the Email' value={email} onChange={(e) => setEmail(e.target.value)}/>    
    <Button htmlType="submit">Send</Button>
    </form>
    </div>
  )
}

export default ForgotEmailPassword