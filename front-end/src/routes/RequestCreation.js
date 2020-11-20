import React from 'react'
import { Form, FormGroup, FormControl, ControlLabel, FlexboxGrid, ButtonToolbar, HelpBlock, Slider, InputNumber, InputPicker, Input, Schema, Alert } from 'rsuite';
import { DatePicker } from 'rsuite';
import { Col } from 'rsuite'
import { Button } from 'rsuite'
import db from '../base'
import logo from '../images/where2study.png'

const{ StringType, NumberType, DateType } = Schema.Types;

const model = Schema.Model({
    class: StringType().isRequired('This field is required'),
    study_start: DateType().isRequired('Please enter a valid start time'),
    study_end: DateType()
        /*.addRule((value, data) => {
            if( Math.abs(value) < Math.abs(data.study_start) ){
                return false;
            }

            return true;
        }, 'Study End must be later than Study Start' )*/
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
                noise_level: '',    
                study_partners: '', 
                collab_level: '',
                description: '',
            },
            formError: {},
            chars_left: max_chars
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.createNewRequest = this.createNewRequest.bind(this);
    }

    /**
     * The user no longer wishes to create the request 
     * return them to the previous page they were on.
     */
    handleCancel(){
        this.props.history.goBack();
    }

    /**
     * Once the user has submitted the form validate it against the
     * datbase schema model. If no errors create the request.
     */
    handleSubmit(){
        if( !this.form.check()){
            Alert.error('Please fix the highlighted fields', alert_time);
        } else {
            // No error occurred handle accordingly
            this.createNewRequest();
        }
    }
 
    /**
     * Format the current state of the User's form request and POST to the 
     * Firebase Database 
     */
    async createNewRequest(){
        var database = db.database();
        
        /**
         * Calculate the time in minutes between the study dates.
         */
        var studyLength = this.state.formValue.study_end.getTime() - this.state.formValue.study_start.getTime();
        studyLength = (studyLength / 1000) / 60;

        /**
         * Create new request Object for POST call making sure to convert
         * 'study_start' and 'study_end' from Date datatype to 
         * appropriate string data type for storage
         */
        const newRequest = {
            class: this.state.formValue.class,
            study_start: this.state.formValue.study_start.toUTCString(),
            study_end: this.state.formValue.study_end.toUTCString(),
            study_length: studyLength,
            location: this.state.formValue.location,
            noise_level: this.state.formValue.noise_level,
            study_partners: this.state.formValue.study_partners,
            collab_level: this.state.formValue.collab_level,
            description: this.state.formValue.description
        }

        /**
         * API Call to database to POST new request ( sychronously )
         */
        var ref = await database.ref('Requests/' + 'userId2' ).set( newRequest, 
            function( error ){
                if( error ){
                   Alert.error( 'Failed to Create Request please try again', alert_time );
                } else {
                   Alert.success( 'Request Submitted Successfully', alert_time );
                }
            });

        /**
         * If the request succeeded we should have a non-null reference to it.
         * Then, route them back to page they were before
         */
        if( ref !== null ){ this.props.history.goBack(); }       
    }

    render() {
        const{ formError, formValue } = this.state;
        const max_chars = 100;
        return(
            <div className="show-requestCreation">
                <FlexboxGrid colSpan={50} justify="center">
                    <FlexboxGrid.Item>
                        <Col>
                            <h1 align="center">Create a New Request</h1>
                            <img src={logo} height={300} width={300} />
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
                                        <Button onClick={this.handleSubmit} appearance="primary"> Create </Button>
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