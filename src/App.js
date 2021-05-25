//   "UserLogin Api",		
//   "CreateCompanies",		
//   "RegisterUser",		
//   "AddClients",		
//   "CreateCampaigns",		
//   "AddCompetencies"

// adminLogin
// company
// user
// client
// campaign


import React, {Component} from 'react';
import HeaderBlock from '../src/componenets/HeaderFooter/Header';
import FooterBlock from '../src/componenets/HeaderFooter/Footer';
import Headerrr from '../src/componenets/ui/UiElements';
import FormContainer from './containers/FormContainer';
import './App.css';
import 'antd/dist/antd.css';
import {Layout} from 'antd';


class App extends Component  {  
  constructor() {
    super();
    this.state = {
      userInfo: JSON.parse(localStorage.getItem('userInfo')) || []
    };

    this.updateUserInfo = this.updateUserInfo.bind(this);
  }

  

  updateUserInfo(value) {
    console.log("userInfo",value);
    // localStorage.setItem( 'userInfo', value );

    this.setState({
      userInfo: value
    },() => {
      localStorage.setItem('userInfo', JSON.stringify(this.state.userInfo))
    });

  }

  // componentDidMount() {
  //   // localStorage.setItem( 'userInfo', '' );
  //   this.updateUserInfo(localStorage.getItem( 'userInfo' ));
  // };


  render() {
    {console.log("APP- userInfo", this.state.userInfo);}
  return (
    <Layout>
      <HeaderBlock 
        userInfo = {this.state.userInfo}
        updateUserInfo = {this.updateUserInfo }
      />
      {/* <Headerrr/> */}
      {/* <Layout> */}
        {/* <Sider>left sidebar</Sider> */}
        <FormContainer 
          userInfo = {this.state.userInfo}
          updateUserInfo = {this.updateUserInfo }
        />
        {/* <Sider>right sidebar</Sider> */}
      {/* </Layout> */}
      <FooterBlock/>
    </Layout>
  );
  }
}

export default App;
