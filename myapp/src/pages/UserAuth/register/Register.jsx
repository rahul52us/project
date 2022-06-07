import React,{useEffect, useState} from 'react';
import './register.scss'
import GoogleLogin from 'react-google-login'
import { LOGIN_USER_ACTION } from '../../../store/AuthStore/action';
import { connect } from 'react-redux';
import { Button, Row , Card, Form, Divider, Typography} from 'antd';
import { REGISTER_USER_ACTION } from '../../../store/AuthStore/action';
import { GOOGLE_AUTHENTICATE_ACTION } from '../../../store/AuthStore/action';
import { Link, useNavigate } from 'react-router-dom';
import { disFlexColCenter } from '../../../scssfile/InlineVariable';
import Inputcomponent from '../../../common/inputComponent/InputComponent';


const Register = (props) => {    
    const navigate = useNavigate()
    const [form] = Form.useForm()

    useEffect(()=>{
        if(props.UserData.user)
        {
          //navigate('/')
        }
    },[props.UserData.user])
    const sendLoginData = (e) => {        
        props.REGISTER_USER_ACTION({
            name : form.getFieldValue('name'),
            email : form.getFieldValue('email'),
            password : form.getFieldValue('password')
        })        
    }
    const responseSuccessGoogle = (e) => {        
        const data = {
             email : e.profileObj.email,
             name : e.profileObj.name,
             pic : e.profileObj.imageUrl             
        }
        props.GOOGLE_AUTHENTICATE_ACTION(data)        
    }    
    const responseFailedGoogle = (e) => {
      //  console.log(e)
    }

    return (
        <Row style={disFlexColCenter}>
            <Card title={<Typography.Title level={3}>Register</Typography.Title>} className='register' extra={<GoogleLogin
                    className='GoogleButtonAuthUser'
                    clientId={process.env.REACT_APP_GOOGLE_LOGIN_CLIENT_ID}
                    buttonText="Register with google"
                    onSuccess={responseSuccessGoogle}
                    onFailure={responseFailedGoogle}
                    cookiePolicy={'single_host_origin'}
                    />}>                                
                <Form layout='vertical' onFinish={sendLoginData} form={form}>
                <Inputcomponent required name="name" placeholder="Enter the Full Name" label="Enter the Full Name" type="text" rules={[{required : true , message:'Name is required'}]}/>
                <Inputcomponent required name="email" label="Enter the Email" placeholder="Enter the Email" type="email" rules={[{required : true , message : 'Email is required'},{pattern: new RegExp('^[A-Za-z0-9+_.-]+@(.+)$'),message: "Please use Valid Email"}]}/>
                <Inputcomponent required name="password" label="Enter the password" placeholder="Enter the Password" type="password" rules={[{required : true , message :'password is required'}]}/>                  
                <Row justify='space-between'>
                <Button htmlType='submit'>Register</Button>
                <Typography.Text level={5}><Link to="">Forgot Password</Link></Typography.Text>
                </Row>                
                </Form>                
            </Card>
        </Row>        
       );
};
const mapStateToProps = (state) => {
    return {
        UserData : state.AuthReducer
    }
    
}
const mapDispatchToProps = {
    REGISTER_USER_ACTION : REGISTER_USER_ACTION,
    GOOGLE_AUTHENTICATE_ACTION : GOOGLE_AUTHENTICATE_ACTION
}
export default connect(mapStateToProps,mapDispatchToProps)(Register);