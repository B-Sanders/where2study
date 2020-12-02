import React from "react";
// import { Redirect } from 'react-router-dom';
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  FlexboxGrid,
  ButtonToolbar,
  HelpBlock,
  Alert,
} from "rsuite";
import { Col } from "rsuite";
import { Button } from "rsuite";
import db from "../base";
import logo from "../images/where2study.png";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formValue: {
        email: "",
        password: "",
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.redirectSignup = this.redirectSignup.bind(this);
  }

  handleLogin() {
    const { email, password } = this.state.formValue;

    if (email.trim() === "" || password.trim() === "") {
      Alert.warning("The email or password fields cannot be empty", 4000);
    } else {
      try {
        db.auth()
          .signInWithEmailAndPassword(email, password)
          .then((user) => {
            if (user) {
            // <PrivateRoute exact path= "/" component={Home} />
            this.props.history.push('/');
            // <Route exact path="/">
            //   {loggedIn ? <Redirect to="/" /> : '/login'}
            // </Route>
            }
          })
          .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("error code: " + errorCode);
            console.log("\nmessage: " + errorMessage);
            if (errorCode === "auth/wrong-password") {
              Alert.error("The username and password did not match", 4000);
            } else if (errorCode === "auth/user-not-found") {
              Alert.error("The user does not exist", 4000);
            } else {
              Alert.error(errorMessage, 4000);
            }
          });
      } catch (error) {
        alert(error);
      }
    }
  }

  handleChange(value) {
    this.setState({
      formValue: value,
    });
  }

  redirectSignup() {
    this.props.history.push("/signup");
  }

  render() {
    return (
      <div className="show-login">
        <FlexboxGrid colSpan={20} justify="center">
          <FlexboxGrid.Item>
            <Col>
              <h1 align="center">Login</h1>
              <img src={logo} alt="Logo" height={300} width={300} />
              <Form
                onChange={this.handleChange}
                formValue={this.state.formValue}
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
                  />
                  <HelpBlock tooltip>Required</HelpBlock>
                </FormGroup>
                <FormGroup>
                  <ButtonToolbar>
                    <Button onClick={this.handleLogin} appearance="primary">
                      Sign In
                    </Button>
                    <Button
                      onClick={this.redirectSignup}
                      appearance="primary"
                      color="green"
                    >
                      Sign Up
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

export default Login;
