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
import { UPDATE_STUDY_REQUESTS_COLLECTION, UPDATE_USER } from "../../state/actions";
import { getUser, getRequests } from '../../utils/fetches';

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
    console.log(this.props.studyRequest.user_id);
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

          const userId = window.localStorage.getItem('loginToken');
      getUser(userId).then((res) => {
        this.context.dispatch({
          type: UPDATE_USER,
          payload: {
            user: {
              active_post: res.active_post,
              classes: res.classes,
              display_name: res.display_name,
              email: res.email,
              major: res.major,
              pronouns: res.pronouns,
              uuid: res.uuid,
            },
          },
        });
      });
      getRequests().then((res) => {
        this.context.dispatch({
          type: UPDATE_STUDY_REQUESTS_COLLECTION,
          payload: {
            requests: res,
          },
        });
      });
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
    return (
      <div className="centered">
        <div className="modal-container">
          <Modal
            show={this.open}
            onHide={this.close}
            style={{
              paddingLeft: "125px",
              paddingTop: "25px",
            }}
          >
            <Modal.Header>
              <Modal.Title>
                {" "}
                <h2>{sReq.request_title}</h2>
              </Modal.Title>
          
          <h6>Request from {sReq.study_partners[this.props.posterId]}</h6>
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
                  disabled={(partnersList[0] === this.context.state.user.display_name) || (this.context.state.user.active_post)}
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
              <p>Would you like to join this study request?</p>
              <p>Note: You may only be a part of one study request at a time!</p>
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
