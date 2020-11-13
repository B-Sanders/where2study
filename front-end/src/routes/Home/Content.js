import { Grid, Row, Col, FlexboxGrid } from 'rsuite';
import React, { Component } from 'react';
import {Container, Header, Content, InputGroup, Input, Icon} from 'rsuite';
import { Form, FormGroup, FormControl, ControlLabel, Panel, ButtonToolbar, Button, Progress, Rate} from 'rsuite';


// Note will need to implement Unit 4 in order to adjust to changes in DB
const styles = {
    width: 300,
    marginBottom: 10
};

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
            <Container>
                <FlexboxGrid justify="center">
                    <Header>
                        <InputGroup inside style={styles}>
                            <Input placeholder="search by study location"/>
                            <InputGroup.Button >
                                <Icon icon="search"  />
                            </InputGroup.Button>
                        </InputGroup>
                        <InputGroup inside style={styles}>
                            <Input placeholder="search by class"/>
                            <InputGroup.Button >
                                <Icon icon="search"  />
                            </InputGroup.Button>
                        </InputGroup>
                        <InputGroup inside style={styles}>
                            <Input placeholder="search by noise level"/>
                            <InputGroup.Button >
                                <Icon icon="search"  />
                            </InputGroup.Button>
                        </InputGroup>
                    </Header>
                </FlexboxGrid>
                <FlexboxGrid justify="center">
                <Content>
        <FlexboxGrid justify="center">
          <FlexboxGrid.Item colspan={12}>
            <Panel header={<h3>Study Request</h3>} shaded>
              <Form fluid>
                <h3>Name</h3>
                <h3>Class</h3>
                <h3>Location</h3>
                <h3>Noise level</h3>
                <Rate defaultValue={3} color="red" allowHalf disabled />;
                <h3>Duration</h3>
                <div style={circleStyle}>
                    <Circle percent="30" showInfo={false}/>
                </div>
                <h3># of partners</h3>
                <h3>Collaboration level</h3>
                <Rate defaultValue={4.5} color="red" allowHalf disabled />;
                <h3>Description</h3>
                <FormGroup>
                  <ButtonToolbar>
                    <Button appearance="primary">Join (Accept)</Button>
                    <Button appearance="secondary">View more</Button>
                  </ButtonToolbar>
                </FormGroup>
              </Form>
            </Panel>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Content>
                </FlexboxGrid>
          </Container>
        )
    }
};

export default Home;