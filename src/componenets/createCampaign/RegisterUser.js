import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import { DatePicker, Form, Input, Button, Select, Row, Col, Radio, Checkbox } from 'antd';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import signupBG from '../../assets/backgroundImages/signupBg.png';

import { postApi } from '../../services/helpers/apiCalls'
import Address from './Address';

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
    wrapperCol: { span: 5 },
};

const tailLayout = {
    wrapperCol: { offset: 0, span: 0 },
};

const validateMessages = {
    required: 'Please input your ${name}!',
    types: {
        email: '${name} is not validate email!',
        number: '${name} is not a validate number!',
        website: '${name} is not a valid website!'
    }
};

function RegisterUser(props) {

    useEffect(() => {
        // Update the document title using the browser API
        props.changeBgImage(signupBG);
    }, [props.bgImage]);

    const history = useHistory();

    const onFinish = (values) => {
        console.log('values', values);
        const access_token = localStorage.getItem('login');

        // const url = 'https://backend.thetalent.games/RegisterUser';
        const apiCallRequest = {
            url: '/auth/register',
            data: {
                email: props.data.userEmail,
                password: props.data.userPassword,
                firstname: props.data.userFirstname,
                lastname: props.data.userLastname,
                country: values.address.country,
                address: values.address.state+', '+values.address.city,
                phone: '00000000000',
                dob: values.userDob._d,
                userType: 'client',
                name: props.data.userFirstname+' '+props.data.userLastname
            },
            config: {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            }
        }



        props.loaded(false,"Creating User");
        postApi(apiCallRequest).then(response => {
            console.log(response);
            if (response.status) {
                console.log(response);
                props.loaded(true, "Successfully Created");
                props.alertBox("Successfully Created User", "success")
                localStorage.setItem('user', JSON.stringify(response.data))
                history.push('/client');
            } 
        }).catch(error => {
            props.loaded(true, "Failed");
            props.alertBox("Failed to Create User", "error");
            console.log(error)
            // history.push('/client');
            // props.alertBox(false, "", "error")

        });

        console.log('apiCallRequest', apiCallRequest);

        // history.push('/client');
    };

    const onFinishFailed = (errorInfo) => {

        // axios.post('https://backend.thetalent.games/companies/', {
        //     'name': 'bhaveshtestCompany4',
        //     'website': 'https://bhaveshtestCompany4.com',
        //     'industry_type': 'Tech'
        // }, {
        //     headers: { 
        //         'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJoYXZlc2hAdGhldGFsZW50Z2FtZXMuY29tIiwidXNlclR5cGUiOiJhZG1pbiIsImlhdCI6MTYwOTM3NzM4OSwiZXhwIjoxNjA5NDYzNzg5fQ.SHvPZeVVgMTKq2nMOMtg66g3rvre8-bDjpWiL6HuNvQ`, 
        //         'Content-Type': `application/x-www-form-urlencoded`,
        //         'Cache-Control': 'no-cache'
        //     }
        // }
        // );

        // props.loaded(false, "Failed");
        // props.alertBox("Failed to Create Company", "error")
        console.log('Failed:', errorInfo);
    };

    if (!localStorage.getItem('login')) history.push('/');

    return (

        <div id="signupContainer">
            <div class="regTitle">
                <span> Create User</span>
            </div>
            <div className="signupForm">
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    validateMessages={validateMessages}
                >
                    <Row id="fname">
                        <Col>
                            <span className="spanStyling"> First Name</span>
                            <Form.Item
                                rules={[{ required: true }]}

                                onChange={props.handleChange}
                            >
                                <Input className="inputinline" placeholder="John"
                                    name="userFirstname"
                                    value={props.data.userFirstname}
                                />
                            </Form.Item>
                        </Col>


                        <Col className="col-inline">
                            <span className="spanStyling"> Last Name</span>
                            <Form.Item
                                rules={[{ required: true }]}

                                onChange={props.handleChange}

                            >
                                <Input className="inputinline" placeholder="Lang" name="userLastname"
                                    value={props.data.userLastname} />
                            </Form.Item>
                        </Col>
                    </Row>


                    <span className="spanStyling">Email address</span>
                    <Form.Item
                        rules={[{ required: true, type: 'email' }]}
                        name="userEmail"    
                        onChange={props.handleChange}

                    >
                        <Input className="input-placeholder" placeholder="loremipsem@thetalentgames.com"
                            name="userEmail"
                            value={props.data.userEmail}
                        />
                    </Form.Item>


                    <Row gutter={5}>
                        <Col>
                            <span className="spanStyling">Password</span>
                            <Form.Item
                                hasFeedback
                                rules={[{ required: true }]}
                                name='userPassword'
                                onChange={props.handleChange}
                            >
                                <Input.Password className="inputinline" placeholder="*******"
                                    name="userPassword"
                                    value={props.data.userPassword}
                                />
                            </Form.Item>
                        </Col>

                        <Col className="col-inline">
                            <span className="spanStyling">Confirm Password</span>
                            <Form.Item
                                rules={[
                                    {
                                        required: true,
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(rule, value) {
                                            console.log(value, getFieldValue('userPassword'));
                                            if (!value || getFieldValue('userPassword') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject('The two passwords do not match!');
                                        },
                                    }),
                                ]}
                                hasFeedback
                                name="confirm password"
                                value={props.data.confirmPw}
                                onChange={props.handleChange}
                            >
                                <Input.Password className="inputinline" placeholder="*******" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <span className="spanStyling"> Date Of Birth</span>
                    <Form.Item
                        className="Dpicker"
                        rules={[{ required: true }]}
                        name="userDob"
                        value={props.data.userDob} 
                        onChange={props.handleChange}
                        placeholder="Date Of Birth"

                    >
                        <DatePicker className="input-placeholder"   className="Dpicker" />
                    </Form.Item>

                    {/* <span className="spanStyling">Phone no:</span>
                    <Form.Item
                        rules={[{ required: true }]}
                        name="userPhone"
                        onChange={props.handleChange}
                        placeholder="Phone No:"
                    >
                        <Input className="input-style" addonBefore={prefixSelector} placeholder="1234567" 
                            // name="userPhone"
                            // value={props.data.userPhone}
                        />
                    </Form.Item>            */}

                    <span className="regCategory">Select Country</span>
                        <div style={{ height: 140 }}>
                            <Address 
                                visibility = {
                                    {
                                        country: true,
                                        state: true,
                                        city: true
                                    }
                                }
                            />
                    </div>

                    {/* <Form.Item
                        id="terms-conditions"
                        rules={[{ required: true }]} //DropDown or Radio Button 
                        value={props.data.configLanguage} //DropDown or Radio Button 
                        onChange={props.handleChange}
                    >

                        <div>
                            <Checkbox indeterminate={props.data.indeterminate}>
                                <span class="regCategory">I agree to the I agree to the  I agree to the  I agree to the <span style={{ color: "#007e8b" }}>The Talent Games</span> Terms of Services and <span style={{ color: "#007e8b" }}>Privacy policy.</span></span>
                            </Checkbox>
                        </div>
                    </Form.Item> */}
                    <div>
                        <Form.Item {...tailLayout}>
                            <Button id="myBtn" htmlType="submit" className="login-form-button">
                                Sign Up
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </div>




        </div>

        //     <br/>
        // //      <input 
        //         name="companyIndustryType" 
        //         value={props.data.companyIndustryType} 
        //         onChange={props.handleChange} 
        //         placeholder="Company Industry Type"
        //     />
        //     <br/>   
        //      <input 
        // name="companyBio" 
        // value={props.data.companyBio} 
        // onChange={props.handleChange} 
        // placeholder="Company Bio"
        //     />

        //     <br/>
        //     <button onClick={props.handleSubmit}>Create Company</button>
        //     <br/>

        // </form>

    );
}



export default RegisterUser;