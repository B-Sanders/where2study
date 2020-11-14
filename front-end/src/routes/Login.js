import React, {useContext} from 'react';
import { Redirect } from 'react-router-dom';
import { Form, FormGroup, FormControl, ControlLabel, FlexboxGrid, ButtonToolbar, HelpBlock } from 'rsuite';
import { Grid, Row, Col } from 'rsuite';
import { Button } from 'rsuite';
import db from "../base"
import logo from '../images/where2study.png';


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formValue: {
                email: '',
                password: ''
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin() {
        const { email, password } = this.state.formValue;

        try{
            db
                .auth()
                .signInWithEmailAndPassword(email, password);
                this.props.history.push("/");
        } catch(error){
            alert(error);
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
                <FlexboxGrid colspan={20} justify="center">
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

export default Login;