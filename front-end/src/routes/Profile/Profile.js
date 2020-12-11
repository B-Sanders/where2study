import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components"
import {ButtonToolbar, Header,Content, Container} from "rsuite"
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
import Sidebar from "../../Header";
import { UPDATE_USER } from "../../state/actions";
import logo from "../../images/where2study.png"
import { getUser } from '../../utils/fetches';
const HomeContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    /* justify-content: center; */
`;

const ProfileContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
`;

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formValue: {
        display_name: "",
        major: "",
        classes: [],
        pronouns: "",
        userId: "",
      },
    };

    this.loadUser.bind(this);
    this.handleEdit.bind(this);
  }

  componentDidMount() {
    const userId = window.localStorage.getItem('loginToken');
    getUser(userId).then((res) => {
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
      this.loadUser();
    });
  }

  loadUser () {
      /** Initialize the formValue */
      this.setState({formValue: {
        display_name: this.context.state.user.display_name,
        major: this.context.state.user.major.replace(/_/g, ' ').charAt(0).toUpperCase() + this.context.state.user.major.replace(/_/g, ' ').slice(1),
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
        <Sidebar history={this.props.history}>
          <Header history={this.props.history}/>
        </Sidebar>
        <Content>
          <Container style={{ overflow: 'hidden' }}>
            <Header>
              <FlexboxGrid justify="center">
                <FlexboxGrid.Item>
                  <img src={logo} height="125" width="150" href="/"/>
                </FlexboxGrid.Item>
              </FlexboxGrid>
            </Header>
            <Content>
              <FlexboxGrid colspan={24} justify="center">
                <FlexboxGrid.Item>
                  <Col>
                    <Form>
                      <FormGroup>
                        <ControlLabel><strong>Username: </strong></ControlLabel>
                        <FormControl readOnly name="username" type="username" placeholder={this.state.formValue.display_name}/>
                      </FormGroup>
                      <FormGroup>
                        <ControlLabel><strong>Major </strong></ControlLabel>
                        <FormControl readOnly name="major" type="major" placeholder={this.state.formValue.major}/>
                      </FormGroup>
                      <FormGroup>
                        <ControlLabel><strong>Classes: </strong></ControlLabel>
                        <FormControl readOnly name="classes" type="classes" placeholder={this.state.formValue.classes + " "}/>
                      </FormGroup>
                      <FormGroup>
                        <ControlLabel><strong>Pronouns: </strong></ControlLabel>
                        <FormControl readOnly name="pronouns" type="pronouns" placeholder={this.state.formValue.pronouns + " "}/>
                      </FormGroup>
                      <FormGroup>
                        <ButtonToolbar>
                          <Button onClick={this.handleEdit} appearance="primary">
                            Edit
                          </Button>
                        </ButtonToolbar>
                      </FormGroup>
                    </Form>
                  </Col>
                </FlexboxGrid.Item>
              </FlexboxGrid>
            </Content>

          </Container>

        </Content>
      </HomeContainer>
    );
  }
}
Profile.contextType = DataContext;
export default Profile;
