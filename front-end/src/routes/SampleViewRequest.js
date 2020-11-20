import React, {Component} from 'react';
import ButtonToolbar, { Button, Modal, Grid, Row, Col, Rate, Container, Header,
    Content, Footer, Sidebar, Divider, List, Tooltip, Whisper, Alert, Progress } from 'rsuite';


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        };
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        this.studyPartners = ['Nicholas Weaver', 'Andre Lopez', 'Rigo Caretto', 'Brian Sanders', 'Gary Gillespie'];
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
                    {/*For having the modal not take too long, we have only 1 modal object
                    and when we click on a specific request, it will just swap the current request
                    to what they just clicked on and it will fill the modal with that request's info.
                    Maybe a little redundant to comment this implementation but oh well just a reminder.*/}
                    <div className="modal-container">
                        <Button onClick={this.open}> View Sample Request! </Button>
                        <Modal show={this.state.show} onHide={this.close}>
                            <Modal.Header>
                                <Modal.Title> <h2> Studying for CSE101 Midterm 2!</h2></Modal.Title>
                                <h6>Request from Nicholas Weaver</h6>
                            </Modal.Header>
                            <Modal.Body>
                                <Grid fluid>
                                    <Row className="show-grid">
                                        <h3>CSE101</h3>
                                    </Row>
                                    <Row className="show-grid">
                                        <Col xs={10}> <h5>Price Center</h5> </Col>
                                        <Col xs={4}> </Col>
                                        <Col xs={10}> <h5>Studying Times</h5> </Col>
                                    </Row>
                                    <Row className="show-grid">
                                        <Col xs={10}><Rate defaultValue={3.5} size="xs" allowHalf  /></Col>
                                        <Col xs={4}> </Col>
                                        <Col xs={10}> 12:00am - 5:00pm </Col>
                                    </Row>
                                    <Row className="show-grid">
                                        <Divider><h6>Description</h6></Divider>
                                    </Row>
                                    <Row className="show-grid">
                                        <label>Hi I'm studying for the CSE101 Midterm, I'm nearby Subway and wearing a blue jacket!</label>
                                    </Row>
                                    <Row className="show-grid">
                                        <Divider><h6>Current Study Partners</h6></Divider>
                                    </Row>
                                    <Row classname="show-grid">
                                        <List bordered hover>
                                            {this.studyPartners.map((item, index) => (
                                                <List.Item key={index} index={index}>
                                                    {item}
                                                </List.Item>
                                            ))}
                                        </List>
                                    </Row>
                                </Grid>
                            </Modal.Body>
                            <Modal.Footer>
                                <Whisper placement="top" trigger="hover" speaker={<Tooltip>Do you want to join this study group?</Tooltip>}>
                                    <Button onClick={this.close} appearance="primary">
                                        ACCEPT
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