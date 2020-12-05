import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  FlexboxGrid,
  Alert,
  HelpBlock,
  ButtonToolbar,
} from "rsuite";
import { Grid, Row, Col } from "rsuite";
import { Button } from "rsuite";
import { TagPicker } from "rsuite";
import db from "../../base";
import { DataContext } from "../../state/context";

//const database = db.database();
//const user = db.auth().currentUser;
// var uniqueId = window.localStorage.getItem('loginToken');
// var data;
// var major = 'cse';
// var userId = 'my id';
// var classes = ['cse 110', 'cse 101'];
// var pro = 'he/him';



//var userRef = db.database().ref("Users/" + uniqueId);

// db.database().ref("Users/" + uniqueId).once('value').then( snapshot => {
//   data =  snapshot.val();
//   major =  data.major;
//   userId =  data.display_name;
//   classes =  data.classes;
//   pro =  data.pronouns;
//   console.log(data);
//   console.log(userId);
//   console.log(major);
//   console.log(classes);
//   console.log(pro);
// }).catch(error => {
//   console.log('error at promise');
// });

//  if (uniqueId != null) {
//   // User is signed in.
//   console.log(uniqueId);
//   console.log('b');
//   console.log(major);
//  } else {
//   console.log('no udi found');
//   // No user is signed in.
// }


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
    this.loadUser();

    this.handleEdit.bind(this);
  }

  loadUser() {
    var uniqueId = window.localStorage.getItem('loginToken');
    var data;
    var major = undefined;
    var display_name = undefined;
    var classes = undefined;
    var pronouns = undefined;

    /** Load the user data */
    db.database().ref("Users/" + uniqueId).once('value').then( snapshot => {
      data =  snapshot.val();
      major =  data.major;
      display_name =  data.display_name;
      classes =  data.classes;
      pronouns =  data.pronouns;

      /** For convenience I stored this in a JSON format and 
       *  set the state below which should initialize the user 
       *  data to the formValue var in the constructor
       */
      const userData = {
        display_name,
        major,
        classes,
        pronouns
      }

      /** Initialize the formValue */
      this.setState({formValue: userData});
    }).catch(error => {
      console.log('error at promise');
    });
  }

  handleEdit = () => {
    /*
    const {
      display_name,
      major,
      classes,
      pronouns,
    } = this.state.formValue;
     */

    this.props.history.push("/profileEdit");
  };

  render() {
    return (
      <FlexboxGrid colspan={20} justify="center">
        <FlexboxGrid.Item>
          <Col>
            <h1 align="center">Profile</h1>
            <Form formValue={this.state.formValue} >
              <FormGroup>
                <ControlLabel>User ID</ControlLabel>
                <FormControl name="display_name" type="text" readOnly={true} />

                <ControlLabel>Major</ControlLabel>
                <FormControl name="major" type="text" readOnly={true} />

                <ControlLabel>Classes</ControlLabel>
                <FormControl name="classes" type="text" readOnly={true} />

                <ControlLabel>Pronouns</ControlLabel>
                <FormControl name="pronouns" type="text" readOnly={true}  />
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
    );
  }
}
Profile.contextType = DataContext;
export default Profile;