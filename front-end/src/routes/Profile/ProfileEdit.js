import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  FlexboxGrid,
  ButtonToolbar,
  Alert, RadioGroup, Radio, InputPicker,
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
import { UPDATE_USER } from "../../state/actions";

const ProfileEditContainer = styled.div`
  width: 100%;
  height: 100%;
`;


var uniqueId;
const user = db.auth().currentUser;

if (user) {
  // User is signed in.
  uniqueId = user.uid;
} else {
  // No user is signed in.
  // Alert.warning("No user is signed in.",4000);
}

class ProfileEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display_name: '',
      major: [],
      classes: [],
      pronouns: '',
    };
    this.updateProfile.bind(this);
    this.backToProfile.bind(this);
  }

  updateProfile = () => {
    let {
      display_name,
      major,
      classes,
      pronouns,
    } = this.state;
    major = major.join();
    const userData = {
      display_name,
      major,
      classes,
      pronouns,
    };
    db.database().ref("Users/" + this.context.state.user.uuid).update(userData);
    this.props.history.push("/profile");
  };

  backToProfile = () => {
    this.props.history.push("/profile");
  }

  componentDidMount() {
    const userData = db.database().ref('Users');
    userData.orderByChild('uuid').equalTo(window.localStorage.getItem('loginToken')).on('value', (dataSnapshot) => {
        const {
            active_post,
            classes,
            display_name,
            email,
            major,
            pronouns,
            uuid,
        } = dataSnapshot.val()[window.localStorage.getItem('loginToken')];
  
        this.context.dispatch({
          type: UPDATE_USER,
          payload: {
            user: {
              active_post,
              classes,
              display_name,
              email,
              major,
              pronouns,
              uuid,
            },
          },
        });
        console.log(this.context.state.user.major);
        this.setState({
          display_name: this.context.state.user.display_name,
          major: this.context.state.user.major.split(','),
          classes: this.context.state.user.classes,
          pronouns: this.context.state.user.pronouns,
      });
  });
}

  render() {
    return (
      <ProfileEditContainer>
        <SideBar history={this.props.history}/>
        <FlexboxGrid colspan={20} justify="center">
          <FlexboxGrid.Item>
            <Col>
              <h1 align="center">Profile</h1>
              <Form>
                <FormGroup>
                  <ControlLabel>User ID</ControlLabel>
                  <FormControl
                    name="display_name"
                    type="text"
                    maxlength="15"
                    onChange={(newValue) => { this.setState({ display_name: newValue }); }}
                    value={this.state.display_name}
                  />

                  <ControlLabel>Major</ControlLabel>
                    <TagPicker
                      data={majorData}
                      groupBy="department"
                      defaultValue={this.state.major}
                      value={this.state.major}
                      style={{ width: 300 }}
                      onChange={(val) => { this.setState({ major: val })}}
                    />

                  <ControlLabel>Classes</ControlLabel>
                    <TagPicker
                      data={classData}
                      groupBy="department"
                      defaultValue={this.state.classes}
                      value={this.state.classes}
                      onChange={(val) => { this.setState({ classes: val })}}
                      style={{ width: 300 }}
                    />

                  <ControlLabel>Pronouns</ControlLabel>
                    <FormControl
                      name="pronouns"
                      accepter={RadioGroup}
                      onChange={(val) => { this.setState({ pronouns: val })}}
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
