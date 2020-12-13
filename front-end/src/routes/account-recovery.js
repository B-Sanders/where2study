import React from "react";
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
  FlexboxGrid,
  Col,
  ButtonToolbar,
  Button,
  Alert,
} from "rsuite";
import logo from "../images/where2study.png";
import geisel from "../images/geisel1.jpg";

class AccountRecovery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formValue: {
        email: "",
      },
    };

    this.redirectLogin = this.redirectLogin.bind(this);
    this.handleRecovery = this.handleRecovery.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({
      formValue: value,
    });
  }

  redirectLogin() {
    this.props.history.push("/");
  }

  handleRecovery() {
    const { email } = this.state.formValue;
    const isUCSDEmail =
      email.includes("@") &&
      email.substr(email.lastIndexOf("@") + 1).split(" ")[0];
    let valid = true;

    if (email.trim() === "") {
      Alert.warning("Email and password fields cannot be empty", 4000);
      valid = false;
    }

    if (!email.includes("@")) {
      Alert.warning("This is not a valid email format.", 4000);
      valid = false;
    } else if (!(isUCSDEmail.toLowerCase() === "ucsd.edu")) {
      Alert.warning("You need a valid UCSD email to create an account.", 4000);
      valid = false;
    }

    if (valid) {
      let payload = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail: email,
        }),
      };

      fetch("http://localhost:1337/user/account-recovery", payload)
        .then((res) => {
          if (res.status === 200) {
            Alert.success("A recovery email has been sent!", 4000);

            this.props.history.push("/login");
          } else if (res.status === 301) {
            Alert.warning("User not found.", 4000);
          } else if (res.status === 302) {
            Alert.warning("Invalid Email.", 4000);
          } else if (res.status === 303) {
            Alert.warning("Argument error.", 4000);
          } else {
            Alert.error("Experienced an unknown error.", 4000);
          }
        })
        .catch((error) => console.log(error));
    }
  }

  render() {
    return (
      <div
        className="account-recovery"
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
                formValue={this.state.formValue}
                onChange={(formValue) => this.handleChange(formValue)}
              >
                <FormGroup>
                  <ControlLabel>Email</ControlLabel>
                  <FormControl name="email" type="email" placeholder="Email" />
                  <HelpBlock tooltip>Required</HelpBlock>
                </FormGroup>
                <FormGroup>
                  <ButtonToolbar>
                    <Button onClick={this.handleRecovery} appearance="primary">
                      Send recovery email{" "}
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

export default AccountRecovery;
