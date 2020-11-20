import React, {Component} from 'react';
import ButtonToolbar, { Button, Modal, Grid, Row, Col, Rate, Container, Header,
    Content, Footer, Sidebar, Divider, List, Tooltip, Whisper, Alert, Progress, Form, FormGroup, FormControl,
    ControlLabel, HelpBlock, InputPicker, Input, InputGroup, DatePicker, SelectPicker, AutoComplete, Icon  } from 'rsuite';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
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
    close() {
        this.setState({ show: false });
    }
    open() {
        this.setState({ show: true });
    }

    render(){
        return (
            <>
                <h1>Where2Study</h1>
                <div className="centered">
                    <div className="modal-container">
                        <Button onClick={this.open}> View Request Creator! </Button>
                        <Modal show={this.state.show} onHide={this.close}>
                            <Modal.Header>
                                <Modal.Title> <h2>Create a Study Request!</h2></Modal.Title>
                            </Modal.Header>
                            {/* This doesn't have everything actually implemented, it's just for the style really.
                            Pretty much everything here is just for style really. For the most part implementation
                            would just require replacing the variables and connecting them to the database, as well
                            as implementing the modal itself into the website, as opposed to just being a single
                            button on a page.*/}
                            <Modal.Body>
                                <Grid fluid>
                                    <Row>
                                        <h5>Enter a Descriptive Title:</h5>
                                        <Col xs={10}> <Input style={{ width: 224 }} placeholder="Enter title here!" /> </Col>
                                    </Row>
                                    <Row><Divider></Divider></Row>
                                    <Row className="show-grid">
                                        <h5>Select a Class:</h5>
                                        <SelectPicker data={this.classes} style={{ width: 224 }} preventOverflow />
                                    </Row>
                                    <Row><Divider></Divider></Row>
                                    <Row className="show-grid">
                                        <h5>Select a Study Location:</h5>
                                        <SelectPicker data={this.locations} style={{ width: 224 }} preventOverflow />
                                    </Row>
                                    <Row><Divider></Divider></Row>
                                    <Row className="show-grid">
                                        <h5>Rate Your Study Location's Noise Level:</h5>
                                        <Rate defaultValue={3} size="sm" renderCharacter={this.renderCharacter} />
                                    </Row>
                                    <Row><Divider></Divider></Row>
                                    <Row className="show-grid">
                                        <h5>Enter Your Estimated End Time</h5>
                                        <DatePicker format="hh:mm A" showMeridian ranges={[]} />
                                    </Row>
                                    <Row><Divider></Divider></Row>
                                    <Row className="show-grid">
                                        <h5>Enter a description to help your classmates find you:</h5>
                                        <Input componentClass="textarea" rows={3} size="lg" placeholder="Describe your surroundings or some identifying feature!" />
                                    </Row>
                                </Grid>
                            </Modal.Body>
                            <Modal.Footer>
                                <Whisper placement="top" trigger="hover" speaker={<Tooltip>Do you want to join this study group?</Tooltip>}>
                                    <Button onClick={this.close} appearance="primary">
                                        CREATE REQUEST
                                    </Button>
                                </Whisper>
                                <Button onClick={this.close} appearance="subtle">
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