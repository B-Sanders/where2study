import  React, { Component } from 'react';
import {Button, Modal, Grid, Row, Rate, Divider, Tooltip, Whisper, Alert, Form, FormGroup, FormControl,
    ControlLabel, Input, DatePicker, SelectPicker, Icon, Schema } from 'rsuite';
import db from '../../base';
const max_chars = 100;
const alert_time = 1250;
var locations = [];
var classes = [];


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
    description: StringType()
        .maxLength(max_chars, '100 Characters Max' )
        .isRequired('This field is required')
});

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formValue: {
                title: '',
                class: '',
                location: '',
                noise_level: 1,
                end_time: new Date(),
                description: '',
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
 
        this.user = db.auth().currentUser;             // Reference to Current User from Authentication Database
        this.uid = this.user.uid;                     // Current User's Identifier
    }

    /**
     * READ     locations from Database
     */
    getCurrentLocations = () =>{
        // TODO return a snapshot
        return null;
    }

    /**
     * READ     classes from Database
     */
    getCurrentClasses = () =>{
        // TODO return a snapshot
        return null;
    }

    componentDidMount(){
       /*this.getCurrentLocations();
            .then( locationsSnapshot=>{ 
                locationsSnapshot.forEach(function(childSnapshot) {
                    // Push each location into an array which the SelectPicker will use
                    locations.push( 
                        { "label": childSnapshot.key.toString(), 
                          "value": childSnapshot.key.toString(), 
                          "role": "Master" 
                }); 
            });
        });*/

        /*this.getCurrentClasses()
        .then( classesSnapshot=>{ 
            classesSnapshot.forEach(function(childSnapshot) {
                // Push each class into an array which the SelectPicker will use
                classes.push( 
                    { "label": childSnapshot.key.toString(), 
                      "value": childSnapshot.key.toString(), 
                      "role": "Master" 
                }); 
            });
        }); */
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
       
        /**
         * Create new request Object for POST call making sure to convert
         * 'end_time' Date datatype to 
         * appropriate string data type for storage
         */
        const newRequest = {
            USERID: this.uid,
            title: this.state.formValue.title,
            class: this.state.formValue.class,
            end_time: this.state.formValue.end_time.toUTCString(),
            location: this.state.formValue.location,
            noise_level: this.state.formValue.noise_level,
            description: this.state.formValue.description
        }

        // TODO: POST CALL passing in newRequest


        // Assuming No error close the Modal
        this.close()
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
     * Set the state of the modal to start showing
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
                                <Modal.Title> <h2>Create a Study Request!</h2></Modal.Title>
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
                                                data={this.classes}
                                                style={{ width: 224 }}
                                                preventOverflow
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
                                                defaultValue={1}
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
                                    speaker={<Tooltip>Do you want to join this study group?</Tooltip>}>
                                    <Button onClick={this.handleSubmit} appearance="primary">
                                        CREATE REQUEST
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

export default Home;