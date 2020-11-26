import React from 'react';
import { Form, FormGroup, FormControl, ControlLabel, FlexboxGrid, ButtonToolbar, HelpBlock, Alert } from 'rsuite';
import { Col } from 'rsuite';
import { Button } from 'rsuite';
import db from "../base"
import logo from '../images/where2study.png';
import EditRequestModal from './EditRequestModal'
import CreateRequestModal from './CreateRequestModal'


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formValue: {
                email: '',
                password: ''
            },
            showEditModal: false,       // State Variable used to decide to conditionally render the edit modal 
            showCreateModal: false      // State Variable used to decide to conditionally render the create modal
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
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
                            this.props.history.push("/");
                        }
                    })
                    .catch(function(error) {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        if (errorCode === 'auth/wrong-password') {
                            Alert.error("The username and password did not match",4000);
                          } else {
                            alert(errorCode + errorMessage,4000);
                        }
                    });
            } catch(error){
                alert(error);
            }
        }

    }

    handleChange(value) {
        this.setState({
            formValue: value
        });
    }

    render() {
        return (
            <div className="show-login">
                <FlexboxGrid colSpan={100} justify="center">
                    <FlexboxGrid.Item > 
                        <Col>
                            <h1 align="center">Login</h1>
                            <img src={logo} height={300} width={300} />
                            
                            {/**
                             * Conditionally renders the edit/create request modal component 
                             */}
                            { this.state.showEditModal && <EditRequestModal shouldShow={this.state.showEditModal} parentCallBack ={ ()=>{this.setState({ showEditModal: false})} } />  }
                            { this.state.showCreateModal && <CreateRequestModal shouldShow={this.state.showCreateModal} parentCallBack ={ ()=>{this.setState({ showCreateModal: false})} } /> }

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
                                        <Button onClick={this.handleCancel} appearance="primary" color="green">Sign Up</Button>
                                    </ButtonToolbar>
                                </FormGroup>
                            </Form>
                        </Col>

                        <Col>
                             {/**
                              * Respective buttons for each modal
                              */}
                            <Button onClick={ ()=>{this.setState({showEditModal: true})} } appearance="default" color="yellow"> SHOW EDIT MODAL </Button>
                            <Button onClick={ ()=>{this.setState({showCreateModal: true})} } appearance="default" color="red"> SHOW CREATE MODAL </Button>
                        </Col>
                        
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </div>
        );
    }
}

export default Login;