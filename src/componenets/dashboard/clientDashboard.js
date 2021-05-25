import React,{useEffect} from 'react';
import 'antd/dist/antd.css';
import { List, Avatar, Button, Input, Card } from 'antd';
import { useHistory } from "react-router-dom";
import './companies.css';
import listCompanies from '../../services/listCompanies'
import { Row, Col } from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import cDashboardBg from '../../assets/backgroundImages/cDashboardBg.png';
import clientDashb from '../../services/clientDashb';


function ClientDashboard(props) {
  
  const { Meta } = Card;

  useEffect(() => {
    props.changeBgImage(cDashboardBg);
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

  if (!localStorage.getItem('login')) history.push('/');
  
  return (
    <div className="myContainer">
       

      {/* companyItem Start*/}
      
      <div id="company-container">

        {
          clientDashb.map((company, companyIndex) => (
              <div className="items">
                  <div className="inline-row">
                    {/* Company name */}
                    <div className="client-title inline-row"><span> {company.title}</span></div>

                      <div className="searchBar inline-row">
                          <Input style={{ width: 310, height:28}} placeholder="Search Campaign Name" prefix={<SearchOutlined className="site-form-item-icon" />} />
                      </div>
                  </div>
              <div id="company-heading" className="inline-row subHeading" style={{ marginTop: 30, marginLeft:20, width:650}}>
                {/* Company name end */}
                      <div id="client-details">

                          <div className="inline-row" style={{ width: 240 }}>
                              <span className="numberss"> {company.campaign} </span>
                              <span className="headers"> Campaigns </span>
                          </div>

                          <div className="inline-row" style={{ width: 130 }}>
                              <span className="numberss"> {company.liveCampaign} </span>
                              <span className="headers"> Live </span>
                          </div>

                          <div className="inline-row" style={{ width: 240 }}>
                              <span className="numberss"> {company.candidates} </span>
                              <span className="headers"> Candidates </span>
                          </div>

                      </div>
                  </div>

              <div id="campaign-container" className="site-card-wrapper">

                <Row id="company-items">

                  {/* CampaignItem Start*/}

                  {company.campaigns.map((campaign, campaignIndex) => (


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
                          description={campaign.description}
                        />

                        <Row gutter={20}>
                          <Col className="Col-icon">
                            <img
                              src="..\..\assets\Game Creation Portal Exports\Asset 16.png"
                              height="30"
                              className="cardIcons"
                            />
                            <span style={{fontSize:9}}> Behaviour</span>
                          </Col>

                          <Col className="Col-icon">
                            <img
                              src="..\..\assets\Game Creation Portal Exports\Asset 17.png"
                              height="30"
                              className="cardIcons"
                            />
                            <span style={{fontSize:9}}> Cognitive Abilities</span>
                          </Col>

                          <Col className="Col-icon" >
                            <img
                              src="..\..\assets\Game Creation Portal Exports\Asset 18.png"
                              height="30"
                              className="cardIcons"
                            />
                            <span style={{fontSize:9}}> Apptitude</span>
                          </Col>

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

                          <Col className="Col-icon">
                            <img
                              src="..\..\assets\Game Creation Portal Exports\Asset 22.png"
                              height="15"
                              className="cardIcons"
                            />
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

export default ClientDashboard;