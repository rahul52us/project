import { Input , Button } from 'antd'
import React,{useState} from 'react'
import { useLocation, useParams , useNavigate } from 'react-router-dom'
import api from '../../../config/backendApi/BackendApi'
import { Notify } from '../../../config/Notify/Notify'


const ResetEmailPassword = () => {
  
  const [password,setPassword] = useState('')
  const navigate =  useNavigate()
  const {token , id} = useParams()

  const SendResetPassword = async(e) => {

    console.log(token)
    console.log(id)
      e.preventDefault()
      if(password && password.length>6 && password.trim())
      {
          try
          {
            if(token.trim() && id.trim())
            {
                
                var response = await api.post('/api/auth/reset-email-password/',{ password : password , token : token , id : id  })
                console.log(response)
                if(response.status===200)
                {
                    navigate('/login')
                    Notify({type : 'success' , message : 'password reset successfully ,  please now loggin your account !'})
                }
                else
                {
                    Notify({type : 'error',description : "something went wrong while reseting the account password !" })                                    
                }
            }
            else
            {
              Notify({type : 'error',description : "something went wrong , try again later " })                
            }            
          }
          catch(err)
          {
            Notify({type : 'error' , message : err.message})              
          }          
      }

      else
      {
        Notify({type : 'error',description : "password too small" })                          
      }
  }

  return (
    <div>
    <form onSubmit={SendResetPassword}>
    <Input type="text" placeholder='Enter the Password' value={password} onChange={(e) => setPassword(e.target.value)}/>    
    <Button htmlType="submit">Send</Button>
    </form>
    </div>
  )
}

export default ResetEmailPassword;