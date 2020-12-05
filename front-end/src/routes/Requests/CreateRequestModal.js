import React, { Component } from "react";
import ButtonToolbar, {
  Button,
  Modal,
  Grid,
  Row,
  Col,
  Rate,
  Container,
  Header,
  Content,
  Footer,
  Sidebar,
  Divider,
  List,
  Tooltip,
  Whisper,
  Alert,
  Progress,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
  InputPicker,
  Input,
  InputGroup,
  DatePicker,
  SelectPicker,
  AutoComplete,
  Icon,
} from "rsuite";

//import speaker from '../images/speaker.svg';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      create: false,
    };
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);

    this.studyPartners = [
      "Nicholas Weaver",
      "Andre Lopez",
      "Rigo Caretto",
      "Brian Sanders",
      "Gary Gillespie",
    ];
    this.classes = [
      {
        label: "CSE 110",
        value: "CSE 110",
        role: "Master",
      },
      {
        label: "CSE 12",
        value: "CSE 12",
        role: "Master",
      },
      {
        label: "CSE 15L",
        value: "CSE 15L",
        role: "Master",
      },
    ];

    this.locations = [
      {
        label: "Price Center",
        value: "Price Center",
        role: "Master",
      },
      {
        label: "Geisel 1st Floor",
        value: "Geisel 1st Floor",
        role: "Master",
      },
      {
        label: "Geisel 2nd Floor",
        value: "Geisel 2nd Floor",
        role: "Master",
      },
    ];
    this.renderCharacter = (value, index) => {
      return <Icon icon="speaker" style={{ color: "#ff9800" }} />;
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
    this.setState({ show: this.props.shouldShow }); // Setting it to the prop passed in by tha parent component
  }

  render() {
    return (
      <>
        <div className="centered">
          <div className="modal-container">
            <Modal
              show={this.open}
              onHide={this.close}
              style={{
                paddingTop: "50px",
              }}
            >
              <Modal.Header>
                <Modal.Title>
                  {" "}
                  <h2>Create a Study Request!</h2>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Grid fluid>
                  <Row>
                    <h5>Enter a Descriptive Title:</h5>
                    <Col xs={10}>
                      {" "}
                      <Input
                        style={{ width: 224 }}
                        placeholder="Enter title here!"
                      />{" "}
                    </Col>
                  </Row>
                  <Row>
                    <Divider></Divider>
                  </Row>
                  <Row className="show-grid">
                    <h5>Select a Class:</h5>
                    <SelectPicker
                      data={this.classes}
                      style={{ width: 224 }}
                      preventOverflow
                    />
                  </Row>
                  <Row>
                    <Divider></Divider>
                  </Row>
                  <Row className="show-grid">
                    <h5>Select a Study Location:</h5>
                    <SelectPicker
                      data={this.locations}
                      style={{ width: 224 }}
                      preventOverflow
                    />
                  </Row>
                  <Row>
                    <Divider></Divider>
                  </Row>
                  <Row className="show-grid">
                    <h5>Rate Your Study Location's Noise Level:</h5>
                    <Col xs={10}>
                      {" "}
                      <Rate
                        defaultValue={1}
                        max={5}
                        size="sm"
                        character={
                          <Icon
                            icon="volume-up"
                            style={{ color: "rgba(0, 106, 150, 0.75)" }}
                          />
                        }
                      />{" "}
                    </Col>
                  </Row>
                  <Row>
                    <Divider></Divider>
                  </Row>
                  <Row className="show-grid">
                    <h5>Enter Your Estimated End Time</h5>
                    <DatePicker format="hh:mm A" showMeridian ranges={[]} />
                  </Row>
                  <Row>
                    <Divider></Divider>
                  </Row>
                  <Row className="show-grid">
                    <h5>
                      Enter a description to help your classmates find you:
                    </h5>
                    <Input
                      componentClass="textarea"
                      rows={3}
                      size="lg"
                      placeholder="Describe your surroundings or some identifying feature!"
                    />
                  </Row>
                </Grid>
              </Modal.Body>

              <Modal.Footer>
                <Whisper
                  placement="top"
                  trigger="hover"
                  speaker={
                    <Tooltip>
                      Are you sure you want to create this study request?
                    </Tooltip>
                  }
                >
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
    );
  }
}

export default Home;
