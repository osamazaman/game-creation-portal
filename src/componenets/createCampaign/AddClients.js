// companyId
// userId
// clientName
// clientEmail
// clientPhone
// clientBio

import React, {useEffect} from 'react';
import 'antd/dist/antd.css';
import {  Form, Input, Button, Select } from 'antd';
import {  useHistory } from "react-router-dom";
import addClientBG from '../../assets/backgroundImages/signupBg.png';

import { postApi } from '../../services/helpers/apiCalls'


const { Option } = Select;



const prefixSelector = (
    <Form.Item name="prefix" noStyle>
        <Select placeholder="+1" style={{ width: 70 }}>
            <Option value="92">+92</Option>
            <Option value="87">+87</Option>
        </Select>
    </Form.Item>
);

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 5 },
};
const tailLayout = {
    wrapperCol: { offset: 0, span: 4 },
};

const validateMessages = {
    required: 'Please input your ${name}!',
    types: {
        email: '${name} is not validate email!',
        number: '${name} is not a validate number!',
    }
};

function AddClients(props) {

    useEffect(() => {
        props.changeBgImage(addClientBG);
    },[props.bgImage]);

    const history = useHistory();

    const onFinish = (values) => {
        const access_token = localStorage.getItem('login');

        console.log('Success:', values);
        // props.updateInfo({name:'adminLogin',values:values});

        const apiCallRequest = {
            url: '/clients/',
            data: {
                userId: userId,
                companyId: companyId,
                name : props.data.clientName,
                email : props.data.clientEmail,
                
            },
            config: {
                headers: { 
                    Authorization: `Bearer ${access_token}`
                }
            }
        }   

        props.loaded(false,"Creating Client");
        postApi(apiCallRequest).then(response => {
            console.log("response",response);
            if (response.status) {
                console.log(response);
                props.loaded(true, "Successfully Created");
                props.alertBox("Successfully Created Client", "success")
                localStorage.setItem('client', JSON.stringify(response.data))
                // history.push('/campaign');
            } 
        }).catch(error => {
            console.log("error",error);
            props.loaded(true, "Successfully Created");
            props.alertBox("Successfully Created Client", "success")
            // history.push('/campaign');
            // props.loaded(true, "Failed");
            // props.alertBox("Failed to Create Client", "error");
            // console.log(error)
            // history.push('/client');
            // props.alertBox(false, "", "error")

        });

        console.log('apiCallRequest', apiCallRequest);  



        
        // history.push('/campaign');
    };

    const onFinishFailed = (errorInfo) => {
        
        console.log('Failed:', errorInfo);
        let company = JSON.parse(localStorage.getItem('company'));
        console.log("company", company);
        console.log(JSON.parse(localStorage.getItem('userInfo')));
        props.updateValue('companyName', company.name);
    };

    if(!localStorage.getItem('login'))history.push('/');
    
    let companyNameD = '';
    let userId = '';
    let companyId = '';
    if(localStorage.getItem('company')) {
        companyNameD = JSON.parse(localStorage.getItem('company')).name;
        companyId = JSON.parse(localStorage.getItem('company')).id;
        userId = JSON.parse(localStorage.getItem('user')).userId;
    }

    return (
        <div className="myContainer">
            <div style={{marginBottom:25}}>
            <span style={{fontWeight:620, fontSize:18}}> Add Client</span>
            </div>
            <div>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    validateMessages={validateMessages}
                >
                     <span className="spanStyling">Company Name</span>
                    <Form.Item
                        rules={[{ required: true }]}
                        onChange={props.handleChange}

                    >
                        <Input disabled className="input-style" placeholder="Name" 
                        name="name"
                        value={companyNameD}
                        />
                    </Form.Item>

                    <span className="spanStyling">Name</span>
                    <Form.Item
                        rules={[{ required: true }]}
                        name="clientName"
                        onChange={props.handleChange}

                    >
                        <Input className="input-style" placeholder="Name" 
                        name="clientName"
                        value={props.data.clientName}
                        />
                    </Form.Item>

                    <span className="spanStyling">Email</span>
                    <Form.Item
                        rules={[{ required: true, type: "email" }]}
                        name="email"
                        onChange={props.handleChange}
                        placeholder="Email"
                    >
                        <Input className="input-style" placeholder="someone@thetalentgames.com" 
                        name="clientEmail"
                        value={props.data.clientEmail}
                        />
                    </Form.Item>

                    {/* <span className="spanStyling">Phone no:</span>
                    <Form.Item
                        rules={[{ required: true }]}
                        name="phone"
                        value={props.data.phone}
                        onChange={props.handleChange}
                        placeholder="Phone No:"
                    >
                        <Input className="input-style" addonBefore={prefixSelector} placeholder="1234567" />
                    </Form.Item> */}


                    <Form.Item {...tailLayout}>
                    <Button id="nextBtn" htmlType="submit" className="login-form-button">
                                Next
                            </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}


export default AddClients;