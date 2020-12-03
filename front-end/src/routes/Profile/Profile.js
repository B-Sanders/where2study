import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  FlexboxGrid,
  Alert,
  HelpBlock,
  ButtonToolbar,
} from "rsuite";
import { Grid, Row, Col } from "rsuite";
import { Button } from "rsuite";
import { TagPicker } from "rsuite";
import db from "../../base";

const database = db.database();

var uid;
const user = db.auth().currentUser;

if (user) {
  // User is signed in.
  uid = user.uid;
} else {
  // No user is signed in.
  // Alert.warning("No user is signed in.",4000);
}

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.handleEdit.bind(this);
  }
  handleEdit = () => {
    this.props.history.push("/profileEdit");
  };

  render() {
    return (
      <FlexboxGrid colspan={20} justify="center">
        <FlexboxGrid.Item>
          <Col>
            <h1 align="center">Profile</h1>
            <Form>
              <FormGroup>
                <ControlLabel>User ID</ControlLabel>

                <ControlLabel>Major</ControlLabel>

                <ControlLabel>Classes</ControlLabel>

                <ControlLabel>Pronouns</ControlLabel>
              </FormGroup>
            </Form>

            <FlexboxGrid.Item>
              <Row>
                <div className="buttons"></div>
                <Button onClick={this.handleEdit} appearance="primary">
                  Edit
                </Button>
              </Row>
            </FlexboxGrid.Item>
          </Col>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    );
  }
}

export default Profile;
