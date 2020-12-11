import React, { useContext } from "react";
import { AuthContext } from "../auth/Auth";
import { Redirect } from "react-router-dom";
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
  }

  handleSignUp() {
    this.props.history.push("/signup");
  }

  handleLogin() {
    const { email, password } = this.state.formValue;
    let validUser = true;

    if (email.trim() == "" || password.trim() == "") {
      Alert.warning("Email and password fields cannot be empty", 4000);
      validUser = false;
    }

    if (validUser) {
      let payload = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail: email, userPassword: password }),
      };

      fetch("http://localhost:1337/user/login", payload)
        .then((res) => {
          console.log("inside fetch");
          console.log("display res");
          console.log(res);
          console.log("status " + res.status);
          if (res.status === 200) {
            console.log("successful login");
            // window.localStorage.setItem("loginToken", user.user.uid);
            window.localStorage.setItem("loginToken", res.uid);
            this.props.history.push("/");
          }
        })
        .catch((error) => console.log(error));
    }
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
              <img src={logo} height={250} width={300} />
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
