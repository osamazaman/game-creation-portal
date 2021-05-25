import React, {Component} from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Select } from 'antd';
// import axios from 'axios';

import db from '../../services/firebase/config';


// import { getCountries } from '../../services/firebase/fetchCountriesData';

const { Option } = Select;



class Address extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedCountry :'',
            selectedState : '',
            countries :[],
            states : [],
            cities : []
        };

        this.onChangeCountry = this.onChangeCountry.bind(this);
        this.onChangeState = this.onChangeState.bind(this);
        this.fetchStates = this.fetchStates.bind(this);
        this.fetchCities = this.fetchCities.bind(this);
    }

 
    onSearch(val) {
        console.log('search:', val);
    }

    onChangeCountry(country) {
        this.setState({
            selectedCountry: country
        })
        
    }

    onChangeState(state) {
        this.setState({
            selectedState: state
        })
        
    }



    // fetchStates(values) {
    //     const country = this.state.selectedCountry;
    //     axios.get('http://localhost:3000/states/'+country, { })
    //     .then(response => {
    //         this.setState({
    //             states: response.data
    //         })           
    //     }).catch(error => {
    //         console.log(error)
    //     });
    // }


    fetchStates(values) {
        const countryName = this.state.selectedCountry;
        var stateList = [];
        var isValid = false;
        db.ref().on('value',snapshot =>{
        var countries = snapshot.val();
        countries.forEach(country => {
            if(country['country_name'] === countryName) {
            isValid = true;
            country['states'].forEach(state => {
                stateList.push(state['state_name']);
            });
            }
        
        });
        if(isValid) {
            this.setState({
                states: stateList
            }) 
        }
        else {
            console.log("InValid CountryName");
        }
        
        });
    }    


    // fetchCities(values) {
    //     const country = this.state.selectedCountry;
    //     const state = this.state.selectedState;
    //     axios.get('http://localhost:3000/cities/'+country+'/'+state, { })
    //     .then(response => {
    //         this.setState({
    //             cities: response.data
    //         })           
    //     }).catch(error => {
    //         console.log(error)
    //     });
    // }
     
    fetchCities(values) {
        const countryName = this.state.selectedCountry;
        const stateName = this.state.selectedState;
        var citiesList = [];
        var isValid = false;
        db.ref().on('value', snapshot => {
        var countries = snapshot.val();
        countries.forEach(country => {
            if(country['country_name'] === countryName) {
            country['states'].forEach(state => {
                if(state['state_name'] === stateName) {
                isValid = true;
                citiesList = state['cities'];
                }
            });
            }
        
        });
        if(isValid) {
            this.setState({
                cities: citiesList
            }) 
        }
        else {
            console.log("InValid CountryName Or StateName");
        }
        
        });
    }

    // componentDidMount() {
    //     axios.get('http://localhost:3000/countries', { })
    //     .then(response => {
    //         this.setState({
    //             countries: response.data
    //         })           
    //     }).catch(error => {
    //         console.log(error)
    //     });
    // };


    componentDidMount() {

        // this.setState({
        //     countries: JSON.parse(localStorage.getItem('countriesNameList')) || []
        // }) 
        db.ref().on('value', snapshot => {
            var countries = snapshot.val();
            // console.log(countries);
            var countriesNameList = [];
            countries.forEach(country => {
              countriesNameList.push(country['country_name']);
            });
            this.setState({
                countries: countriesNameList
            })  
          },
          function(error) {
            console.log(error);
          }
          );

    };


render()
    { 
        console.log('CSC', this.props.visibility.country);
        return (
            <div>
                {this.props.visibility.country?
                <Form.Item>
                    <Input.Group compact>
                        <Form.Item
                            name={['address', 'country']}
                            // noStyle
                            rules={[{ required: true, message: 'country is required' }]}
                        >
                            <Select
                                className="address"
                                placeholder="List of all countries"
                                onChange={this.onChangeCountry}
                                onSearch={this.onSearch}
                                showSearch
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                
                                { 
                                
                                this.state.countries.map((item, index) => (
                                    <Option key={`country-option-${index}`} value={item}>{item}</Option>
                                ))
                                
                                }
                            </Select>
                        </Form.Item>
                        {this.props.visibility.state?
                        <Form.Item
                            name={['address', 'state']}
                            // noStyle
                            rules={[{ required: true, message: 'State is required' }]}
                        >
                            <Select 
                                className="address"
                                placeholder="Select State"
                                onChange={this.onChangeState}
                                onClick={this.fetchStates}
                                showSearch
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {this.state.states.map((item, index) => (
                                    <Option key={`state-option-${index}`} value={item}>{item}</Option>
                                ))
                                }
                            </Select>

                        </Form.Item>
                         :<></>}
                        {this.props.visibility.city?
                        <Form.Item
                            name={['address', 'city']}
                            // noStyle
                            rules={[{ required: true, message: 'City is required' }]}
                        >
                            <Select
                                className="address"
                                placeholder="Select city"
                                onClick={this.fetchCities}
                                showSearch
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {  this.state.cities.map((item, index) => (
                                    <Option key={`city-option-${index}`} value={item}>{item}</Option>
                                ))
                                } 
                            </Select>

                        </Form.Item>
                        :<></>
                        }
                   </Input.Group>
                </Form.Item>
                :<></>
            }
            </div>
        )
    }

}

export default Address;