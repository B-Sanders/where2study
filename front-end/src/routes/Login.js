import React, {useContext} from 'react';
import { Redirect } from 'react-router-dom';
import { Form, FormGroup, FormControl, ControlLabel, FlexboxGrid } from 'rsuite';
import { Grid, Row, Col } from 'rsuite';
import { Button } from 'rsuite';
import logo from '../images/where2study.png';


const Login = ({ history }) => {
        return (
            <FlexboxGrid colspan={20} justify="center">
                <FlexboxGrid.Item>
                    <Col>
                        <h1 align="center">Login</h1>
                        <img src={logo} height={300} width={300}></img>
                        <Form>
                            <FormGroup>
                                <ControlLabel>Email</ControlLabel>
                                <FormControl name="name" type="email" />

                                <ControlLabel>Password</ControlLabel>
                                <FormControl name="email" type="password" />
                            </FormGroup>
                        </Form>

                        <FlexboxGrid.Item>
                            <Row>
                                <div className="buttons"></div>
                                <Button appearance="primary">Sign In</Button>
                                {" "}
                                <Button appearance="primary" color="green">Sign Up</Button>
                            </Row>
                        </FlexboxGrid.Item>
                    </Col>
                </FlexboxGrid.Item>
            </FlexboxGrid>
        )
};

export default Login;