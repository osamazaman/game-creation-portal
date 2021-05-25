// campaignName
// campaignTitle
// campaignDescription
// campaignStartDate
// campaignEndDate
// campaignActive
// campaignclientId

import React,{useEffect} from 'react';
import 'antd/dist/antd.css';
import {  DatePicker,Form, Input, Button, Select, Radio } from 'antd';
import { useHistory  } from "react-router-dom";
import './campaign.css';
import campaignConfigBg from '../../assets/backgroundImages/campaignConfigBg.png'


const { Option } = Select;

const layout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 5 },    
};
const tailLayout = {
    wrapperCol: { offset: 0, span: 5 },
};

const validateMessages = {
    required: 'Please input your ${name}!',
    types: {
      email: '${name} is not validate email!',
      number: '${name} is not a validate number!', 
    }
  };



function CampaignConfig(props) {

    useEffect(() => {
        console.log("UseEffect: ", campaignConfigBg);

        props.changeBgImage(campaignConfigBg);
    },[props.bgImage]);

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

        <div>

            <div className="myContainer">
            <div id="campaignConfig">
                <div className="gameTitle" style={{marginBottom:30}}>
                    <span>Choose Game Category & Context</span>
                </div>
            <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                validateMessages={validateMessages}
            >
                <span className="category">Game Category/Job Category</span>
                    
                    <div id="game-category-dropdown">
                    <Form.Item
                        rules={[{ required: true }]}
                        name="category" //DropDown or Radio Button 
                        value={props.data.campaignStatus} //DropDown or Radio Button 
                        onChange={props.handleChange}
                        placeholder="Active/Deactive"
                    >
                        <Select
                            style={{width:300}}
                            placeholder="Game Category / Job Category"
                            // onChange={this.in}
                            allowClear >
                            <Option className="dropdownOption" value="C - Factor (General Leadership)">C - Factor (General Leadership)</Option>
                            <Option className="dropdownOption" value="other">Other</Option>
                                </Select>
                            </Form.Item>
                        </div>

                        <span className="regCategory">Select your Login Method</span>
                        <Form.Item
                            rules={[{ required: true }]}
                            name="configLoginMethod" //DropDown or Radio Button 
                            value={props.data.configLanguage} //DropDown or Radio Button 
                            onChange={props.handleChange}
                        >
                            <div>
                                <Radio.Group >
                                    <Radio value="Linkedin"><span style={{ fontSize: 11, fontWeight: 640 }}> Linkedin </span></Radio>
                                    <Radio value="Email"><span style={{ fontSize: 11, fontWeight: 640 }}> Email </span></Radio>
                                </Radio.Group>
                            </div>
                        </Form.Item>
                        <span className="category">Game Context</span>
                    <span className="lang" style={{display:"block"}}>Language</span>
                    <Form.Item
                        rules={[{ required: true }]}
                        name="configLanguage" //DropDown or Radio Button 
                        value={props.data.configLanguage} //DropDown or Radio Button 
                        onChange={props.handleChange}
                    >
                         <Radio.Group style={{width:400}}>
                            <div className="inline-row" style={{width:70}}>
                                <Radio value="English" className="lang-radio">English</Radio></div>
                            <div className="inline-row" style={{width:70}}>
                                <Radio value="Arabic" className="lang-radio">Arabic</Radio></div>
                            <div className="inline-row"  style={{width:70}}>
                                <Radio  value="Other"  className="lang-radio"  >Other</Radio></div>

                        </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            noStyle
                            shouldUpdate={(prevValues, currentValues) => prevValues.configLanguage !== currentValues.configLanguage}
                        >
                            {({ getFieldValue }) => {
                                return getFieldValue('configLanguage') === 'Other' ? (
                                    <div>
                                    <span className="lang">Other</span>
                                    <Form.Item
                                    name="otherLanguage" rules={[{ required: true }]}>
                                        <Input placeholder="Eg Chineese"/>
                                    </Form.Item>
                                    </div>
                                ) : null;
                            }}
                        </Form.Item>
                    <span className="gamecharStyling">Game Characters</span>
                    <Form.Item
                        rules={[{ required: true }]}
                        name="gameCharacters" //DropDown or Radio Button 
                        value={props.data.gameCharacters} //DropDown or Radio Button 
                        onChange={props.handleChange}
                        placeholder="Global"
                    >
                        <Select
                            style={{width:300}}
                            placeholder="Global"
                            // onChange={this.in}
                            allowClear >
                            <Option value="Global" className="dropdownOption">Global</Option>
                            <Option value="Bangladesh" className="dropdownOption">Bangladesh</Option>
                            <Option value="South Asian" className="dropdownOption">South Asian</Option>
                            <Option value="African" className="dropdownOption">African</Option>
                            <Option value="Arabic" className="dropdownOption">Arabic</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit" id="myBtn">
                            Next
                        </Button>
                    </Form.Item>
            </Form> 
            </div>

            </div>
            
            
        </div>  
    );
}


export default CampaignConfig;