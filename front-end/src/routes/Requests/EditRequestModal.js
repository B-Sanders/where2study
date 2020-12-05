import  React, { Component } from 'react';
import {
    Button, 
    Modal, 
    Grid, 
    Row, 
    Rate, 
    Divider, 
    Tooltip, 
    Whisper, 
    Alert, 
    Form, 
    FormGroup, 
    FormControl,
    ControlLabel, 
    Input, 
    DatePicker, 
    SelectPicker, 
    Icon, 
    Schema, 
    InputNumber } 
from 'rsuite';

/**
 * Fill SelectPickers
 */
import courses from "../courses.json";  
import locations from "../locations.json";
import { DataContext } from "../../state/context.js"; 

const max_chars = 100;
const alert_time = 1250;

/*const cancelButton = styled(Button)`
  .rs-btn-primary.rs-btn-yellow {
    color: #fff;
    background-color: #ffca28;
    border: 5px solid #e8e8e8;
  }
`;*/

/**
 * Define Request Schema for use in validating a Users request 
 */
const{ StringType, NumberType, DateType } = Schema.Types;
const model = Schema.Model({
    title: StringType().isRequired('This field is required'),
    class: StringType().isRequired('This field is required'),
    location: StringType().isRequired('This field is required'),
    noise_level: NumberType().isRequired('This field is required'),
    end_time: DateType().isRequired('This field is required'),
    max_partners: NumberType().isRequired('This field is required'),
    description: StringType()
        .maxLength(max_chars, '100 Characters Max' )
        .isRequired('This field is required')
});

class EditRequest extends React.Component {
    constructor(props, context) {
        super(props, context);
        /**
         * TODO:: Avoid Hard Coding Values for requestkey ?  
         */

        /**
         * Reconvert from HH:MM format to Date Type for DatePicker
         */
        let time = new String( this.context.state.requests.vWyBNUhcqZTLrEE6iW9vx2qvCeD2.study_end );
        let hour = time.substring(0,2);
        let minutes = time.substring(3,5);

    
        let requestKey = this.context.state.user.uuid;

        this.state = {
            formValue: {
                title: this.context.state.requests.vWyBNUhcqZTLrEE6iW9vx2qvCeD2.request_title,
                class: this.context.state.requests.vWyBNUhcqZTLrEE6iW9vx2qvCeD2.class,
                location: this.context.state.requests.vWyBNUhcqZTLrEE6iW9vx2qvCeD2.location,
                noise_level: this.context.state.requests.vWyBNUhcqZTLrEE6iW9vx2qvCeD2.noise_rating,
                end_time: new Date(null, null, null, hour , minutes),
                description: this.context.state.requests.vWyBNUhcqZTLrEE6iW9vx2qvCeD2.description,
                max_partners: parseInt(this.context.state.requests.vWyBNUhcqZTLrEE6iW9vx2qvCeD2.max_partners),          
                study_start:  this.context.state.requests.vWyBNUhcqZTLrEE6iW9vx2qvCeD2.study_start
            },
            formError: {},
            chars_left: max_chars,

            show: false,
            create: false
        };


        this.handleSubmit = this.handleSubmit.bind(this);
        this.createNewRequest = this.createNewRequest.bind(this);
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
 
    }

  
    /**
     * Once the user has submitted the form validate it against the
     * database schema model. If no errors proceed to create the request.
     */
    handleSubmit(){
        if( !this.form.check() ){
            Alert.error('Please fix the highlighted fields', alert_time);

        } else {
            // No error occurred handle accordingly
            this.createNewRequest();
        }
    }

