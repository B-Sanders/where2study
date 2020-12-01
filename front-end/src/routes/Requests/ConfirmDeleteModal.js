import React, {Component} from 'react';
import { Modal, Button, ButtonToolbar } from 'rsuite';

// Currently In progress. Not yet completed
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }
  close() {
    this.setState({ show: false });
  }
  open() {
    this.setState({ show: true });
  }
  render() {
    return (
      <div className="modal-container">
        <ButtonToolbar>
          <Button onClick={this.open}> Open</Button>
        </ButtonToolbar>

        <Modal backdrop="static" show={this.state.show} onHide={this.close} size="xs">
          <Modal.Body>
            Are you sure you want to delete your study request?
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close} appearance="primary">
              Cancel
            </Button>
            <Button onClick={this.close} appearance="subtle">
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Home;