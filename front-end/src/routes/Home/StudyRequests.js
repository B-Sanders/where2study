import React, { Component } from 'react';
import {Col, Rate, Icon, FlexboxGrid, Panel, Message} from "rsuite";
import cseBuilding from "../../images/cse-building.jpeg"
import priceCenter from "../../images/price-center.jpg"
import geiselLibrary from "../../images/geisel-libary.jpg"

class StudyRequests extends Component{
    render(){
        return(
        <FlexboxGrid justify="center">
          <FlexboxGrid.Item colspan={6}>
            <Panel shaded bordered bodyFill style={{ display: 'inline-block', width: 240 }}>
                <img src={cseBuilding} height="240" />
                <Message
                    style={{backgroundColor:'white'}}
                    title="Studying for Final"
                    description={
                        <p>
                            CSE 12
                            <br />
                            CSE Building
                        </p>
                    }
                />
                <Col xs={24}> 
                    <Rate readOnly defaultValue={3} size="sm" character={<Icon icon="volume-up" style={{ color: 'rgba(0, 106, 150, 0.75)' }} />} /> 
                </Col>
            </Panel>
          </FlexboxGrid.Item> 
          <FlexboxGrid.Item colspan={6}>
            <Panel shaded bordered bodyFill style={{ display: 'inline-block', width: 240 }}>
                <img src={priceCenter} height="240" />
                <Message
                    
                    style={{backgroundColor: 'white'}}
                    title="Studying for Midterm"
                    description={
                        <p>
                            CSE 110
                            <br />
                            Price Center
                        </p>
                    }
                />
                <Col xs={24}> 
                    <Rate readOnly defaultValue={4} size="sm" character={<Icon icon="volume-up" style={{ color: 'rgba(0, 106, 150, 0.75)' }} />} /> 
                </Col>
            </Panel>
          </FlexboxGrid.Item>     
           <FlexboxGrid.Item colspan={6}>
            <Panel shaded bordered bodyFill style={{ display: 'inline-block', width: 240 }}>
                <img src={geiselLibrary} height="240" />
                <Message
                    
                    style={{backgroundColor: 'white'}}
                    title="Reviewing Lecture"
                    description={
                        <p>
                            CSE 12
                            <br />
                            Geisel Library
                        </p>
                    }
                />
                <Col xs={24}> 
                    <Rate readOnly defaultValue={3} size="sm" character={<Icon icon="volume-up" style={{ color: 'rgba(0, 106, 150, 0.75)' }} />} /> 
                </Col>
            </Panel>
          </FlexboxGrid.Item>               
        </FlexboxGrid>
        )
    }
}

export default StudyRequests;