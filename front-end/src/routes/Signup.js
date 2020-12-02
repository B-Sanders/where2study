import React from "react";
// import { Redirect } from 'react-router-dom';
import { Form,FormGroup,FormControl,ControlLabel,FlexboxGrid,ButtonToolbar,HelpBlock,Alert} from "rsuite";
import { Radio, RadioGroup } from "rsuite";
import { Col } from "rsuite";
import { Button } from "rsuite";
import db from "../base";
import logo from "../images/where2study.png";
import { TagPicker } from "rsuite";
import { InputPicker } from "rsuite";
import major from "./majors.json";
import courses from "./courses.json";
// const functions = require('firebase-functions');


class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formValue: {
        email: "",
        password: "",
        display_name: "",
        major: "",
        classes: "",
        pronouns: "",
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.redirectLogin = this.redirectLogin.bind(this);
  }

  handleSignUp() {
    const { email, password , display_name, major, classes, pronouns} = this.state.formValue;
    /**
     * undefinedReference.child failed: First argument was an invalid path = 
     * "Users/[object Object]". Paths must be non-empty strings and can't 
     * contain ".", "#", "$", "[", or "]"
     */
    if (email.trim() === "" || password.trim() === "") {
      Alert.warning("Email and password fields cannot be empty", 4000);
    } else if (!email.includes("@")) {
      // TODO:  Possibly add other checks here that would help
      //        prevent against SQL injection
      Alert.warning("This is not a valid email format.", 4000);
    } else {
      try {
        const isUCSDEmail =
          email.includes("@") &&
          email.substr(email.lastIndexOf("@") + 1).split(" ")[0];

        if (!(isUCSDEmail.toLowerCase() === "ucsd.edu")) {
          Alert.warning(
            "You need a valid UCSD email to create an account.",
            4000
          );
        } else if (password.length < 6) {
          Alert.warning("Password needs to be at least 6 characters long.");
        } else {
          db.auth()
            .createUserWithEmailAndPassword(email, password)
            .then((user) => {
              if (user) {
                // TODO: Redirect user to the login page
                // TODO: Figure out JSON / user id for profile creation
                // TODO: Pass the user information to the database
                var uniqueId = email.substr(0, email.indexOf('@'));
                const userData = {
                  uniqueId,
                  email, 
                  display_name, 
                  major, 
                  classes, 
                  pronouns
                }
                db.database().ref('Users/' + uniqueId).set(userData);
              }
            })
            .catch(function (error) {
              var errorCode = error.code;
              var errorMessage = error.message;
              if (errorCode === "auth/weak-password") {
                Alert.error("The password is too weak.", 4000);
              } else {
                alert(errorCode + errorMessage, 4000);
              }
            });
        }
      } catch (error) {
        Alert.error(error);
      }
    }
  }

  handleChange(value) {
    this.setState({
      formValue: value,
    });
    // console.log(value)
  }

  redirectLogin() {
    this.props.history.push("/login");
  }

  onChangeGender(event) {
    console.log(event.target.value);
  }

  render() {
    return (
      <div className="show-signup">
        <FlexboxGrid colSpan={20} justify="center">
          <FlexboxGrid.Item>
            <Col>
              <h1 align="center">SignUp</h1>
              <img src={logo} alt="Logo" height={300} width={300} />
              <Form
                formValue={this.state.formValue}
                onChange={(formValue) => this.handleChange(formValue)}
              >
                <FormGroup>
                  <ControlLabel>Email</ControlLabel>
                  <FormControl name="email" type="email" placeholder="Email" />
                  <HelpBlock tooltip>Required</HelpBlock>
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Password</ControlLabel>
                  <FormControl
                    name="password"
                    type="password"
                    placeholder="Password"
                    minLength="6"
                  />
                  <HelpBlock tooltip>Required</HelpBlock>
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Display Name</ControlLabel>
                  <FormControl
                    name="display_name"
                    type="text"
                    placeholder="Display Name"
                    maxLength="15"
                  />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Major</ControlLabel>
                  <FormControl
                    name="major"
                    accepter={InputPicker}
                    data={major}
                  ></FormControl>
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Courses</ControlLabel>
                  <FormControl
                    name="classes"
                    accepter={TagPicker}
                    data={courses}
                    style={{ width: 300 }}
                  />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Pronouns</ControlLabel>
                  <FormControl name="pronouns" accepter={RadioGroup}>
                    <Radio value="He">He/Him</Radio>
                    <Radio value="She">She/Her</Radio>
                    <Radio value="They">They/Them</Radio>
                    <Radio value="Other">Other</Radio>
                  </FormControl>
                </FormGroup>
                <FormGroup>
                  <ButtonToolbar>
                    <Button onClick={this.handleSignUp} appearance="primary">
                      Create Account
                    </Button>
                    <Button
                      onClick={this.redirectLogin}
                      appearance="primary"
                      color="green"
                    >
                      Back to Login
                    </Button>
                  </ButtonToolbar>
                </FormGroup>
              </Form>
            </Col>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </div>
    );
  }
}

export default Signup;