    /**
     * CREATE   Format the current state of the User's form request and POST to the 
     *          Realtime Database 
     */
    createNewRequest = () =>{
        // Convert Dates to correct format for storage
        let newStudyEnd = this.state.formValue.end_time;
        newStudyEnd = new String(  newStudyEnd.toISOString().substring(11,16) );


        let config = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: this.context.state.user.uuid,
                title: this.state.formValue.title,
                reqClass: this.state.formValue.class,
                desc: this.state.formValue.description,
                location: this.state.formValue.location,
                maxPartners: this.state.formValue.max_partners,
                noiseRating: this.state.formValue.noise_level,
                studyEnd: newStudyEnd 
            })
        }
            
        // TODO: POST CALL 
        fetch('http://localhost:1337/requests/edit-request', config)
            .then( 
                 this.close()
            )
            .catch(error => console.log(error)); 
    }

    

     /**
     * Set the state of the modal to stop showing and call parent component
     */
    close() {
        this.setState({ show: false });

        /**
         * CALLS the parent component to tell it to stop rendering me
         */
        this.props.parentCallBack();

    }

    /**
     * CALLS the parent component to tell it to stop rendering me
     */
    open() {
        this.setState({show: this.props.shouldShow});   // Setting it to the prop passed in by tha parent component
    }

    render(){
        const { formValue } = this.state;
       
        return (
            <>
                <div className="centered">
                    <div className="modal-container">
                        <Modal show={this.open} onHide={this.close}>
                            <Modal.Header>
                                <Modal.Title> <h2>Edit a Study Request!</h2></Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <Grid fluid>
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
                                <Row xs={10} className="show-grid"> 
                                    <FormGroup>
                                        <h5>Enter a Descriptive Title:</h5>
                                        
                                            <FormControl 
                                                accepter={Input}
                                                name="title" 
                                                type ="title" 
                                                style={{ width: 224 }} 
                                                preventOverflow 
                                                placeholder="Enter title here!"
                                            />
                                        </FormGroup>
                                </Row> 

                                <Row><Divider></Divider></Row> 

                                <Row xs={10} className="show-grid"> 
                                    <FormGroup>
                                        <h5>Select a Class:</h5>
                                            <FormControl 
                                                accepter={SelectPicker}
                                                name="class"
                                                type="class"
                                                data={courses}
                                                style={{ width: 224 }}
                                                preventOverflow
                                            />
                                    </FormGroup>
                                </Row> 

                                <Row><Divider></Divider></Row> 

                                <Row xs={10} className="show-grid"> 
                                    <FormGroup>
                                        <h5>Number of Partners:</h5>
                                            <FormControl 
                                                accepter={InputNumber}
                                                min={1}
                                                name="max_partners"
                                                label="max_partners"
                                                style={{ width: 224 }}
                                            />
                                    </FormGroup>
                                </Row> 

                                <Row><Divider></Divider></Row> 

                                <Row xs={10} className="show-grid"> 
                                    <FormGroup>
                                        <h5>Select a Study Location:</h5> 
                                            <FormControl 
                                                accepter={SelectPicker}
                                                name="location"
                                                type="location"
                                                data={locations}
                                                style={{ width: 224 }}
                                                preventOverflow 
                                            />
                                    </FormGroup>
                                </Row> 

                                <Row><Divider></Divider></Row> 

                                <Row xs={10} className="show-grid"> 
                                    <FormGroup>
                                        <h5>Rate Your Study Location's Noise Level:</h5>
                                            <FormControl 
                                                accepter={Rate}
                                                name="noise_level"
                                                type="noise_level"
                                                max={5}
                                                size="sm"
                                                character={<Icon icon="volume-up" style={{ color: 'rgba(0, 106, 150, 0.75)' }} />}
                                            />
                                    </FormGroup>
                                </Row> 

                                <Row><Divider></Divider></Row> 

                                <Row xs={10} className="show-grid"> 
                                    <FormGroup>
                                        <h5>Enter Your Estimated End Time</h5> 
                                            <FormControl
                                                accepter={DatePicker}
                                                name="end_time"
                                                type="end_time"
                                                format="hh:mm A"
                                                showMeridian ranges={[]}
                                            />
                                    </FormGroup>
                                </Row> 

                                <Row><Divider></Divider></Row> 
                                    
                                <Row className="show-grid"> 
                                    <FormGroup>
                                        <h5>Enter a description to help your classmates find you:</h5>
                                            <ControlLabel>Characters Remaining: { max_chars - this.state.formValue.description.length } </ControlLabel>
                                            <FormControl
                                                accepter={Input}
                                                componentClass="textarea"
                                                name="description"
                                                type="description"
                                                rows={3}
                                                style={ {width: 600 } }
                                                size="lg"
                                                placeholder= "Describe your surroundings or some identifying feature!"
                                            />
                                        </FormGroup>
                                 </Row> 
                        
                                </Form>
                                </Grid>
                            </Modal.Body>

                            <Modal.Footer>
                                <Whisper 
                                    placement="top" 
                                    trigger="hover" 
                                    speaker={<Tooltip>Do you want to edit this request?</Tooltip>}>
                                    <Button onClick={this.handleSubmit} appearance="primary">
                                        EDIT REQUEST
                                    </Button>
                                </Whisper>
                                <Button 
                                    onClick={this.close} 
                                    appearance="subtle">
                                    Cancel
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            </>
        )
    }
};
EditRequest.contextType = DataContext;
export default EditRequest;
