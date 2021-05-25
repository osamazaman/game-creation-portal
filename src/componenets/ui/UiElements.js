import React from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, Select, Card, Col, Row, Avatar } from 'antd';
import {  useHistory  } from "react-router-dom";
import axios from 'axios';
import {PageHeader} from 'antd';
import '../ui/uiElements.css';
import logo from '../../assets/TTG.png'
import { EditOutlined, EllipsisOutlined, SettingOutlined,    SearchOutlined } from '@ant-design/icons';




const { Option } = Select;
const { Meta } = Card;

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

function Headerrr(props) {

    const history = useHistory();
    
    const onFinish = (values) => {

        const access_token = localStorage.getItem('login');

        // const url = 'https://backend.thetalent.games/CreateCompanies';
        const url = '';
        const data = {
            name: values.companyName,
            website: values.companyWebsite,
            industry_type: values.companyIndustryType,
            bio: values.companyBio
        }
        const config = {
            headers: { Authorization: `Bearer ${access_token}` }
        };

        console.log(access_token, url, data, config);

        axios.post(url, data, config)
            .then(response => {
                console.log(response)
                if (response.data.status) {
                    console.log("Success: ", response);
                    // localStorage.setItem('login', response.data.token);
                    // history.push('/user');
                }
            }).catch(error => {
                console.log(error)
            });

        // props.updateInfo({name:'adminLogin',values:values});
            
        // console.log('Success:', values);        
        // history.push('/user');

      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
    
       if(!localStorage.getItem('login'))history.push('/'); 

    return (
        <div className="myContainer">
           <div>
            {/* Image div */}
           </div>

           <div>
               {/* Competencies on right side */}
           </div>

        </div>
            
    );
}


export default Headerrr;