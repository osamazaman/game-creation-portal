// campaignName
// campaignTitle
// campaignDescription
// campaignStartDate
// campaignEndDate
// campaignActive
// campaignclientId

import React, {useEffect} from 'react';
import 'antd/dist/antd.css';
import {  DatePicker,Form, Input, Button, Select } from 'antd';
import { useHistory  } from "react-router-dom";
import signupBG from '../../assets/backgroundImages/signupBg.png';

import { getApi, postApi } from '../../services/helpers/apiCalls'



const { Option } = Select;

const layout = {
    labelCol: { span: 5 },
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

  function onChange(value) {
    
    console.log(`selected ${value}`);
    
    
  }

  function onSearch(val) {
    console.log('search:', val);
  }
  

function CreateCampaigns(props) {

    useEffect(() => {
        // Update the document title using the browser API

    
        props.changeBgImage(signupBG);
    },[props.bgImage]);


    useEffect(() => {
        const access_token = localStorage.getItem('login');
          const apiCallRequestList = {
            url: '/gcp/getCompaniesList',
            data: {
               
            },
            config: {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            }
          }
          
    
          
    
          //  props.loaded(false,"Loading Dashboard Data");
            getApi(apiCallRequestList).then(response => {
                // console.log(response);
                if (response.data.status) {
                    console.log("companies List", response.data.data);
                    // props.loaded(true, "Loaded Successfully");
                    // props.alertBox("Loaded Successfully", "success");
                    // completeCompaniesList = response.data.dashboardResult;
                    // props
                    // console.log("completeCompaniesList", completeCompaniesList);
                    // localStorage.setItem('listofCompanies', JSON.stringify(response.data.dashboardResult))
                    // history.push('/competencies');
                    // props.updateListofCompanies(response.data.dashboardResult);
                    props.updateSearchList(response.data.data);
                } 
            }).catch(error => {
                // props.loaded(true, "Failed");
                // props.alertBox("Failed to Load", "error");
                console.log(error)
                // history.push('/client');
                // props.alertBox(false, "", "error")
    
            });
  
      },[]);


    function convert(str) {
        var date = new Date(str),
          mnth = ("0" + (date.getMonth() + 1)).slice(-2),
          day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
      }

    const history = useHistory();
    const onFinish = (values) => {

        console.log('Success:', values);
        // props.updateInfo({name:'adminLogin',values:values});
        // history.push('/campaignConfig');

        console.log('values', values);
        const access_token = localStorage.getItem('login');

        // const url = 'https://backend.thetalent.games/RegisterUser';
        const apiCallRequest = {
            url: '/campaigns',
            data: {
                startupComponentId: 1,
                name: values.campaignName,
                title: values.campaignTitle,
                description: values.campaignDescription,
                start_date: convert(values.campaignStartDate._d),
                end_date:   convert(values.campaignEndDate._d),
                active: (values.campaignStatus == "Active")?true:false,
                clientId: JSON.parse(localStorage.getItem('user')).userId
            },
            config: {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            }
        }



        props.loaded(false,"Creating Campaign");
        postApi(apiCallRequest).then(response => {
            console.log(response);
            if (response.status) {
                console.log(response);
                props.loaded(true, "Successfully Campaign Created");
                props.alertBox("Successfully Created Campaign", "success")
                localStorage.setItem('campaign', JSON.stringify(response.data))
                history.push('/competencies');
            } 
        }).catch(error => {
            props.loaded(true, "Failed");
            props.alertBox("Failed to Create Campaign", "error");
            console.log(error)
            // history.push('/client');
            // props.alertBox(false, "", "error")

        });

        console.log('apiCallRequest', apiCallRequest);




      };
    const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    };

    if(!localStorage.getItem('login'))history.push('/');
    

    
    //  console.log("props.data.listofCompanies.companiesList", props.data.listofCompanies.companiesList);
    return (
        <div className="myContainer">
            <div>
                <span className="myTitle">Create new campaign</span>
            </div>
        <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            validateMessages={validateMessages}
        >  
            {/* <span className="spanStyling"> Select Company </span>
            <Form.Item
                rules={[{ required: true }]}
                onChange={props.handleChange}
                name="selectCompany"
                value={props.data.selectCompany}
            >
                <Select
                    showSearch
                    defaultValue="All"
                    style={{ width: 200 }}
                    placeholder="Select a person"
                    optionFilterProp="children"
                    onChange={onChange}
                    onSearch={onSearch}
                    filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                >
                    <Option key={`country-option-all`} value="All">All</Option>
                    {
                    (props.data.searchList  != undefined )?  props.data.searchList.map((item, index) => (
                        <Option key={`country-option-${index}`} value={item.title}>{item.title}</Option>
                    ))
                    :<></>
                    }
                </Select> 
            </Form.Item> */}

            <span className="spanStyling"> Campaign Name </span>
            <Form.Item
                rules={[{ required: true }]}
                onChange={props.handleChange}
                name="campaignName"
                value={props.data.campaignName}
            >
                <Input 
                 className="input-style"
                 
                 
                 placeholder="Name"
                 />
            </Form.Item>

            <span className="spanStyling"> Campaign title</span>
            <Form.Item
                rules={[{ required: true }]}
                name="campaignTitle"
                value={props.data.campaignTitle}
                onChange={props.handleChange}
                placeholder="Title"

            >
                <Input placeholder="Title" className="input-style"/>
            </Form.Item>
            <span className="spanStyling">Description</span>
            <Form.Item
                rules={[{ required: true }]}
                name="campaignDescription"
                value={props.data.campaignDescription}
                onChange={props.handleChange}
                placeholder="Description"

            >
                <Input placeholder="Description" className="input-style"/>
            </Form.Item>
            <span className="spanStyling"> Campaign Start Date</span>
            <Form.Item
                className="Dpicker"
                rules={[{ required: true }]}
                name="campaignStartDate"
                value={props.data.campaignStartDate}
                onChange={props.handleChange}
                placeholder="Start-Date"

            >
                <DatePicker className="Dpicker" />
            </Form.Item>
            <span className="spanStyling">Campaign End Date</span>
            <Form.Item
                rules={[{ required: true }]}
                name="campaignEndDate"
                value={props.data.campaignEndDate}
                onChange={props.handleChange}
                placeholder="End Date"

            >
                <DatePicker className="Dpicker" />
            </Form.Item>
            <span className="spanStyling">Status</span>
            <Form.Item
                rules={[{ required: true }]}
                name="campaignStatus" //DropDown or Radio Button 
                value={props.data.campaignStatus} //DropDown or Radio Button 
                onChange={props.handleChange}
                placeholder="Active/Deactive"

            >
                 <Select
                    placeholder="Active Status"
                    // onChange={this.in}
                    allowClear
                >
                    <Option value="Active">Active</Option>
                    <Option value="Deactive">Deavtive</Option>
                </Select>
            </Form.Item>
            <Form.Item {...tailLayout}>
                <Button id="nextBtn" type="primary" htmlType="submit">
                    Create Campaign
        </Button>
            </Form.Item>
        </Form>
        </div>
        
    );
}


export default CreateCampaigns;