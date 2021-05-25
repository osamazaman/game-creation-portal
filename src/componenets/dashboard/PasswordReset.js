import React from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button } from 'antd';
import {useHistory } from "react-router-dom";

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 5 },    
};
const tailLayout = {
    wrapperCol: { offset: 5, span: 5 },
};

const validateMessages = {
    required: 'Please input your ${label}!',
    types: {
      email: '${label} is not validate email!',
      number: '${label} is not a validate number!', 
    }
  };




function PasswordReset(props) {
    const history = useHistory();
    const onFinish = (values) => {
        console.log('Success:', values);
        /// props.updateInfo({name:'adminLogin',values:values});
        history.push('/');
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

      if(!localStorage.getItem('login'))history.push('/');
    
    return (

        <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish  }
            onFinishFailed={onFinishFailed}
            validateMessages={validateMessages}
        >
            <Form.Item
                label="Email"
                rules={[{ required: true, type: 'email' }]}
                name="email"
                // value={props.data.adminEmail}
                // onChange={props.handleChange}
                placeholder="Email"
            >
                <Input />
            </Form.Item>

                
            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Reset Password
                </Button>
            </Form.Item>
        </Form>


    );
}


export default PasswordReset;