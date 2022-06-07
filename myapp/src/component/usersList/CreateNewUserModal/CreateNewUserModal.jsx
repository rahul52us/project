import React,{useState} from 'react';
import { connect } from 'react-redux';
import { Button, message, notification } from 'antd';
import { CREATE_NEW_DASH_USER_ACTION } from '../../../store/dashUserStore/action';
import InputComponent from '../../../common/inputComponent/InputComponent';
import { Notify } from '../../../config/Notify/Notify';



const Register = (props) => {
    const [data,setData] = useState(
        {            
            email:'',
            fullname : '',
            pass:'',      
            comfirm_password : ''      
        }
    )
    const InputContainerData = [     
        {
            label : "FullName : ",
            name : 'fullname',
            type : 'text',
            placeholder:'Enter the full name',
            required : true,
            errorMessage:'Enter your name',
            value : data.fullname,            
        },    
        {
            label : 'Email : ',
            name : 'email',
            type : 'email',
            placeholder:'Enter the Email',
            required : true,
            errorMessage:'Please Enter valid  Email',
            value : data.email
        },        
        {
            label : "Password : ",
            name : 'pass',
            type : 'password',
            placeholder:'Enter the password',
            required : true,
            errorMessage:'Please enter the valid password',
            value : data.pass,            
        },        
        {
            label : "Confirm : ",
            name : 'comfirm_password',
            type : 'password',
            placeholder:'Enter the Comfirm password',
            required : true,
            errorMessage:'Please enter the valid password',
            value : data.comfirm_password,            
        },        
    ]
    const sendLoginData = (e) => {
        e.preventDefault()
        if(data.pass!==data.comfirm_password)
        {
            Notify({type : 'error' , description : 'password does not match !'})
            return 
        }
        if(!data.email || !data.pass || !data.fullname || !data.comfirm_password)
        {
            message.warn({content : 'please provide the all details'})
            return
        }
        props.CREATE_NEW_DASH_USER_ACTION({
            name : data.fullname,
            email : data.email,
            password : data.pass
        })               
    }    
    const handleChange = (e) => {
        setData({...data,[e.target.name]:e.target.value})
    }
    return (
        <div className='login_container'>
            <div className='login_logo'>
                <img src="https://www.hdnicewallpapers.com/Walls/Big/Tiger/Download_Image_of_Animal_Tiger.jpg" alt="not found" />
            </div>
            <div className='LoginInputContainer'>
                <form onSubmit={sendLoginData}>
                    {
                        InputContainerData.map((item,index)=>{
                            return (
                                <InputComponent key={index} pattern={item.pattern} label={item.label} errorMessage={item.errorMessage} type={item.type} placeholder={item.placeholder} required={item.required} name={item.name} value={item.value} onChange={handleChange}/>
                            )                            
                        })
                    }                            
                <div className='LoginFooter'>
                   <Button htmlType='submit'>Register</Button>
                </div>
                </form>   
            </div>               
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        UserData : state.AuthReducer,
        DashUserReducer : state.DashUserReducer
    }   
}
const mapDispatchToProps = {
    CREATE_NEW_DASH_USER_ACTION
}
export default connect(mapStateToProps,mapDispatchToProps)(Register);
