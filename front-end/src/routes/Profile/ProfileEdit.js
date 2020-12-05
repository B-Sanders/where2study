import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  FlexboxGrid,
  ButtonToolbar,
  Alert, RadioGroup, Radio, InputPicker,
} from "rsuite";
import { Grid, Row, Col } from "rsuite";
import { Button } from "rsuite";
import { TagPicker } from "rsuite";
import db from "../../base";
import major from "../majors.json";
import courses from "../courses.json";
//import major from "./majors.json";
//import courses from "./courses.json";


const database = db.database();
var uniqueId;
const user = db.auth().currentUser;

if (user) {
  // User is signed in.
  uniqueId = user.uid;
} else {
  // No user is signed in.
  // Alert.warning("No user is signed in.",4000);
}

class ProfileEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formValue: {
        display_name: "",
        major: "",
        classes: "",
        pronouns: "",
       // userId: user.uid,
      },
    };

    this.updateProfile.bind(this);
    this.handleChange.bind(this);
    this.backToProfile.bind(this);
    //this.onChangeGender = this.onChangeGender.bind(this);
    //this.onChangeMajor = this.onChangeMajor.bind(this);
    //     this.onChangeClass = this.onChangeClass.bind(this);
  }

  updateProfile = () => {
    const {
      display_name,
      major,
      classes,
      pronouns,
    } = this.state.formValue;

    const userData = {
     // uniqueId,
      display_name,
      major,
      classes,
      pronouns,
    };
    db.database().ref("Users/" + uniqueId).update(userData);

    //console.log(userData);
    this.props.history.push("/profile");
  };

  backToProfile = () => {
    this.props.history.push("/profile");
  }

  handleChange(value) {
    this.setState({
      formValue: value,
    });
    console.log(value);
  }

  render() {
    return (
      <FlexboxGrid colspan={20} justify="center">
        <FlexboxGrid.Item>
          <Col>
            <h1 align="center">Profile</h1>
            <Form formValue={this.state.formValue}
                  onChange={(formValue) => this.handleChange(formValue)}>
              <FormGroup>
                <ControlLabel>User ID</ControlLabel>
                <FormControl name="display_name" type="text" maxlength="15" minLength="1" />

                <div>
                  <FormGroup>
                    <ControlLabel>Major</ControlLabel>
                    <FormControl
                        name="major"
                        accepter={InputPicker}
                        data={major}
                    ></FormControl>
                  </FormGroup>
                </div>

                <div>
                  <FormGroup>
                    <ControlLabel>Courses</ControlLabel>
                    <FormControl
                        name="classes"
                        accepter={TagPicker}
                        data={courses}
                        style={{ width: 300 }}
                    />
                  </FormGroup>
                </div>

                <ControlLabel>Pronouns</ControlLabel>
                <div>
                  <FormControl name="pronouns" accepter={RadioGroup}>
                    <Radio value="He/Him">He/Him</Radio>
                    <Radio value="She/Her">She/Her</Radio>
                    <Radio value="They/Them">They/Them</Radio>
                    <Radio value="Other">Other</Radio>
                  </FormControl>
                </div>

              </FormGroup>
            </Form>

            <FlexboxGrid.Item>
              <FormGroup>
                <ButtonToolbar>
                  <Button onClick={this.updateProfile} appearance="primary">Update</Button>
                  <Button onClick={this.backToProfile} appearance="primary" color="red">Cancel</Button>
                </ButtonToolbar>
              </FormGroup>
            </FlexboxGrid.Item>
          </Col>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    );
  }
}

export default ProfileEdit;
