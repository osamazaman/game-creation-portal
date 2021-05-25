import React from 'react'
import Dashboard from './invite/Dashboard';
import InvitedUsers from './invite/InvitedUsers';
import SendInvite from './invite/SendInvite';
import Settings from './invite/Settings';
// import Preview from './invite/Preview';
// import CustomizedTemplate from './invite/CustomizedTemplate';

import './candidates.css';


import { Tabs } from 'antd';
import { AppleOutlined, AndroidOutlined, SettingOutlined, AreaChartOutlined, SendOutlined, MailOutlined, BarChartOutlined, PieChartOutlined, DotChartOutlined, LineChartOutlined, RadarChartOutlined } from '@ant-design/icons';


const { TabPane } = Tabs;

function callback(key) {
    console.log(key);
  }

function Invite() {
    return (
        <div id="invite-container">

            <Tabs defaultActiveKey="statistics" onChange={callback}>
                <TabPane 
                    tab={
                        <span>
                            <AreaChartOutlined />
                            {/* <PieChartOutlined />
                            <BarChartOutlined />
                            <DotChartOutlined />
                            <LineChartOutlined />
                            <RadarChartOutlined /> */}
                        </span>
                    }
                    key="statistics"
                >
                    <Dashboard />
                </TabPane>
                <TabPane 
                    tab={
                        <span>
                            <MailOutlined />
                            Invited Users
                        </span>
                    }
                    key="invitedUsers"
                >
                    <InvitedUsers />
                </TabPane>
                
                <TabPane
                     tab={
                        <span>
                          <SendOutlined />
                          Send Invite
                        </span>
                    }
                    key="sendInvite"
                >
                    <SendInvite />
                </TabPane>

                <TabPane
                    tab={
                        <span>
                          <SettingOutlined/>Settings
                        </span>
                    }
                    key="settings"
                >
                    <Settings />
                </TabPane>

            </Tabs>


            {/* <Preview />
            <CustomizedTemplate /> */}
        </div>
    )
}

export default Invite
