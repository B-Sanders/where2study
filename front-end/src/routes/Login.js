import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { DataContext } from '../state/context';
import { UPDATE_LOCATIONS_COLLECTION, UPDATE_STUDY_REQUESTS_COLLECTION, UPDATE_USER } from '../state/actions'
import { Form, FormGroup, FormControl, ControlLabel, FlexboxGrid, ButtonToolbar, HelpBlock, Alert } from 'rsuite';
import { Col } from 'rsuite';
import { Button } from 'rsuite';
import db from "../base"
import logo from '../images/where2study.png';


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

        if(email.trim()=="" || password.trim()=="") {
            Alert.warning("Email and password fields cannot be empty",4000);
        } else {
            try{
                db.auth().signInWithEmailAndPassword(email, password)
                    .then((user) => {
                        if (user) {
                            this.context.dispatch({
                                type: UPDATE_USER,
                                payload: {
                                    user: {
                                    displayName: user.user.displayName,
                                    email: user.user.email,
                                    uid: user.user.uid,
                                }}
                            });
                            const locations = db.database().ref('Locations');
                            locations.on('value', dataSnapshot => {
                                    this.context.dispatch({
                                        type: UPDATE_LOCATIONS_COLLECTION,
                                        payload: {
                                            locations: dataSnapshot.val()
                                        }
                                    })
                                })
                            };
                            const requests = db.database().ref('RequestsList');
                            requests.on('value', dataSnapshot => {
                                this.context.dispatch({
                                    type: UPDATE_STUDY_REQUESTS_COLLECTION,
                                    payload: {
                                        requests: dataSnapshot.val()
                                    }
                                })
                            })
                            this.props.history.push("/");
                    })
                    .catch(function(error) {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        if (errorCode === 'auth/wrong-password') {
                            Alert.error("The username and password did not match",4000);
                          } else if (errorCode === "auth/user-not-found") {
                            Alert.error("The user does not exist", 4000);
                          } else {
                            Alert.error(errorMessage, 4000);
                          }
                    });
            } catch(error){
                alert(error);
            }
    }
  }

  handleChange(value) {
    this.setState({
      formValue: value,
    });
  }

    render() {
        const { state, dispatch } = this.context;
        console.log(state);
        return (
            <div className="show-login">
                <FlexboxGrid colSpan={20} justify="center">
                    <FlexboxGrid.Item>
                        <Col>
                            <h1 align="center">Login</h1>
                            <img src={logo} height={300} width={300} />
                            <Form onChange={this.handleChange} formValue={this.state.formValue}>
                                <FormGroup>
                                    <ControlLabel>Email</ControlLabel>
                                    <FormControl name="email" type="email" placeholder="Email"/>
                                    <HelpBlock tooltip>Required</HelpBlock>
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Password</ControlLabel>
                                    <FormControl name="password" type="password" placeholder="Password" />
                                    <HelpBlock tooltip>Required</HelpBlock>
                                </FormGroup>
                                <FormGroup>
                                    <ButtonToolbar>
                                        <Button onClick={this.handleLogin} appearance="primary">Sign In</Button>
                                        <Button appearance="primary" color="green">Sign Up</Button>
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

Login.contextType = DataContext;
export default Login;
