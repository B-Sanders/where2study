import React, {useContext} from 'react';
import { Redirect } from 'react-router-dom';
import { Form, FormGroup, FormControl, ControlLabel, FlexboxGrid } from 'rsuite';
import { Grid, Row, Col } from 'rsuite';
import { Button } from 'rsuite';
import { TagPicker } from 'rsuite';
import db from '../base';


const database = db.database();


const Profile = () => {
    return (
        <FlexboxGrid colspan={20} justify="center">
            <FlexboxGrid.Item>
                <Col>
                    <h1 align="center">Profile</h1>
                    <Form>
                        <FormGroup>
                            <ControlLabel>User ID</ControlLabel>

                            <ControlLabel>Major</ControlLabel>

                            <ControlLabel>Classes</ControlLabel>

                            <ControlLabel>Pronouns</ControlLabel>

                        </FormGroup>
                    </Form>

                    <FlexboxGrid.Item>
                        <Row>
                            <div className="buttons"></div>
                            <Button appearance="primary">Update</Button>
                            {" "}
                        </Row>
                    </FlexboxGrid.Item>
                </Col>
            </FlexboxGrid.Item>
        </FlexboxGrid>
    )
};


export default Profile;