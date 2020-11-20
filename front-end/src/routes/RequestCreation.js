import React from 'react'
import {
    Form,
    FormGroup,
    FormControl,
    ControlLabel,
    FlexboxGrid,
    ButtonToolbar,
    HelpBlock,
    Slider,
    InputNumber,
    InputPicker,
    Input,
    Schema,
    Alert,
    Row
} from 'rsuite';
import { DatePicker } from 'rsuite';
import { Col } from 'rsuite'
import { Button } from 'rsuite'
import { Panel, PanelGroup } from 'rsuite';
import { Rate } from 'rsuite';
import logo from '../images/where2study.png'
import { Icon } from 'rsuite';

const{ StringType, NumberType, DateType } = Schema.Types;

const model = Schema.Model({
    class: StringType().isRequired('This field is required'),
    study_start: DateType().isRequired('Please enter a valid start time'),
    study_end: DateType()
        .addRule((value, data) => {
            if( value < data.study_start ){
                return false;
            }

            return true;
        }, 'Study End must be later than Study Start' )
        .isRequired('Please enter a valid end time'),
      
    location: StringType().isRequired('This field is required'),
    noise_level: NumberType().isRequired('This field is required'),
    study_partners: NumberType()
    .isRequired('This field is required')
    .range(
        0,
        10,
        'Please input a number from 0 to 10'
    ),
    collab_level: StringType().isRequired('This field is required'),
    description: StringType().maxLength(100, '100 Characters Max' )
});

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
const max_chars = 100;
const alert_time = 1250;

class RequestCreation extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            formValue: {
                class: '',
                study_start: new Date(),
                study_end: new Date(),
                location: '',
                noise_level: '',    // Number
                study_partners: '', // Number
                collab_level: '',
                description: '',
            },
            formError: {},
            chars_left: max_chars
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleCancel(){

    }

    handleSubmit(){
        const{ formValue } = this.state;
        if( !this.form.check()){
           Alert.error('Please fix the highlighted fields', alert_time);
        } else {
        // No error occurred handle accordingly
        Alert.success('Request Submitted Successfully')
        }
    }
 
    createNewRequest(){

    }

    render() {
        const{ formError, formValue } = this.state;
        const max_chars = 100;
        const handleChange = value => {
            this.state.formValue.noise_level = value
        };
        return(
            <div className="show-requestCreation">
                <h1 align="center">Create a New Request</h1>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <img align="" src={logo} height={300} width={300} />
                </div>
                <FlexboxGrid justify="center">
                    <FlexboxGrid.Item>

                            <Col>
                                <Panel shaded>
                                <Form
                                    ref={ref => (this.form = ref)}
                                    onChange={formValue => {
                                        this.setState({ formValue });
                                    }}
                                    onCheck={formError => {
                                        this.setState({ formError });
                                    }}
                                    formValue={formValue}
                                    model={model}
                                    layout="vertical"
                                >
                                    <Form layout="inline">
                                        <FormGroup>
                                            <ControlLabel>Class</ControlLabel>
                                            <FormControl name="class" type="class" placeholder="CSE110"/>
                                        </FormGroup>

                                        <FormGroup>
                                            <ControlLabel>Location</ControlLabel>
                                            <FormControl name="location" type="location" placeholder="CS Dungeon" />
                                        </FormGroup>
                                    </Form>
                                    <FlexboxGrid justify="start" align="middle">
                                        <FlexboxGrid.Item>
                                            <Form layout="inline">
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
                                            </Form>
                                        </FlexboxGrid.Item>
                                        <FlexboxGrid.Item>
                                            <div style={{width: 55}} >
                                            </div>
                                        </FlexboxGrid.Item>
                                        <FlexboxGrid.Item>
                                            <span>Noise Level</span>
                                            <div>
                                                <Rate
                                                    defaultValue={1}
                                                    horizontal
                                                    character={<Icon icon="speaker"/>}
                                                    color="blue"
                                                />
                                            </div>
                                        </FlexboxGrid.Item>
                                    </FlexboxGrid>
                                    <Form layout="inline">
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
                                    </Form>
                                        <FormGroup>
                                    <ControlLabel>Description  (Characters Remaining: { max_chars - this.state.formValue.description.length })</ControlLabel>
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
                                            <Button onClick={this.handleSubmit} appearance="primary" disabled={this.state.formValue.description.length > max_chars ?"true":""}> Create </Button>
                                            <Button onClick={this.handleCancel}appearance="default" color="red"> Cancel </Button>
                                        </ButtonToolbar>
                                    </FormGroup>
                                </Form>
                                </Panel>
                            </Col>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </div>
        );
    }
}

export default RequestCreation