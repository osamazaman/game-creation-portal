import React from 'react';
import 'antd/dist/antd.css';
import { List, Avatar, Button } from 'antd';
import { useHistory } from "react-router-dom";
import './companies.css';
import listCompanies from '../../services/listCompanies'
import { Row, Col } from 'antd';




function CompaniesList(props) {
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

    <div className="Companies-List">
      <Button onClick={onFinish} type="primary" htmlType="submit">
        Add New Company
            </Button>
      <div>


        <div className="List">
          <h1>Comapnies List</h1>

          <List
            id="list-companies"
            itemLayout="horizontal"
            dataSource={listCompanies}
            renderItem={item => (

              <div>
                <List.Item
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.src} />}
                    title={<div>{item.title}  
                     <Button id="addCampaign_button" type="primary" htmlType="submit" onClick={addCampaign}>
                      Add campaign
                        </Button></div>}
                  // description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                  />


                </List.Item>

                <List
                  itemLayout="horizontal"
                  dataSource={item.campaigns}
                  renderItem={campaign => (
                    <div className="campaign">
                      <a href='/competencies'>
                        <List.Item
                        //  actions={[<a src="" key="list-loadmore-more">View</a>]}
                        >
                          <List.Item.Meta
                            title={campaign.name}
                            description={
                              <div>
                                {/* <div>
                                    <ul><li>Duration</li><li>Total</li><li>Pending</li><li>Completed</li></ul>
                                      <ul ><li style={{padding:'20px'}}>{campaign.duration}</li><li style={{padding:'20px'}}>{campaign.total}</li><li style={{padding:'20px'}}>{campaign.pending}</li><li style={{padding:'20px'}}>{campaign.completed}</li></ul>
                                   </div> */}

                                {/* <Divider orientation="left">Vertical</Divider> */}
                                <Row gutter={[1, 2]}>
                                  <Col className="gutter-row" span={6}>
                                    <div className="element">Duration</div>
                                  </Col>
                                  <Col className="gutter-row" span={6}>
                                    <div className="element">Total</div>
                                  </Col>
                                  <Col className="gutter-row" span={6}>
                                    <div className="element">Pending</div>
                                  </Col>
                                  <Col className="gutter-row" span={6}>
                                    <div className="element">Completed</div>
                                  </Col>
                                  <Col className="gutter-row" span={6}>
                                    <div className="element">{campaign.duration}</div>
                                  </Col>
                                  <Col className="gutter-row" span={6}>
                                    <div className="element">{campaign.total}</div>
                                  </Col>
                                  <Col className="gutter-row" span={6}>
                                    <div className="element">{campaign.pending}</div>
                                  </Col>
                                  <Col className="gutter-row" span={6}>
                                    <div className="element">{campaign.completed}</div>
                                  </Col>
                                </Row>

                              </div>
                            }
                          />

                        </List.Item>
                      </a>
                    </div>
                  )
                  }
                />

                {/* <img src={item.src}/> */}
              </div>
            )}

          />
        </div>
      </div>

      {/* <button onClick={}>Add New Company</button> */}
    </div>
  );
}

export default CompaniesList;