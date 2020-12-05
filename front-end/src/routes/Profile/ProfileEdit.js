import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  FlexboxGrid,
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

const options = [
  { value: "cse8a", department: "CSE", label: "CSE 8A" },
  { value: "cse8b", department: "CSE", label: "CSE 8B" },
  { value: "cse11", department: "CSE", label: "CSE 11" },
  { value: "cse12", department: "CSE", label: "CSE 12" },
  { value: "cse15l", department: "CSE", label: "CSE 15L" },
  { value: "cse20", department: "CSE", label: "CSE 20" },
  { value: "cse21", department: "CSE", label: "CSE 21" },
  { value: "cse30", department: "CSE", label: "CSE 30" },
  { value: "cse100", department: "CSE", label: "CSE 100" },
  { value: "cse101", department: "CSE", label: "CSE 101" },
  { value: "cse105", department: "CSE", label: "CSE 105" },
  { value: "cse107", department: "CSE", label: "CSE 107" },
  { value: "cse110", department: "CSE", label: "CSE 110" },
  { value: "cse112", department: "CSE", label: "CSE 112" },
  { value: "cse118", department: "CSE", label: "CSE 118" },
  { value: "cse120", department: "CSE", label: "CSE 120" },
  { value: "cse123", department: "CSE", label: "CSE 123" },
  { value: "cse124", department: "CSE", label: "CSE 124" },
  { value: "cse125", department: "CSE", label: "CSE 125" },
  { value: "cse127", department: "CSE", label: "CSE 127" },
  { value: "cse130", department: "CSE", label: "CSE 131" },
  { value: "cse131", department: "CSE", label: "CSE 131" },
  { value: "cse132a", department: "CSE", label: "CSE 132A" },
  { value: "cse132b", department: "CSE", label: "CSE 132B" },
  { value: "cse132c", department: "CSE", label: "CSE 132C" },
  { value: "cse134b", department: "CSE", label: "CSE 134B" },
  { value: "cse135", department: "CSE", label: "CSE 135" },
  { value: "cse136", department: "CSE", label: "CSE 136" },
  { value: "cse140", department: "CSE", label: "CSE 140" },
  { value: "cse140l", department: "CSE", label: "CSE 140L" },
  { value: "cse141", department: "CSE", label: "CSE 141" },
  { value: "cse141l", department: "CSE", label: "CSE 141L" },
  { value: "cse143", department: "CSE", label: "CSE 143" },
  { value: "cse145", department: "CSE", label: "CSE 145" },
  { value: "cse148", department: "CSE", label: "CSE 148" },
  { value: "cse150a", department: "CSE", label: "CSE 150A" },
  { value: "cse150b", department: "CSE", label: "CSE 150B" },
  { value: "cse151a", department: "CSE", label: "CSE 151A" },
  { value: "cse151b", department: "CSE", label: "CSE 151B" },
  { value: "cse152a", department: "CSE", label: "CSE 152A" },
  { value: "cse152b", department: "CSE", label: "CSE 152B" },
  { value: "cse190", department: "CSE", label: "CSE 190" },

  { value: "vanilla", department: "flavor town", label: "Vanilla" },
];

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

  handleChange(value) {
    this.setState({
      formValue: value,
    });
    console.log(value);
  }
/*
  onChangeGender(event) {
    console.log(event.target.value);
  }
  onChangeMajor(event) {
    console.log(event.target.value);
  }
 */
  //   onChangeClass(event) {
  //       console.log(event.target.value);
  //   }

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
                <FormControl name="display_name" type="text" maxlength="15" />

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
