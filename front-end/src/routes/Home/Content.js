import { Grid, Row, Col, FlexboxGrid } from 'rsuite';
import React, { Component } from 'react';
import {Container, Header, Content, InputGroup, Input, Icon} from 'rsuite';
import { Form, FormGroup, FormControl, ControlLabel, Panel, ButtonToolbar, Button, Progress, Rate,SelectPicker} from 'rsuite';
import cseBuilding from "../../images/cse-building.jpeg"

// Note will need to implement Unit 4 in order to adjust to changes in DB
const styles = {
    width: 300,
    marginBottom: 10
};
const locationData = [
   {
    "label": "Geisel",
    "value": "Geisel"
  },
  {
    "label": "Price Center",
    "value": "Price Center"
  }
]

const classData = [
  {
    "label": "CSE 12",
    "value": "CSE 12"
  },
  {
    "label": "CSE 110",
    "value": "CSE 110"
  }
]

const ratingData = [
  {
    "label": "1 star",
    "value": "1 star"
  },
  {
    "label": "2 stars",
    "value": "2 stars"

  }
]
const { Line } = Progress;
const { Circle } = Progress;
const circleStyle = {
  width: 120,
  display: 'inline-block',
  marginRight: 10
};
class Home extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className="show-grid">
              <FlexboxGrid justify="center">
                <FlexboxGrid.Item colspan="6">
                  <SelectPicker
                    data={locationData}
                    appearance="default"
                    placeholder="Filter by Location"
                  />
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan="6">
                  <SelectPicker
                    data={classData}
                    appearance="default"
                    placeholder="Filter by Class"
                  />
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan="6">
                  <div>
                    <h6>Filter by Rating</h6>
                    <Rate defaultValue={0} size="xs" />
                  </div>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan="6">
                  <Input style={{ width: 300 }} placeholder="Search by Estimated End Time" />
                </FlexboxGrid.Item>
              <FlexboxGrid/>
              <Content>
                <FlexboxGrid justify="center">
                  <FlexboxGrid.Item colspan={6} justify="center">
                    <Panel header="John Doe" shaded>
                      <img src={cseBuilding} style={{height: '100px', width: '100px'}}/>
                      <Row fluid>
                        <Rate defaultValue={3} size="xs" 
                          disabled
                          character= {<Icon icon="volume-up" style={{ color: 'rgba(0, 106, 150, 0.75)' }} />} 
                        /> 
                        <h5>Studying for final</h5>
                        <h5>CSE 12</h5>
                        <h5>CSE Building</h5>
                      </Row>
                    </Panel>
                  </FlexboxGrid.Item>
                  <FlexboxGrid.Item colspan={6}>
                    <Panel header="John Doe" shaded>
                      <Row fluid>
                        <Rate defaultValue={3} size="xs" 
                          disabled
                          character= {<Icon icon="volume-up" style={{ color: 'rgba(0, 106, 150, 0.75)' }} />} 
                        /> 
                        <h5>Studying for final</h5>
                        <h5>CSE 12</h5>
                        <h5>CSE Building</h5>
                      </Row>
                    </Panel>
                  </FlexboxGrid.Item>
                </FlexboxGrid>
              </Content>
            </FlexboxGrid>
            </div>
        )
      }
};

export default Home;