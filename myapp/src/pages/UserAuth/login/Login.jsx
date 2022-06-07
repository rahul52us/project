import React,{useEffect, useState} from 'react';
import GoogleLogin from 'react-google-login'
import { LOGIN_USER_ACTION } from '../../../store/AuthStore/action';
import { connect } from 'react-redux';
import { Button , Row  , Form , Typography , Card } from 'antd';
import { GOOGLE_AUTHENTICATE_ACTION } from '../../../store/AuthStore/action';
import { Link, useNavigate } from 'react-router-dom';
import Inputcomponent from '../../../common/inputComponent/InputComponent';
import { disFlexColCenter } from '../../../scssfile/InlineVariable';

const Login = (props) => {

    const [form] = Form.useForm()

    const navigate = useNavigate()
    useEffect(()=>{
        if(props.UserData.user)
        {
          //navigate('/')
        }
    },[props.UserData.user])
    
    const sendLoginData = (e) => {        
        props.LOGIN_USER_ACTION({
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
    const responseFailedGoogle = (e) => {}
    return (        
        <Row style={disFlexColCenter}>
        <Card title={<Typography.Title level={3}>Login</Typography.Title>} className='register' extra={<GoogleLogin
                className='GoogleButtonAuthUser'
                clientId={process.env.REACT_APP_GOOGLE_LOGIN_CLIENT_ID}
                buttonText="Login with google"
                onSuccess={responseSuccessGoogle}
                onFailure={responseFailedGoogle}
                cookiePolicy={'single_host_origin'}
                />}>                                
            <Form layout='vertical' onFinish={sendLoginData} form={form}>            
            <Inputcomponent required name="email" label="Enter the Email" placeholder="Enter the Email" type="email" rules={[{required : true , message : 'Email is required'},{pattern: new RegExp('^[A-Za-z0-9+_.-]+@(.+)$'),message: "Please use Valid Email"}]}/>
            <Inputcomponent required name="password" label="Enter the password" placeholder="Enter the Password" type="password" rules={[{required : true , message :'password is required'}]}/>                  
            <Row justify='space-between'>
            <Button htmlType='submit'>Login</Button>
            <Typography.Text level={5}><Link to="">Register</Link></Typography.Text>
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
    LOGIN_USER_ACTION : LOGIN_USER_ACTION,
    GOOGLE_AUTHENTICATE_ACTION : GOOGLE_AUTHENTICATE_ACTION
}
export default connect(mapStateToProps,mapDispatchToProps)(Login);