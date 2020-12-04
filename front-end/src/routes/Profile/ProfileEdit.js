import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  FlexboxGrid,
  Alert,
} from "rsuite";
import { Grid, Row, Col } from "rsuite";
import { Button } from "rsuite";
import { TagPicker } from "rsuite";
import db from "../../base";
import majorData from "../majors.json"
import classData from "../courses.json"


const database = db.database();

var uid;
var user = db.auth().currentUser;

if (user) {
  // User is signed in.
  uid = user.uid;
} else {
  // No user is signed in.
  // Alert.warning("No user is signed in.",4000);
}

class ProfileEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "React",
    };

    this.updateProfile.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.onChangeMajor = this.onChangeMajor.bind(this);
    //     this.onChangeClass = this.onChangeClass.bind(this);
  }
  updateProfile = () => {
    this.props.history.push("/profile");
  };

  onChangeGender(event) {
    console.log(event.target.value);
  }
  onChangeMajor(event) {
    console.log(event.target.value);
  }
  //   onChangeClass(event) {
  //       console.log(event.target.value);
  //   }

  render() {
    return (
      <FlexboxGrid colspan={20} justify="center">
        <FlexboxGrid.Item>
          <Col>
            <h1 align="center">Profile</h1>
            <Form>
              <FormGroup>
                <ControlLabel>User ID</ControlLabel>
                <FormControl name="user_id" type="text" maxlength="15" />

                <ControlLabel>Major</ControlLabel>
                <div onChange={this.onChangeMajor}>
                  <TagPicker
                    data={majorData}
                    groupBy="department"
                    defaultValue={majorData}
                    style={{ width: 300 }}
                  />
                </div>

                <ControlLabel>Classes</ControlLabel>
                <div onChange={this.onChangeClass}>
                  <TagPicker
                    data={classData}
                    groupBy="department"
                    defaultValue={classData}
                    style={{ width: 300 }}
                  />
                </div>

                <ControlLabel>Pronouns</ControlLabel>
                <div>
                  <input type="radio" value="He" name="gender" /> He/Him <br />
                  <input type="radio" value="She" name="gender" /> She/Her{" "}
                  <br />
                  <input
                    type="radio"
                    value="They"
                    name="gender"
                  /> They/Them <br />
                  <input type="radio" value="Other" name="gender" /> Other{" "}
                  <br />
                </div>

                <ControlLabel>Requests</ControlLabel>
              </FormGroup>
            </Form>

            <FlexboxGrid.Item>
              <Row>
                <div className="buttons"></div>
                <Button onClick={this.updateProfile} appearance="primary">
                  Update
                </Button>
              </Row>
            </FlexboxGrid.Item>
          </Col>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    );
  }
}

export default ProfileEdit;
