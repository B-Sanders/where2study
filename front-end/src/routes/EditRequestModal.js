import React, {Component} from 'react';
import ButtonToolbar, { Button, Modal, Grid, Row, Col, Rate, Container, Header,
    Content, Footer, Sidebar, Divider, List, Tooltip, Whisper, Alert, Progress, Form, FormGroup, FormControl,
    ControlLabel, HelpBlock, InputPicker, Input, InputGroup, DatePicker, SelectPicker, AutoComplete, Icon  } from 'rsuite';
import FlexboxGrid from "rsuite";
import styled from 'styled-components'

import ConfirmDeleteModal from './ConfirmDeleteModal'

const ButtonContainer = styled.div`display: flex; justify-content: space-between;`;


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            showConfirmModal: false
        };
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        this.studyPartners = ['Nicholas Weaver', 'Andre Lopez', 'Rigo Caretto', 'Brian Sanders', 'Gary Gillespie'];
        this.classes = [
            {
                "label": "CSE 110",
                "value": "CSE 110",
                "role": "Master"
            },
            {
                "label": "CSE 12",
                "value": "CSE 12",
                "role": "Master"
            },
            {
                "label": "CSE 15L",
                "value": "CSE 15L",
                "role": "Master"
            }];

        this.locations= [
            {
                "label": "Price Center",
                "value": "Price Center",
                "role": "Master"
            },
            {
                "label": "Geisel 1st Floor",
                "value": "Geisel 1st Floor",
                "role": "Master"
            },
            {
                "label": "Geisel 2nd Floor",
                "value": "Geisel 2nd Floor",
                "role": "Master"
            }];



        this.renderCharacter = (value, index) => {
            // unselected character
            if (value < index + 1) {
                return <Icon icon="meh-o" />;
            }
            if (value < 3) {
                return <Icon icon="frown-o" style={{ color: '#99A9BF' }} />;
            }
            if (value < 4) {
                return <Icon icon="meh-o" style={{ color: '#F4CA1D' }} />;
            }
            return <Icon icon="smile-o" style={{ color: '#ff9800' }} />;
        };
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
        return (
            <>
                <div className="centered">
                    <div className="modal-container">
                     { this.state.showConfirmModal && <ConfirmDeleteModal shouldShow={this.state.showConfirmModal} parentCallBack ={ ()=>{this.setState({ showConfirmModal: false})} } /> }
                        <Modal show={ this.open } onHide={this.close}>
                            <Modal.Header>
                            <Modal.Title> <h2>Edit Your Study Request!</h2></Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Grid fluid>
                                    <Row>
                                        <h5>Enter a Descriptive Title:</h5>
                                        <Col xs={10}> <Input style={{ width: 224 }} placeholder="Enter title here!"
                                                             defaultValue={'Studying for CSE 110 Midterm'}/> </Col>
                                    </Row>
                                    <Row><Divider></Divider></Row>
                                    <Row className="show-grid">
                                        <h5>Select a Class:</h5>
                                        <SelectPicker data={this.classes} style={{ width: 224 }} preventOverflow
                                                      defaultValue={'CSE 110'}/>
                                    </Row>
                                    <Row><Divider></Divider></Row>
                                    <Row className="show-grid">
                                        <h5>Select a Study Location:</h5>
                                        <SelectPicker data={this.locations} style={{ width: 224 }} preventOverflow
                                                      defaultValue={'Price Center'}/>
                                    </Row>
                                    <Row><Divider></Divider></Row>
                                    <Row className="show-grid">
                                        <h5>Rate Your Study Location's Noise Level:</h5>
                                        <Col xs={10}> <Rate defaultValue={1} max={5} size="sm" character={<Icon icon="volume-up" style={{ color: 'rgba(0, 106, 150, 0.75)' }} />} /> </Col>
                                    </Row>
                                    <Row><Divider></Divider></Row>
                                    <Row className="show-grid">
                                        <h5>Enter Your Estimated End Time</h5>
                                        <DatePicker format="hh:mm A" showMeridian ranges={[]}
                                                    defaultValue={new Date('2017-12-12 16:30:30')} />
                                    </Row>
                                    <Row><Divider></Divider></Row>
                                    <Row className="show-grid">
                                        <h5>Enter a description to help your classmates find you:</h5>
                                        <Input componentClass="textarea" rows={3} size="lg"
                                               placeholder="Describe your surroundings or some identifying feature!"
                                               defaultValue={"I'm near subway wearing a blue jacket!"}/>
                                    </Row>
                                </Grid>
                            </Modal.Body>


                            <Modal.Footer>
                                <ButtonContainer>
                                    <Whisper placement="top" trigger="hover"
                                             speaker={<Tooltip>Do you want to delete to this study request?</Tooltip>}>
                                        <Button color="red" onClick={ ()=>{this.setState({showConfirmModal: true})} } appearance="primary">
                                            DELETE
                                        </Button>
                                    </Whisper>
                                    <div>
                                        <Whisper placement="top" trigger="hover"
                                                 speaker={<Tooltip>Do you want to confirm edits to this study request?</Tooltip>}>
                                            <Button onClick={this.close} appearance="primary">
                                                CONFIRM EDITS
                                            </Button>
                                        </Whisper>
                                        <Button onClick={this.close} appearance="subtle">
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