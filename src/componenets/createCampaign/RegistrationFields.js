// campaignName
// campaignTitle
// campaignDescription
// campaignStartDate
// campaignEndDate
// campaignActive
// campaignclientId

import React, {useEffect} from 'react';
import 'antd/dist/antd.css';
import {  DatePicker,Form, Input, Button, Select, Radio, Checkbox, Divider,Switch, Row, Col } from 'antd';
import { useHistory  } from "react-router-dom";
import './campaign.css';
import regFieldsBG from '../../assets/backgroundImages/regFieldsBG.png';

import Address from './Address';
import { getRenderPropValue } from 'antd/lib/_util/getRenderPropValue';


const { Option } = Select;

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 5 },    
};
const tailLayout = {
    wrapperCol: { offset: 18, span: 0 },
};

const validateMessages = {
    required: 'Please input your ${name}!',
    types: {
      email: '${name} is not validate email!',
      number: '${name} is not a validate number!', 
    }
};


  
function RegistrationFields(props) {

    useEffect(() => {
        props.changeBgImage(regFieldsBG);
    },[props.bgImage]);

    const CheckboxGroup = Checkbox.Group;

    const history = useHistory();
    const onFinish = (values) => {
        console.log('Success:', values);
        // props.updateInfo({name:'adminLogin',values:values});
        history.push('/competencies');
      };
    const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    };

    if(!localStorage.getItem('login'))history.push('/');
    
    return (

        <div id="reg-fields">
            <div className="myContainer">
                <div className="regTitle">
                    <span> Choose Registration Fields</span>
                </div>
            <div id="RegistrationFields">
                    <Form
                        {...layout}
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        validateMessages={validateMessages}
                    >


                        <span className="regCategory">Select Country</span>
                        <div style={{ height: 140 }}>
                            <Address 
                                visibility = {
                                    {
                                        country: true,
                                        state: false,
                                        city: false
                                    }
                                }
                            />
                        </div>

                        <span className="regCategory">Enter your career intrest</span>
                        <Form.Item
                            className="dropdownStyling"
                            rules={[{ required: true }]}
                            name="careerIntrest"
                            value={props.data.CareerIntrest}
                            onChange={props.handleChange}
                            placeholder="Front-end"

                        >
                            <Select
                                // className="dropdownStyling"
                                placeholder="Career Intrest"
                                allowClear
                            >
                                <Option value="Entertainment">Front end developer</Option>
                                <Option value="Tech">Backend developer</Option>
                                <Option value="Networking">Networking</Option>
                                <Option value="Cyber Security">Cyber Security</Option>
                                <Option value="Other">Other</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            noStyle
                            shouldUpdate={(prevValues, currentValues) => prevValues.careerIntrest !== currentValues.careerIntrest}
                        >
                            {({ getFieldValue }) => {
                                return getFieldValue('careerIntrest') === 'Other' ? (
                                    <div>
                                    <span className="lang">Other</span>
                                    <Form.Item
                                    name="otherCareer" rules={[{ required: true }]}>
                                        <Input placeholder="Eg: Business Manager"/>
                                    </Form.Item>
                                    </div>
                                ) : null;
                            }}
                        </Form.Item>
                        
                        <span className="regCategory">Select registration fields</span>
                        <div id="registrationFields" style={{ height: 310 }}>
                            <Form.Item
                                // rules={[{ required: true }]}
                                name="catconfigFieldsegory" //DropDown or Radio Button 
                                value={props.data.configFields} //DropDown or Radio Button 
                                onChange={props.handleChange}
                                placeholder="Registration Fields"

                        >
                            <div id="checkboxes" style={{ width: 500}} className="site-checkbox-all-wrapper">

                                <Checkbox
                                    indeterminate={props.data.indeterminate}
                                    onChange={props.onCheckAllChangeRegistrationFields}
                                    checked={props.data.checkAll}
                                >
                                    <span style={{fontSize:12}}>List All 20 Registration fields </span>
                             </Checkbox>

                                <br />
                                <Row>
                                    <Col>   

                                            <CheckboxGroup
                                                style={{width:800, fontSize:11}}
                                                options={props.data.plainOptions}
                                                value={props.data.checkedList}
                                                onChange={props.onChangeRegistrationFields}
                                            />
                               
                                        
                                    </Col>
                                </Row>
                            </div>

                    </Form.Item>
                    </div>
                    <Row className="radio-reg">
                    <span className="regCategory"> Do you want to capture candidate demographic data</span>
                    <Form.Item
                          rules={[{ required: true }]}
                          name="configDemographic" //DropDown or Radio Button 
                          value={props.data.configDemographic} //DropDown or Radio Button 
                        //   onChange={props.handleChange}
                    >
                        
                        <Switch size="small" checkedChildren="Yes" unCheckedChildren="No" style={{marginLeft:50,marginBottom:105}} />
                    </Form.Item>
                    </Row>
                    
                    <Row className="radio-reg">
                    <span className="regCategory"> Do you want candidates to upload their resumes</span>
                    <Form.Item
                          rules={[{ required: true }]}
                          name="configDemographic" //DropDown or Radio Button 
                          value={props.data.configDemographic} //DropDown or Radio Button 
                        //   onChange={props.handleChange}
                    >
                        
                        <Switch size="small" checkedChildren="Yes" unCheckedChildren="No" style={{marginLeft:50,marginBottom:105}} />
                    </Form.Item>
                    </Row >

                    <Row className="radio-reg">
                    <span className="regCategory"> Do you want candidates to upload their photographs</span>
                    <Form.Item
                          rules={[{ required: true }]}
                          name="configDemographic" //DropDown or Radio Button 
                          value={props.data.configDemographic} //DropDown or Radio Button 
                        //   onChange={props.handleChange}
                    >
                        
                        <Switch size="small" checkedChildren="Yes" unCheckedChildren="No" style={{marginLeft:50,marginBottom:105}} />
                    </Form.Item>
                    </Row>

                    <Form.Item style={{float:"right", paddingRight:20}}>
                        <Button id="myBtn" type="primary" htmlType="submit">
                            Next
                        </Button>
                    </Form.Item>
              
            </Form> 
            </div>
        </div>
        </div>  
    );
}


export default RegistrationFields;