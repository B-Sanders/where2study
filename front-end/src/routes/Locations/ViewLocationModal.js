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
  Icon,
} from "rsuite";

import { DataContext } from "../../state/context.js";
import styled from "styled-components";

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

  render() {
    var data = this.props.location;
    console.log(data)
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
              <h2>{data.location_name}</h2>
             </Modal.Title>
           </Modal.Header>
           <Modal.Body>
             <Grid fluid>
               <Row className="show-grid">
                 <h4>{`Traffic Level: ${data.traffic_level}`}</h4>
                 <h4>{`Noise Level: ${data.noise_level}`}</h4>
               </Row>
             </Grid>
           </Modal.Body>
          </Modal>
        </div>
      </div>
    );
  }
}

Home.contextType = DataContext;

export default Home;