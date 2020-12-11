import React, { useContext } from "react";
import { AuthContext } from "../auth/Auth";
import { Redirect, useHistory, Route } from "react-router-dom";
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
import logo from "../images/where2study.png";
import styled from "styled-components";
import geisel from "../images/geisel1.jpg";
import PrivateRoute from "../auth/PrivateRoute";
const HomePage = "../routes/Home/index";

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

  login(uid) {
    window.localStorage.setItem("loginToken", uid);
    <PrivateRoute exact path="/" component={HomePage} />;
  }

  handleLogin() {
    const { email, password } = this.state.formValue;
    let validUser = true;
    let validCredentials = false;
    var uid = undefined;

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
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.status === 200) {
            console.log("inside the status if block");
            uid = data.uid.user.uid;
            validCredentials = true;
            const history = useHistory();
            this.login(uid);
            // this.history.push("/");
            // history.push("/");
            // this.props.history.push("/");
          } else {
            console.log(data);
          }
        })
        .catch((err) => console.log(err));
    }

    // Login.js:64
    // {code: "auth/quota-exceeded", message: "Exceeded quota for verifying passwords."}
    // code: "auth/quota-exceeded"
    // message: "Exceeded quota for verifying passwords."
    // __proto__: Object
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
