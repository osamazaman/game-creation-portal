import React,{useState} from 'react';
import 'antd/dist/antd.css';
import {Button,PageHeader, Drawer, Card, Avatar} from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import logo from '../../assets/TTG.png'

import { Menu } from 'antd';
import './headerFooter.css';
import {
  AppstoreOutlined,
  MenuOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';


const { Meta } = Card;
const { SubMenu } = Menu;

function HeaderBlock(props) {

    // const history = useHistory();

    console.log("HEADER - props.userInfo", props.userInfo);
    
    const [visible, setVisible] = useState(false);
    
    const [afterLogin, setAfterLogin] = useState(localStorage.getItem('login')?true:false);
    const [collapsed, setCollapsed ] = useState(false);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    


    const showDrawer = () => {
        setVisible(true);
      };
      const onClose = () => {
        setVisible(false);
      };
    const  logout = (values) => {
        
        localStorage.clear();
        // history.push('/');
    };

    // var userInfoH = 
    // localStorage.getItem( 'userInfo' )? : || '';
    // this.props.updateUser
    
    // if(props.userInfo == '') {
    //     props.updateUserInfo(localStorage.getItem( 'userInfo' ));
    // }

    // console.log("localStorage.getItem( 'userInfo' )", localStorage.getItem( 'userInfo' ));
    
    return( 
    
        <PageHeader
            style={{ backgroundColor: "transparent" }}
            className="site-page-header"
            // onBack={() => null}
            title={<a href="/dashboard"><img src={logo} height="70px" alt="TTG" /></a>}
            extra={
                [
                props.userInfo.name?
                    <>
                        <MenuOutlined id="drawer-button" onClick={showDrawer} />
                        <Drawer
                            id="header-drawer"
                            title=""
                            placement="right"
                            closable={false}
                            onClose={onClose}
                            visible={visible}
                        >
                            <Card
                                cover={
                                    <img
                                        alt="example"
                                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                    />
                                }
                                actions={[
                                    <SettingOutlined key="setting" />,
                                    <EditOutlined key="edit" />,
                                    <EllipsisOutlined key="ellipsis" />,
                                ]}
                            >
                                <Meta
                                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title={props.userInfo.name}
                                    description={props.userInfo.email}
                                />
                            </Card>
                            <Button type="primary" href="/company" style={{borderRadius: 5, marginTop:"20px", display:"block"}}> Add new Company</Button>
                            <Button type="primary" href="/campaign" style={{borderRadius: 5, marginTop:"20px", display:"block"}}> Add new Campaign</Button>
                            <Button className="logout-button " key="LogoutButton" onClick={logout} >
                                <a href="/">Logout</a>
                            </Button>
                        </Drawer>
                    </>
                    : <span key="span-header"></span>
            ]}
        />
    )
}

export default HeaderBlock;