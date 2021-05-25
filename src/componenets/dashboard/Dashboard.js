import React,{useEffect} from 'react';
import 'antd/dist/antd.css';
import { List, Avatar, Button, Input, Card, Modal } from 'antd';
import { useHistory } from "react-router-dom";
import './companies.css';
import listofCompanies from '../../services/listCompanies'
import { Row, Col, Select  } from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import dashboardBg from '../../assets/backgroundImages/dashboardBg.png';
import Search from 'antd/lib/transfer/search';
import mySearch from '../../componenets/createCampaign/Search';
import completeCompaniesList from '../../services/completeCompaniesList'

import {setCountriesListLocal} from '../../services/firebase/fetchCountriesData'

import { postApi, getApi, putApi } from '../../services/helpers/apiCalls'

import { Form, InputNumber, Switch  } from 'antd';

import { DatePicker, TimePicker } from 'antd';

import ttgLogo from '../../../src/assets/ttg-logo-gray.png';


import moment from 'moment';




const { RangePicker } = DatePicker;



const { Option } = Select;


const access_token = localStorage.getItem('login');

let campaignSelected ;

function onBlur() {
  console.log('blur');
}

function onFocus() {
  console.log('focus');
}

function onSearch(val) {
  console.log('search:', val);
}











function CompaniesList(props) {

  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState();

  const showModal = (campaign) => {
    console.log("open modal campaign", campaign);
    campaignSelected = campaign;
    setModalText(campaign);
    setVisible(true);
  };

  const handleOk = () => {
    // setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };

  const getCampaign = (id, companyIndex) => {
    console.log("companyIndex",id, companyIndex);
    console.log("id", id);
    const apiCallRequest = {
      url: '/gcp/getCampaign/'+id, // getCompaniesInfo
      data: {
         
      },
      config: {
          headers: {
              Authorization: `Bearer ${access_token}`
          }
      }
    }
    
    props.loaded(false,"Loading Campaign Data");
    getApi(apiCallRequest).then(response => {
        // console.log(response);
        if (response.data.status) {
            console.log("Campaign Data Loaded", response.data.campaigns);
            props.loaded(true, "Loaded Successfully");
            props.alertBox("Loaded Successfully", "success");
            // completeCompaniesList = response.data.dashboardResult;
            // props
            // console.log("completeCompaniesList", completeCompaniesList);
            // localStorage.setItem('listofCompanies', JSON.stringify(response.data.campaigns))
            // history.push('/competencies');
            let companiesData = JSON.parse(localStorage.getItem('listofCompanies'));
            companiesData.companiesList[companyIndex].campaigns = response.data.campaigns;
            // props.data.listofCompanies.forEach((company, companyIndex) => {
            //   if(company.id == response.data.campaigns.companyId) {
            //     companiesData.companiesList[companyIndex] = response.data.campaigns;
            //   }
            // });
            
            localStorage.setItem('listofCompanies', JSON.stringify(companiesData));
            props.updateListofCompanies(companiesData);
            // props.updateListofCompanies(response.data.dashboardResult);
        } 
    }).catch(error => {
        props.loaded(true, "Failed");
        props.alertBox("Failed to Load", "error");
        console.log(error)
        // history.push('/client');
        // props.alertBox(false, "", "error")

    });


  };


    useEffect(() => {
      // Update the document title using the browser API
      
      const apiCallRequest = {
        url: '/gcp/getCompanies', // getCompaniesInfo
        data: {
           
        },
        config: {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }
      }
      


      // const apiCallRequest = {
      //   url: '/companiesList',
      //   data: {
           
      //   },
      //   config: {
      //       headers: {
      //           Authorization: `Bearer ${access_token}`
      //       }
      //   }
      // }

        

       props.loaded(false,"Loading Dashboard Data");
        getApi(apiCallRequest).then(response => {
            // console.log(response);
            if (response.data.status) {
                console.log("Dashboard Data Loaded", response.data.dashboardResult);
                props.loaded(true, "Loaded Successfully");
                props.alertBox("Loaded Successfully", "success");
                // completeCompaniesList = response.data.dashboardResult;
                // props
                // console.log("completeCompaniesList", completeCompaniesList);
                localStorage.setItem('listofCompanies', JSON.stringify(response.data.dashboardResult))
                // history.push('/competencies');
                props.updateListofCompanies(response.data.dashboardResult);
            } 
        }).catch(error => {
            props.loaded(true, "Failed");
            props.alertBox("Failed to Load", "error");
            console.log(error)
            // history.push('/client');
            // props.alertBox(false, "", "error")

        });




        // const access_token = localStorage.getItem('login');
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

 
  const { Meta } = Card;

  useEffect(() => {
    // Update the document title using the browser API
    props.changeBgImage(dashboardBg);
  },[props.bgImage]);
  
  const history = useHistory();
  
  const onFinish = (values) => {
    // console.log('Success:', values);
    // props.updateInfo({name:'adminLogin',values:values});
    history.push('/company');
  };

  const addCampaign = (values) => {

    history.push('/campaign');
  }

  if (!localStorage.getItem('listofCompanies')) {
    localStorage.setItem('listofCompanies', JSON.stringify(listofCompanies));
  }
  // if (!localStorage.getItem('setCountriesListLocal')) {
  //   setCountriesListLocal();
  // }

  if (!localStorage.getItem('login')) history.push('/');
  
  
  function onChange(value) {
    
    console.log(`selected ${value}`);
    // props.data.listofCompanies.companiesList.forEach((company, index) => {
    //   if(company.title == value){
    //     getCampaign(company.id, index);
       
    //   }
    // });

    props.filterCompaniesList(value);
    
    
  }

  const updateCampaignStatus = (fieldsValue) => {
    // Should format date value before submit.
    const values = {
      status : (fieldsValue.status)?'active':'completed',
      startEndDate: [fieldsValue.startEndDate[0].format('YYYY-MM-DD'), fieldsValue.startEndDate[1].format('YYYY-MM-DD')]
    };

    const apiCallRequestUpdateStatus = {
      url: '/campaigns/'+campaignSelected.id,
      data: {
        start_date: values["startEndDate"][0],
        end_date: values["startEndDate"][1],
        state: values["status"]
         
      },
      config: {
          headers: {
              Authorization: `Bearer ${access_token}`
          }
      }
    }
    props.loaded(false, "Updating Status");
    setConfirmLoading(true);
    putApi(apiCallRequestUpdateStatus).then(response => {
        console.log(response);
        props.loaded(true, "Updated Status Successfully");
        props.alertBox("Updated Status Successfully", "success");
        setConfirmLoading(false);
        setVisible(false);
        if (response.data.status) {
            setConfirmLoading(false);
            setVisible(false);
        } 
    }).catch(error => {
        props.loaded(true, "Failed");
        props.alertBox("Failed to Update Status", "error");
        setConfirmLoading(true);
        console.log(error);

    });





    console.log('Campaign Status Updated', values);
  };
  
  return (

    <div className="myContainer">
      { 
      (visible)?
      <Modal
        title={<>Campaign Status ( {modalText.name} )</>}
        visible={visible}
        confirmLoading={confirmLoading}
        onOk={handleOk} 
        onCancel={handleCancel}
        footer={null}
      >
        <Form onFinish={updateCampaignStatus}  style={{ minHeight: 'auto' }}>
        <Form.Item name="status" label="Campaign Status"  >
             <Switch checkedChildren="active" unCheckedChildren="completed" defaultChecked={(modalText.state == 'active' )?true:false} />
          </Form.Item>
          <Form.Item name="startEndDate" label="Start - End Date">
            <RangePicker 
              defaultValue = {[moment(modalText.startDate), moment(modalText.endDate)]}
            />
          </Form.Item>
          <Button type="primary"  htmlType="submit">
           Save
          </Button>
        </Form>
      </Modal>:<></>
    
    }

        <div className="myTitle search inline-row">
             {/* <mySearch/> */}
      <Select
        showSearch
        defaultValue="All"
        style={{ width: 200 }}
        placeholder="Select a person"
        optionFilterProp="children"
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onSearch={onSearch}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        <Option key={`country-option-all`} value="All">All</Option>
          {(props.data.searchList != undefined )? props.data.searchList.map((item, index) => (
            <Option key={`country-option-${index}`} value={item.title}>{item.title}</Option>
          ))
          :<></>
          }
        {/* <Option value="jack">Jack</Option>
        <Option value="lucy">Lucy</Option>
        <Option value="tom">Tom</Option> */}
      </Select> 
        </div>

      {/* <div style={{ width: 570, backgroundColor: "red" }} className="inline-row headerSpacing"> */}
        <div className="inline-row" style={{ marginRight: '30px' }}>
          <span className="numberss"> {props.data.listofCompanies.totalCompanies} </span> 
          <span className="headers"> Companies </span>
        </div>
        
        <div className="inline-row" style={{ marginRight: '30px' }}>
          <span className="numberss"> {props.data.listofCompanies.totalCampaign} </span> 
          <span className="headers"> Campaigns </span>
        </div>
        
        <div className="inline-row" style={{ marginRight: '30px' }}>
          <span className="numberss"> {props.data.listofCompanies.totalLiveCampaign} </span>
          <span className="headers"> Live </span>
        </div>
        
        <div className="inline-row" style={{ marginRight: '30px' }}>
          <span className="numberss"> {props.data.listofCompanies.totalCompletedCampaign} </span>
          <span className="headers"> Completed </span>
        </div>

        <div className="inline-row" style={{ marginRight: '30px' }}>
          <span className="numberss"> {props.data.listofCompanies.totalCandidates} </span>
          <span className="headers"> Candidates </span>
        </div>
      {/* </div> */}

       

      {/* companyItem Start*/}
      <div id="company-container">

   
      <div className="searchBar">
          {/* <Input style={{width:200}}placeholder="Search Campaign Name" prefix={<SearchOutlined className="site-form-item-icon" />} /> */}
          <Button type="primary" href="/company" style={{borderRadius: 5, float:"right", display:"block"}}> Add new Company</Button>
      </div> 

        {
          props.data.listofCompanies.companiesList.map((company, companyIndex) => (
              <div id={companyIndex} value={companyIndex} className="items" 
              
              >
              <div id="company-heading" className="inline-row subHeading" style={{ marginTop: 30, marginLeft:20, width:650}}>
                {/* Company name and avatar start */}
                <div className="inline-row campaignBox" style={{width:210}} 
                  onClick={(e)=>{ 
                    const id = company.id, index = companyIndex  
                  getCampaign(id, index)
                }
              }>
                <span>
                  <Avatar src={ttgLogo}  height="30"/>
                  <span className="subHeading"></span> {company.title} </span>
                </div>
                {/* Company name and avatar end */}
                <div id="company-details">
                  <div className="inline-row company-det"><span className="subRow">{company.totalCampaigns} Campaign </span></div>
                  <div className="inline-row company-det"><span className="subRow ">{company.liveCampaigns} Live </span></div>
                  <div className="inline-row company-det"><span className="subRow ">{company.totalCandidates} Candidates </span></div>
                </div>
              </div>

              <div id="campaign-container" className="site-card-wrapper">

                <Row id="company-items">

                  {/* CampaignItem Start*/}

                  { (company.campaigns != undefined ) ?
                   company.campaigns.map((campaign, campaignIndex) => (


                    <div className="campaign-item">
                    <Col style={{margin:20}} xs={8} xl={28}>

                      <Card
                        style={{width: 200}}
                        cover={
                          <img
                            className="cardImage"
                            alt="example"
                            src="..\..\assets\Game Creation Portal Exports\thumbnail.png"
                          />
                        }
                        
                      >
                        
                        <Meta
                          title={campaign.name}
                          description={<><p>{campaign.description}</p><p>{campaign.createdAt}</p></>} 
                        />
                        <Row gutter={20}>
                            
                            {
                              (campaign.behaviour=="1") ?
                                <Col className="Col-icon">
                                  <img
                                    src="..\..\assets\Game Creation Portal Exports\Asset 16.png"
                                    height="30"
                                    className="cardIcons"
                                  />
                                  <span style={{fontSize:9}}> Behaviour</span>
                                </Col> : <></>
                            }
                            {
                              (campaign.cognitiveAbilities=="1")?
                            <Col className="Col-icon">
                              <img
                                src="..\..\assets\Game Creation Portal Exports\Asset 17.png"
                                height="30"
                                className="cardIcons"
                              />
                              <span style={{fontSize:9}}> Cognitive Abilities</span>
                            </Col>:<></>
                            }
                             {
                               (campaign.apptitude=="1")?
                            <Col className="Col-icon" >
                              <img
                                src="..\..\assets\Game Creation Portal Exports\Asset 18.png"
                                height="30"
                                className="cardIcons"
                              />
                              <span style={{fontSize:9}}> Apptitude</span>
                            </Col>:<></>
                            }
                        </Row>
                        
                        <Row gutter={10} className="fiveIcons">
                          <Col className="Col-icon">
                            <img
                              src="..\..\assets\Game Creation Portal Exports\Asset 19.png"
                              height="15"
                              className="cardIcons"
                            />
                          </Col>

                          <Col className="Col-icon">
                            <img
                              src="..\..\assets\Game Creation Portal Exports\Asset 20.png"
                              height="15"
                              className="cardIcons"
                            />
                          </Col>

                          <Col className="Col-icon">
                            <img
                              src="..\..\assets\Game Creation Portal Exports\Asset 21.png"
                              height="15"
                              className="cardIcons"
                            />
                          </Col>

                          <Col className="Col-icon" onClick={()=>{showModal(campaign)}}>
                            {(campaign.state == 'active')?
                              <img
                                src="..\..\assets\Game Creation Portal Exports\Asset 22.png"
                                height="15"
                                className="cardIcons"
                              />:
                              <img
                                src="..\..\assets\Game Creation Portal Exports\Asset 19.png"
                                height="15"
                                className="cardIcons"
                              />
                            }
                          </Col>

                          <Col className="Col-icon">
                            <img
                              src="..\..\assets\Game Creation Portal Exports\Asset 23.png"
                              height="15"
                              className="cardIcons"
                            />
                          </Col>
                        </Row>
                      </Card>

                    </Col>
                    </div>
                  ))
                  :<></>
                  }
                  {/* CampaignItem End */}

                </Row>

              </div>
            </div>

          ))
        }

        {/* companyItem End*/}
      </div>



    </div>






















  
  );
}

export default CompaniesList;