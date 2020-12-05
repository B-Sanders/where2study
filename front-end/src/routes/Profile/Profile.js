import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components"
import {

  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  FlexboxGrid
} from "rsuite";
import { Grid, Row, Col } from "rsuite";
import { Button } from "rsuite";
import { TagPicker } from "rsuite";
import db from "../../base";
import { DataContext } from "../../state/context";
import SideBar from "../../Header";
import { UPDATE_USER } from "../../state/actions";

const HomeContainer = styled.div`
    height: 100%;
    width: 100%;
`;

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formValue: {
        display_name: "",
        major: "",
        classes: "",
        pronouns: "",
        userId: "",
      },
    };

    this.loadUser.bind(this);

    this.handleEdit.bind(this);
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
        this.loadUser();
      });
  }

  loadUser () {
      /** Initialize the formValue */
      this.setState({formValue: {
        display_name: this.context.state.user.display_name,
        major: this.context.state.user.major,
        classes: this.context.state.user.classes,
        pronouns: this.context.state.user.pronouns,
      }});
  }

  handleEdit = () => {
    this.props.history.push("/profileEdit");
  };

  render() {
    return (
      <HomeContainer>
      <SideBar />
      <FlexboxGrid colspan={20} justify="center">
        <FlexboxGrid.Item>
          <Col>
            <h1 align="center">Profile</h1>
            <Form formValue={this.state.formValue} >
              <FormGroup>
                <ControlLabel>User ID</ControlLabel>
                <FormControl name="display_name" readOnly={true} type="text" placeholder={'display_name'} />

                <ControlLabel>Major</ControlLabel>
                <FormControl name="major" readOnly={true} type="text" placeholder={'major'}/>

                <ControlLabel>Classes</ControlLabel>
                <FormControl name="classes" readOnly={true} type="text" placeholder={'classes'} />

                <ControlLabel>Pronouns</ControlLabel>
                <FormControl name="pronouns" readOnly={true} type="text" placeholder={'pro'} />
              </FormGroup>
            </Form>

            <FlexboxGrid.Item>
              <Row>
                <div className="buttons">
                  <Button onClick={this.handleEdit} appearance="primary">
                    Edit
                  </Button>
                </div>
              </Row>
            </FlexboxGrid.Item>
          </Col>
        </FlexboxGrid.Item>
      </FlexboxGrid>
      </HomeContainer>
    );
  }
}
Profile.contextType = DataContext;
export default Profile;
