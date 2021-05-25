import React, {useEffect} from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox, Alert  } from 'antd';
import { useHistory  } from "react-router-dom";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import userLogin from '../../assets/backgroundImages/background1.png';


import { postApi } from '../../services/helpers/apiCalls';


const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 6 },    
};
const tailLayout = {
    wrapperCol: { offset: 0, span: 6 },
};

const validateMessages = {
    required: 'Please input your ${name}!',
    types: {
      email: '${name} is not validate email!',
      number: '${name} is not a validate number!', 
    },
    // number: {
    //   range: '${label} must be between ${min} and ${max}',
    // },
  };


 var loginFailed = false;
  var loginSuccess = false;


function UserLogin(props) {

            // Similar to componentDidMount and componentDidUpdate:
        useEffect(() => {
            console.log("UseEffect: ", userLogin);

            props.changeBgImage(userLogin);
        },[props.bgImage]);

    const history = useHistory();
     
    
    const onFinish = (values) => {
        console.log('Success:', values);
        
        console.log("props.Data", props.data);
        props.updateInfo({name:'adminLogin',values:values,login:true});
        const apiCallRequest = {
            url: '/auth/login',
            data: {
                // data to be sent
                email : props.data.adminEmail,
                password: props.data.adminPassword
            },
            config: {
                
            }
        }

        console.log("apiCallRequest", apiCallRequest);
        props.loaded(false, "Logging");
        postApi(apiCallRequest).then(response => {
            if (response.data.status) {
                console.log(response);
                props.loaded(true, "Successfully");
                props.alertBox("Login Successfully", "success");
                localStorage.setItem('login', response.data.token);
                props.updateUserInfo(response.data);
                history.push('/dashboard');
            } 
        }).catch(error => {
            console.log(error);
            props.loaded(true, "Failed to Login");
            props.alertBox("Failed to login", "error");
        });

        // localStorage.setItem('login',true);
        // history.push('/dashboard');
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        loginFailed = true;
      };
      
      if(localStorage.getItem('login'))history.push('/dashboard');

    return (
        <div className="myContainer">
            {loginSuccess? <Alert className = "alert" message="Login Successfully" type="success" showIcon />:""}
            {loginFailed? <Alert className = "alert" message="Email Address or Password not correct" type="error" showIcon />:""}

        <div className="myTitle">
            <span >The Talent Games Portal</span> 
        </div>
             {/* bold */}
        <div className="mySubTitle">
            <h3>Welcome to your game assesment creation portal.</h3>
        </div>
            <div className="myText">
                <span> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span>
            </div>

        <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish  }
            onFinishFailed={onFinishFailed}
            validateMessages={validateMessages}
        >
            <div className="loginStyling">
            <span > Email Address</span>
            </div>
            <Form.Item
                rules={[{ required: true, type: 'email' }]}                
                onChange={props.handleChange}
                
            >
                <Input name="adminEmail" value={props.data.adminEmail}
                 placeholder="Email"  />
            </Form.Item>

            <div className="loginStyling">
            <span>Password</span>
            </div>
            <Form.Item
                // className="pwStyling"
                rules={[{ required: true}]}
                
                onChange={props.handleChange}
            >
                <Input.Password name="adminPassword" value={props.data.adminPassword} placeholder="******"/>
            </Form.Item>
            <div className="loginStyling">
                <a href="/passwordReset" style={{color:"black"}}>
                Forgot password
                </a>
            </div>
                
            <Form.Item {...tailLayout}>
                <Button id="myBtn" htmlType="submit" className="login-form-button">
                    Login
        </Button>
            </Form.Item>
        </Form>
</div>

    );
}


export default UserLogin;