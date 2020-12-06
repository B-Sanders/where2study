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
  Icon,
} from "rsuite";

import { DataContext } from "../../state/context.js";
import styled from "styled-components";
import db from "../../base";

const ColorModal = styled(Modal)`
  .rs-modal-content {
    background-color: #006a96;
    color: white;
  }
`;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      create: false,
      showConfirmModal: false,
    };
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.closeConfirm = this.closeConfirm.bind(this);
    this.acceptRequest = this.acceptRequest.bind(this);
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

  closeConfirm() {
    this.setState({ showConfirmModal: false });
  }

  acceptRequest() {
    // TODO: Insert Accept function

    this.setState({ show: false });
    this.props.parentCallBack();
  }

  render() {
    var sReq = this.props.studyRequest;

    var partnersList = [];
    Object.keys(sReq.study_partners).forEach((key) =>
      partnersList.push(sReq.study_partners[key])
    );

    return (
      <div className="centered">
        <div className="modal-container">
          <Modal
            show={this.open}
            onHide={this.close}
            style={{
              paddingLeft: "125px",
              paddingTop: "100px",
            }}
          >
            <Modal.Header>
              <Modal.Title>
                {" "}
                <h2>{sReq.request_title}</h2>
              </Modal.Title>
              <h6>Request from {partnersList[0]}</h6>
            </Modal.Header>
            <Modal.Body>
              <Grid fluid>
                <Row className="show-grid">
                  <h3>{sReq.class}</h3>
                </Row>
                <Row className="show-grid">
                  <Col xs={10}>
                    {" "}
                    <h5>{sReq.location}</h5>{" "}
                  </Col>
                  <Col xs={4}> </Col>
                  <Col xs={10}>
                    {" "}
                    <h5>Studying Times</h5>{" "}
                  </Col>
                </Row>
                <Row className="show-grid">
                  <Col xs={10}>
                    {" "}
                    <Rate
                      defaultValue={sReq.noise_rating}
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
                  <Col xs={4}> </Col>
                  <Col xs={10}>
                    {" "}
                    {sReq.study_start} - {sReq.study_end}{" "}
                  </Col>
                </Row>
                <Row className="show-grid">
                  <Divider>
                    <h6>Description</h6>
                  </Divider>
                </Row>
                <Row className="show-grid">
                  <label>{sReq.description}</label>
                </Row>
                <Row className="show-grid">
                  <Divider>
                    <h6>Current Study Partners</h6>
                  </Divider>
                </Row>
                <Row classname="show-grid">
                  <List bordered hover>
                    {partnersList.map((item, index) => (
                      <List.Item key={index} index={index}>
                        {item}
                      </List.Item>
                    ))}
                  </List>
                </Row>
              </Grid>
            </Modal.Body>
            <Modal.Footer>
              <Whisper
                placement="top"
                trigger="hover"
                speaker={
                  <Tooltip>Do you want to join this study group?</Tooltip>
                }
              >
                <Button
                  onClick={() => {
                    this.setState({ showConfirmModal: true });
                  }}
                  appearance="primary"
                >
                  ACCEPT
                </Button>
              </Whisper>
              <Button onClick={this.close} appearance="subtle">
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        <div className="confirm_accept_modal">
          <ColorModal
            backdrop="static"
            show={this.state.showConfirmModal}
            onHide={this.close}
            size="sm"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: "125px",
            }}
          >
            <Modal.Body style={{ fontWeight: "bold" }}>
              Would you like to join this study request?
            </Modal.Body>
            <Modal.Footer>
              <div
                className="centered"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  onClick={this.closeConfirm}
                  appearance="primary"
                  color="yellow"
                >
                  {" "}
                  Cancel
                </Button>
                <Button
                  onClick={this.acceptRequest}
                  appearance="primary"
                  color="green"
                >
                  Accept
                </Button>
              </div>
            </Modal.Footer>
          </ColorModal>
        </div>
      </div>
    );
  }
}

Home.contextType = DataContext;

export default Home;
