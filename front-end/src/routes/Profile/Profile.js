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
var uniqueId = window.localStorage.getItem('loginToken');
var data;
var major = 'cse';
var userId = 'my id';
var classes = ['cse 110', 'cse 101'];
var pro = 'he/him';



//var userRef = db.database().ref("Users/" + uniqueId);

db.database().ref("Users/" + uniqueId).once('value').then( snapshot => {
  data =  snapshot.val();
  major =  data.major;
  userId =  data.display_name;
  classes =  data.classes;
  pro =  data.pronouns;
  console.log(data);
  console.log(userId);
  console.log(major);
  console.log(classes);
  console.log(pro);
}).catch(error => {
  console.log('error at promise');
});

 if (uniqueId != null) {
  // User is signed in.
  console.log(uniqueId);
  console.log('b');
  console.log(major);
 } else {
  console.log('no udi found');
  // No user is signed in.
}


class Profile extends React.Component {
  loadUser () {
    db.database().ref("Users/" + uniqueId).once('value').then( snapshot => {
      data =  snapshot.val();
      major =  data.major;
      userId =  data.display_name;
      classes =  data.classes;
      pro =  data.pronouns;
      console.log(data);
      console.log(userId);
      console.log(major);
      console.log(classes);
      console.log(pro);
    }).catch(error => {
      console.log('error at promise');
    });
    this.forceUpdate();
  }

  constructor(props) {
    super(props);
    this.state = {
      formValue: {
        display_name: "",
        major: "",
        classes: "",
        pronouns: "",
      },
    };

    this.handleEdit.bind(this);
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
            <Form>
              <FormGroup>
                <ControlLabel>User ID</ControlLabel>
                <FormControl name="display_name" readOnly={true} type="text" placeholder={userId} />

                <ControlLabel>Major</ControlLabel>
                <FormControl name="major" readOnly={true} type="text" placeholder={major}/>

                <ControlLabel>Classes</ControlLabel>
                <FormControl name="classes" readOnly={true} type="text" placeholder={classes} />

                <ControlLabel>Pronouns</ControlLabel>
                <FormControl name="pronouns" readOnly={true} type="text" placeholder={pro} />
              </FormGroup>
            </Form>

            <FlexboxGrid.Item>
              <Row>
                <div className="buttons"></div>
                <Button onClick={this.handleEdit} appearance="primary">
                  Edit
                </Button>
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
