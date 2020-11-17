import React, { Component } from 'react'
import { Form, FormGroup, FormControl, ControlLabel, FlexboxGrid, ButtonToolbar, HelpBlock, Slider, InputNumber, InputPicker, Input } from 'rsuite';
import { DatePicker } from 'rsuite';
import { Col } from 'rsuite'
import { Button } from 'rsuite'
import db from "../base"
import logo from '../images/where2study.png'

const ranges= [
    {
        label: 'Now',
        value: new Date()
    }
];

const data = [   
    {
        "label" : "High",
        "value" : "High",
    },
    {
        "label" : "Medium",
        "value" : "Medium",
    },
    {
        "label" : "Low",
        "value" : "Low",
    }
]

class RequestCreation extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            formValue: {
                class: '',
                study_start: new Date(),
                study_end: new Date(),
                location: '',
                noise_level: 0,
                study_partners: 0,
                collab_level: '',
                description:'',
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleCancel(){

    }
    
    createNewRequest(){

    }

    handleChange(value){
        this.setState({
            formValue: value
        });
    }

    render() {
        return(
            <div className="show-requestCreation">
                <FlexboxGrid colSpan={50} justify="center">
                    <FlexboxGrid.Item>
                        <Col>
                            <h1 align="center">Create a New Request</h1>
                            <img src={logo} height={300} width={300} />
                            <Form onChange={this.handleChange} formValue={this.state.formValue} layout="vertical">
                                <FormGroup>
                                    <ControlLabel>Class</ControlLabel>
                                    <FormControl name="class" type="class" placeholder="CSE110"/>
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Study Start</ControlLabel>
                                    <FormControl 
                                        accepter={DatePicker} 
                                        format="hh:mm A"
                                        showMeridian ranges={ranges}
                                        name="study_start" 
                                        type="study_start" /> 
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Study End</ControlLabel>
                                    <FormControl 
                                        accepter={DatePicker} 
                                        format="hh:mm A"
                                        showMeridian ranges={ranges}
                                        name="study_end" 
                                        type="study_end" /> 
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Location</ControlLabel>
                                    <FormControl name="location" type="location" placeholder="CS Dungeon" />
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Noise Level</ControlLabel>
                                    <FormControl  
                                        accepter={Slider}
                                        min={0}
                                        max={10}
                                        name="noise_level"
                                        style={{width:224, margin:'10px 0'}}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Study Partners</ControlLabel>
                                    <FormControl 
                                        accepter={InputNumber}
                                        name="study_partners" 
                                        type="study_partners"
                                        defaultValue={0}
                                        min={0}
                                        max={10}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Collaboration Level</ControlLabel>
                                    <FormControl 
                                        accepter={InputPicker}
                                        name="collab_level" 
                                        type="collab_level"
                                        data={data}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Description</ControlLabel>
                                    <FormControl
                                        accepter={Input}
                                        componentClass="textarea"
                                        name="description" 
                                        type="description"
                                        rows={5} 
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <ButtonToolbar>
                                        <Button onClick={this.createNewRequest} appearance="primary"> Create </Button>
                                        <Button onClick={this.handleCancel}appearance="default" color="red"> Cancel </Button>
                                    </ButtonToolbar>
                                </FormGroup>
                            </Form>
                        </Col>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </div>
        );
    }
}

export default RequestCreation