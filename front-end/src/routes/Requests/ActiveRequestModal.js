import React, { Component } from "react";
import ButtonToolbar, {
  Button,
  Modal,
  Grid,
  Row,
  Col,
  Rate,
  Divider,
  List,
  Tooltip,
  Whisper,
  Alert,
  Icon,
} from "rsuite";
import locations from '../locationsMap.json';

import { DataContext } from "../../state/context.js";
import styled from "styled-components";
import db from "../../base";

const ColorModal = styled(Modal)`
  .rs-modal-content {
    background-color: #006a96;
    color: white;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

class Active extends React.Component {
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
      let config = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              partnerId: this.context.state.user.uuid,
              partnerName: this.context.state.user.display_name,
              posterId: this.props.studyRequest.user_id
          })
      };

      fetch('http://localhost:1337/requests/add-partner', config)
          .then(
          ).catch(error => console.log(error));

      this.setState({ show: false });
      this.props.parentCallBack();
      Alert.success(`You succesfully accepted a Study Request!`, 2000);
  }

  render() {
    var sReq = this.props.studyRequest;

    var partnersList = [];
    Object.keys(sReq.study_partners).forEach((key) =>
      partnersList.push(sReq.study_partners[key])
    );
    console.log(this.context);
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
                    <h5>{locations[sReq.location]}</h5>{" "}
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
                      readOnly={true}
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
            <ButtonContainer>
                { this.context.state.user.uuid === this.props.studyOwner ? 
                    <div>
                    </div>
                :
                    <div>
                        <Whisper
                            placement="top"
                            trigger="hover"
                            speaker={
                            <Tooltip>
                                Do you want to leave this study request?
                            </Tooltip>
                            }
                            >
                            <Button
                                color="red"
                                onClick={() => {
                                    this.setState({ showEditModal: true });
                                }}
                                appearance="primary"
                                >
                                LEAVE
                            </Button>
                        </Whisper>
                    </div>
                    
                }
                  <div>
                    <Button onClick={this.close} appearance="subtle">
                        Cancel
                    </Button>
                  </div>
                </ButtonContainer>
              
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}

Active.contextType = DataContext;

export default Active;