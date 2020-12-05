import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  FlexboxGrid,
  Alert, RadioGroup, Radio,
} from "rsuite";
import { Grid, Row, Col } from "rsuite";
import { Button } from "rsuite";
import { TagPicker } from "rsuite";
import db from "../../base";
import majorData from "../majors.json";
import classData from "../courses.json";
import SideBar from "../../Header"
import styled from 'styled-components';
import { DataContext } from "../../state/context";


const ProfileEditContainer = styled.div`
  width: 100%;
  height: 100%;
`;

class ProfileEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "React",
    };

    this.updateProfile.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.onChangeMajor = this.onChangeMajor.bind(this);
    //     this.onChangeClass = this.onChangeClass.bind(this);
  }
  updateProfile = () => {
    this.props.history.push("/profile");
  };

  onChangeGender(event) {
    console.log(event.target.value);
  }
  onChangeMajor(event) {
    console.log(event.target.value);
  }

  render() {
    return (
      <ProfileEditContainer>
        <SideBar />
        <FlexboxGrid colspan={20} justify="center">
          <FlexboxGrid.Item>
            <Col>
              <h1 align="center">Profile</h1>
              <Form>
                <FormGroup>
                  <ControlLabel>User ID</ControlLabel>
                  <FormControl name="display_name" type="text" maxlength="15" />

                  <ControlLabel>Major</ControlLabel>
                  <div onChange={this.onChangeMajor}>
                    <TagPicker
                      data={majorData}
                      groupBy="department"
                      defaultValue={majorData}
                      style={{ width: 300 }}
                    />
                  </div>

                  <ControlLabel>Classes</ControlLabel>
                  <div onChange={this.onChangeClass}>
                    <TagPicker
                      data={classData}
                      groupBy="department"
                      defaultValue={classData}
                      style={{ width: 300 }}
                    />
                  </div>

                  <ControlLabel>Pronouns</ControlLabel>
                  <div>
                    <FormControl name="pronouns" accepter={RadioGroup}>
                      <Radio value="He/Him">He/Him</Radio>
                      <Radio value="She/Her">She/Her</Radio>
                      <Radio value="They/Them">They/Them</Radio>
                      <Radio value="Other">Other</Radio>
                    </FormControl>
                  </div>

                  <ControlLabel>Requests</ControlLabel>
                </FormGroup>
              </Form>

              <FlexboxGrid.Item>
                <Row>
                  <div className="buttons"></div>
                  <Button onClick={this.updateProfile} appearance="primary">
                    Update
                  </Button>
                </Row>
              </FlexboxGrid.Item>
            </Col>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </ProfileEditContainer>
    );
  }
}

ProfileEdit.contextType = DataContext;
export default ProfileEdit;
