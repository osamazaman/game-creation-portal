import React, {useEffect} from 'react';
import { Button, Tag, Tooltip, Collapse, Checkbox, Switch } from 'antd';
import "./campaign.css";
import { useHistory  } from "react-router-dom";
import competenciesList from '../competencies/dataSource/competenciesList';
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import { CloseCircleTwoTone, DownCircleOutlined } from '@ant-design/icons';
import competencyBG from '../../assets/backgroundImages/competencyBG.png';
import BuildingStory from "../../../src/assets/tower/BuildingStory.png";
import towerHead from "../../../src/assets/tower/towerHead.png";
import BuildingBottom from "../../../src/assets/tower/BuildingBottom.png";
import { postApi } from '../../services/helpers/apiCalls';

const { Panel } = Collapse;


function AddCompetencies(props) {

    useEffect(() => {
        // Update the document title using the browser API
        props.changeBgImage(competencyBG);
      },[props.bgImage]);

    const history = useHistory();

    const next = (values) => {

        const access_token = localStorage.getItem('login');

        console.log('Success:', values);
        // props.updateInfo({name:'adminLogin',values:values});
        // console.log(props.data.tower);
        let notExiste = true;
        let competency = "user";
        props.data.tower.forEach((item)=>{
            if(item.name === competency){
                notExiste = false;
            }
        })

        const campaignId = JSON.parse(localStorage.getItem('campaign')).id;

        console.log("campaignId", campaignId);

        let apiCallRequest, componentId=1, nextComponentId=2;

        props.data.tower.forEach((item)=>{


            console.log(item.competencyData);


            apiCallRequest = {
                url: '/competencies', // getCompaniesInfo
                data: {
                    title: item.competencyData.title,
                    campaignId: campaignId,
                    componentId: "scene"+componentId,
                    nextComponentId: "task-center",
                    type: item.competencyData.type,
                    description: item.competencyData.description,
                    timer: "60",
                    assetsURL: item.competencyData.assetsURL,
                    url: "./avatar/app.bundle.js",
                    startupData: "",
                    data: ""
                },
                config: {
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                }
              }
              
              console.log("apiCallRequest.data", apiCallRequest.data);

              props.loaded(false,"adding competency "+item.competencyData.title);
              postApi(apiCallRequest).then(response => {
                  console.log(response);
                  if (response.status) {
                      console.log("Successfully added competency "+item.competencyData.title, response.data.campaigns);
                      props.loaded(true, "Added Competency "+item.competencyData.title);
                      props.alertBox("Successfully added competencies ", "success");
                  } 
              }).catch(error => {
                  props.loaded(true, "Failed");
                  props.alertBox("Failed to add competency "+item.competencyData.title, "error");
                  console.log(error)
          
              });
        
            componentId++;
        
        })

        if(notExiste){
            console.log("Registration User Not added in tower")
        }
        else {
            history.push('/registrationFields');
        }


        // props.alertBox("Successfully added All competencies ", "success");

      };


      const registrationCheck = (values) => {
        console.log('Success:', values);

        
        const val = {
            target: {
                name: "registrationCheckBox",
                value:values,
                type: "switch"
            }
        }
        // props.updateInfo({name:'adminLogin',values:values});
        
        props.handleChange(val);
        // props.registrationCheck(val)

        if(values) {
          history.push('/registrationFields');
        } 
        else {
            console.log("Registration Field Unchecked");
        }
        };

    const SortableContainer = sortableContainer(({ children }) => {
        return (<div>{children}</div>);
    });

    function callback(key) {
        console.log(key);
    }

    const SortableItem = sortableElement(({ value }) => {
        return (
            <div key={`box-${value.value}`} className="tower_value" value={value.value}>
                <div className="floorNumber">
                <Tag>{value.index + 1}</Tag>
                </div>
                <div className="towerItem">
                    <img src={BuildingStory} style={{ height: 80 }} />
                    <div className="towerItem floorBg">
                        <img src={value.imgUrl} style={{ height: 41, width:150 }} />
                    </div>
                    
                <div className="floorName">
                {value.value}
                </div>
                </div>
            </div>
        )
    });

    // if(!localStorage.getItem('login'))history.push('/');

    return (
        
        <div>
            <div id="tower" className="formWrap_box">
                <div>
                <Button className="next" onClick={next} type="primary" htmlType="submit">Next</Button>
                </div>
                
                <div className="formWrap_box_center">
                    <img src={towerHead} style={{height:200, marginLeft:20}}/>
                    {/* Tower in the mid */}
                    <SortableContainer lockAxis="y" pressThreshold="1" onSortEnd={props.onSortEnd}>
                        {
                            props.data.tower.map((value, index) => (
                                          
                                <div>
                                    <div key={`div-${value.name}`}>
                                    <SortableItem key={`item-${value.name}`} index={index} value={{ 'value': value.name, 'index': index, 'imgUrl':value.imgUrl }} />
                                    {/* <Button className="close" value={value.name} onClick={props.onClickClose} >x</Button> */}
                                    <CloseCircleTwoTone className="close" value={value.name} onClick={props.onClickClose} />
                                </div>
                                </div>
                            ))
                        }
                    </SortableContainer>
                    <img src={BuildingBottom} style={{height:150}}/>
                </div>
            </div>



            <div id="competencies" className="formWrap_box">


                <div className="registrationSlider">
                    <h3 className="inline-row" >Registration</h3>
                    <Switch
                        className="inline-row switchSpace"
                        size="small"
                        checkedChildren="Yes"
                        unCheckedChildren="No"
                        value={props.data.registrationCheckBox}
                        defaultChecked = {props.data.registrationCheckBox}
                        onChange={registrationCheck}
                        //  {props.data.registrationCheckBox}?defaultChecked: ''
                    />

                    {/* <Checkbox
                        name = "registrationCheckBox"
                        type = "checkbox"
                        checked={props.data.registrationCheckBox}
                        onChange = {registrationCheck}
                    >
                    </Checkbox>     */}
                </div>

                {competenciesList.map((competency,competencyIndex) => (
                    <div key={`competency-${competency.name}`}>
                        <Collapse defaultActiveKey={['0']} ghost>
                            <Panel header={<h3>{competency.name}</h3>} key="1">
                            {
                            competency.list.map((item,index) => (
                                // <Tooltip key={`Tooltip-${item.competencyGameName}-${competencyIndex}-${index}`} placement="top" title={item.competencyGameName}>  
                                    <Tag key={`Tag-${item.competencyName}-${competencyIndex}-${index}`} onClick={props.onClickCompetenciesItem} value={item.title} imgUrl={item.imgUrl} competencyObj={JSON.stringify(item)}>{item.title}
                                        {/* <CloseCircleTwoTone className="close"  /> */}
                                        {/* <CloseCircleTwoTone /> */}
                                    </Tag>
                                // </Tooltip> 
                            ))
                        }
                            </Panel>
                        </Collapse>
                        
                       
                    </div>
                ))}
            </div>
        </div>


    );
}


export default AddCompetencies;