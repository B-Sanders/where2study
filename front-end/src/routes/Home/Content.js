import { Grid, Row, Col, FlexboxGrid } from 'rsuite';
import React, { Component } from 'react';
import {Container, Header, Content, InputGroup, Input, Icon,} from 'rsuite';
import { Form, FormGroup, FormControl, ControlLabel, Panel, ButtonToolbar, Button, Progress, Rate,SelectPicker} from 'rsuite';
import logo from "../../images/where2study.png"
import SearchBar from "./SearchBar";
import StudyRequests from "./StudyRequests";

// Note will need to implement Unit 4 in order to adjust to changes in DB
const styles = {
    width: 300,
    marginBottom: 10
};

const inputStyles = { 
  width: 224, display: 'block', marginBottom: 10 
};

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
          <div>
            <Header>
              <FlexboxGrid justify="center">
                <FlexboxGrid.Item>
                  <img src={logo} height="250" width="300" href="/"/>
                </FlexboxGrid.Item>
              </FlexboxGrid>
            </Header>
            <Content>
              <SearchBar />
              <StudyRequests />
            </Content>
          </div>
        )
    }
};

export default Home;