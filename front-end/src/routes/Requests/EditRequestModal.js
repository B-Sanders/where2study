//import classes from '*.module.css';
import React, {Component} from 'react';
import ButtonToolbar, { Button, Modal, Grid, Row, Col, Rate, Container, Header,
    Content, Footer, Sidebar, Divider, List, Tooltip, Whisper, Alert, Progress, Form, FormGroup, FormControl,
    ControlLabel, HelpBlock, InputPicker, Input, InputGroup, DatePicker, SelectPicker, AutoComplete, Icon, Schema  } from 'rsuite';
import FlexboxGrid from "rsuite";
import styled from 'styled-components'
import ConfirmDeleteModal from './ConfirmDeleteModal'
import firebase from '../../base';
const max_chars = 100;
const alert_time = 1250
var locations = [];
var classes = [];

const ButtonContainer = styled.div`display: flex; justify-content: space-between;`;

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
            show: false,
            showConfirmModal: false,
            formValue: {
                title: '',
                class: '',
                location: '',
                noise_level: '',
                end_time: new Date(),
                description: '',
              },
              formError: {},
              char_left: max_chars


        };
        this.handleConfirmEdits = this.handleConfirmEdits.bind(this);
        this.handleDeletion = this.handleDeletion.bind(this);
        this.editRequest = this.editRequest.bind(this);
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        

       
        this.user = firebase.auth().currentUser; // Reference to Current User From Auth Database
        this.uid = this.user.uid;  // Current User's Identifier
    }


     getCurrentLocation = () =>{
        var ref = firebase.database().ref("Locations");
        ref.once("value")
        .then(function(snapshot) {
          return snapshot
      });

    }

    getCurrentClasses = () =>{
        var ref = firebase.database().ref("Classes");
        ref.once("value")
        .then(function(snapshot) {
          return snapshot
      });

    }

    getPreviousInformation = () =>{
        var ref = firebase.database().ref("RequestsList/" + this.uid);
       ref.once("value")
         .then(function(snapshot) {
           return snapshot
       });
    }

    componentDidMount(){
        /*this.getCurrentLocation().then(locationsSnapshot=>{
            locationsSnapshot.forEach(function(childSnapshot){
                locations.push({
                    "label" : childSnapshot.key.toString(),
                    "value": childSnapshot.key.toString(),
                    "role": "Master"

                });
            });
        });
        
        this.getCurrentClasses().then(classesSnapshot =>{
            classesSnapshot.forEach(function(childSnapshot){
                classes.push(
                    {
                        "label": childSnapshot.key.toString(),
                        "value": childSnapshot.key.toString(),
                        "role": "Master"
                    }
                );
            });
        });

        this.getPreviousInformation().then(requestSnapshot =>{
            this.setState({
                formValue:{
                 class: requestSnapshot.child("Class").val(),
                 description: requestSnapshot.child("description").val(),
                 location: requestSnapshot.child("location").val(),
                 noise_level: requestSnapshot.child("noiseRating").val(),
                 end_time: requestSnapshot.child("study_end").val()
                  }})
            this.uid = requestSnapshot.key
            
           
        })
        */
        
    }
    
    handleDeletion(){
        this.setState({showConfirmModal: true})
        var adaRef = firebase.database().ref('RequestsList'+ this.uid);
           adaRef.remove()
         .then(function() {
             console.log("Remove succeeded.")
          })
         .catch(function(error) {
            console.log("Remove failed: " + error.message)
        });
        this.close()
    }
    
    
    
    handleConfirmEdits(){
        if( !this.form.check() ){
            Alert.error('Please fix the highlighted fields', alert_time);

        } else {
            // No error occurred handle accordingly
            this.editRequest();
        }
    }

   editRequest = () =>{
    var ref = firebase.database().ref('RequestsList'+ this.uid);
     ref.child('USERID').set(this.uid);
     ref.child('class').set(this.formValue.class);
     ref.child('description').set(this.formValue.description);
     ref.child('location').set(this.formValue.location);
     ref.child('noiseRating').set(this.formValue.noise_level);
     ref.child('study_end').set(this.formValue.study_end);
       
     
     this.close()
   }




    /**
     * Set the state of the modal to stop showing and calls parent component
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

                    {/**
                     * Pop up 'Modal' which informs the user of their potential deletion of their request
                     */}
                    { this.state.showConfirmModal && <ConfirmDeleteModal shouldShow={this.state.showConfirmModal} parentCallBack ={ ()=>{this.setState({ showConfirmModal: false})} } /> }

                        <Modal show={this.open} onHide={this.close}>
                            <Modal.Header>
                                <Modal.Title> <h2>Edit Your Study Request!</h2></Modal.Title>
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
                                <ButtonContainer>
                                    <Whisper placement="top" 
                                            trigger="hover"
                                             speaker={<Tooltip>Do you want to delete to this study request?</Tooltip>} >
                                        <Button 
                                            color="red" 
                                            onClick={this.handleDeletion} 
                                            appearance="primary">
                                            DELETE
                                        </Button>
                                    </Whisper>
                                    <div>
                                        <Whisper placement="top" 
                                                 trigger="hover"
                                                 speaker={<Tooltip>Do you want to confirm edits to this study request?</Tooltip>}>
                                            <Button 
                                                onClick={this.handleConfirmEdits} 
                                                appearance="primary">
                                                CONFIRM EDITS
                                            </Button>
                                        </Whisper>
                                        <Button 
                                                onClick={this.close} 
                                                appearance="subtle">
                                            Cancel
                                        </Button>
                                    </div>
                                </ButtonContainer>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            </>
        )
    }
};

export default Home;