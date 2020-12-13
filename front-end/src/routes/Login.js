import React, { useContext, useImperativeHandle } from "react";
import { AuthContext } from "../auth/Auth";
import { Link, Redirect, useHistory } from "react-router-dom";
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
import styled from "styled-components";
import geisel from "../images/geisel1.jpg";

const LoginContainer = styled.div`
  height: 100%;
  width: 100%;
`;
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
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleForgottenPassword = this.handleForgottenPassword.bind(this);
  }

  handleSignUp() {
    this.props.history.push("/signup");
  }

  handleLogin() {
    const { email, password } = this.state.formValue;

    if (email.trim() == "" || password.trim() == "") {
      Alert.warning("Email and password fields cannot be empty", 4000);
    } else {
      try {
        db.auth()
          .signInWithEmailAndPassword(email, password)
          .then((user) => {
            if (user) {
              window.localStorage.setItem("loginToken", user.user.uid);
              this.props.history.push("/");
            }
          })
          .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === "auth/wrong-password") {
              Alert.error("The username and password did not match.", 4000);
            } else if (errorCode === "auth/user-not-found") {
              Alert.error("The user does not exist.", 4000);
            } else {
              Alert.error(errorMessage, 4000);
            }
          });
      } catch (error) {
        alert(error);
      }
    }
  }

  handleForgottenPassword() {
    this.props.history.push("/account-recovery");
  }

  handleChange(value) {
    this.setState({
      formValue: value,
    });
  }

  render() {
    const { currentUser } = this.context;
    return !!currentUser ? (
      <Redirect to="/" />
    ) : (
      <LoginContainer
        style={{
          backgroundImage: `url(${geisel})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          overflow: "auto",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <FlexboxGrid
          colSpan={20}
          justify="center"
          style={{
            display: "flex",
            flexDirection: "column",
            position: "inherit",
            overflow: "auto",
            opacity: 0.97,
            alignItems: "center",
            alignContent: "center",
            background: "#f2f2f2",
            borderRadius: 15,
            padding: "40px",
          }}
        >
          <FlexboxGrid.Item>
            <Col>
              <img src={logo} alt="Logo" height={250} width={300} />
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
                    onKeyDown={(key) => {
                      if (key.code === "Enter") {
                        this.handleLogin();
                      }
                    }}
                  />
                  <HelpBlock tooltip>Required</HelpBlock>
                  <br />
                  <Link onClick={this.handleForgottenPassword}>
                    Forgot password?
                  </Link>
                </FormGroup>
                <FormGroup>
                  <ButtonToolbar>
                    <Button onClick={this.handleLogin} appearance="primary">
                      Sign In
                    </Button>
                    <Button
                      onClick={this.handleSignUp}
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
      </LoginContainer>
    );
  }
}

Login.contextType = AuthContext;
export default Login;
