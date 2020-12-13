import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  FlexboxGrid,
  ButtonToolbar,
  Alert,
  RadioGroup,
  Radio,
  InputPicker,
  Header,
  Container,
} from "rsuite";
import { Grid, Row, Col } from "rsuite";
import { Button } from "rsuite";
import { TagPicker } from "rsuite";
import db from "../../base";
import majorData from "../majors.json";
import classData from "../courses.json";
import SideBar from "../../Header";
import styled from "styled-components";
import { DataContext } from "../../state/context";
import { UPDATE_USER } from "../../state/actions";
import logo from "../../images/where2study.png";
import { getUser, editProfile } from "../../utils/fetches";

const ProfileEditContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const ProfileContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
`;

class ProfileEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display_name: "",
      major: [],
      classes: [],
      pronouns: "",
    };
    this.updateProfile.bind(this);
    this.backToProfile.bind(this);
  }

  updateProfile = () => {
    let { display_name, major, classes, pronouns } = this.state;
    if (pronouns === "") {
      pronouns = this.context.state.user.pronouns;
    }

    major = major.join();
    editProfile({
      userClasses: classes,
      displayName: display_name,
      userMajor: major,
      userPronouns: pronouns,
      userID: this.context.state.user.uuid,
    });
    this.props.history.push("/profile");
  };

  backToProfile = () => {
    this.props.history.push("/profile");
  };

  componentDidMount() {
    const userId = window.localStorage.getItem("loginToken");
    getUser(userId).then((res) => {
      console.log("res.major", res.major);
      this.context.dispatch({
        type: UPDATE_USER,
        payload: {
          user: {
            active_post: res.active_post,
            classes: res.classes,
            display_name: res.display_name,
            email: res.email,
            major: res.major,
            pronouns: res.pronouns,
            uuid: res.uuid,
          },
        },
      });

      this.setState({
        display_name: this.context.state.user.display_name,
        major: this.context.state.user.major.split(","),
        classes: Object.keys(this.context.state.user.classes).map((key) => this.context.state.user.classes[key]),
        pronouns: this.context.state.user.pronouns,
      });
    });
  }

  render() {
    console.log('this.state.classes', this.state.classes);
    return (
      <ProfileEditContainer>
        <SideBar history={this.props.history} />
        <ProfileContainer>
          <FlexboxGrid colspan={20} justify="center">
            <FlexboxGrid.Item>
              <Col>
                <Header>
                  <FlexboxGrid justify="center">
                    <FlexboxGrid.Item>
                      <img src={logo} height="125" width="150" href="/" />
                    </FlexboxGrid.Item>
                  </FlexboxGrid>
                </Header>
                <h1 align="center">Profile Edit</h1>
                <Form>
                  <FormGroup>
                    <ControlLabel>Username</ControlLabel>
                    <FormControl
                      name="display_name"
                      type="text"
                      maxLength="15"
                      onChange={(newValue) => {
                        this.setState({ display_name: newValue });
                      }}
                      value={this.state.display_name}
                    />

                    <ControlLabel>Major</ControlLabel>
                    <TagPicker
                      data={majorData}
                      groupBy="department"
                      defaultValue={this.state.major}
                      value={this.state.major}
                      style={{ width: 300 }}
                      onChange={(val) => {
                        this.setState({ major: val });
                      }}
                    />

                    <ControlLabel>Classes</ControlLabel>
                    <TagPicker
                      data={classData}
                      groupBy="department"
                      defaultValue={this.state.classes}
                      value={this.state.classes}
                      onChange={(val) => {
                        this.setState({ classes: val });
                      }}
                      style={{ width: 300 }}
                    />

                    <ControlLabel>Pronouns</ControlLabel>
                    <FormControl
                      name="pronouns"
                      accepter={RadioGroup}
                      value={this.state.pronouns}
                      onChange={(val) => {
                        this.setState({ pronouns: val });
                      }}
                    >
                      <Radio value="He/Him">He/Him</Radio>
                      <Radio value="She/Her">She/Her</Radio>
                      <Radio value="They/Them">They/Them</Radio>
                      <Radio value="Other">Other</Radio>
                    </FormControl>
                  </FormGroup>
                </Form>

                <FlexboxGrid.Item>
                  <Row>
                    <div className="buttons">
                      <Button onClick={this.updateProfile} appearance="primary">
                        Update
                      </Button>{" "}
                      <Button
                        onClick={this.backToProfile}
                        appearance="primary"
                        color="green"
                      >
                        Cancel
                      </Button>
                    </div>
                  </Row>
                </FlexboxGrid.Item>
              </Col>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </ProfileContainer>
      </ProfileEditContainer>
    );
  }
}

ProfileEdit.contextType = DataContext;
export default ProfileEdit;
