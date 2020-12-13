import React, { Component } from "react";
import {
  Button,
  Modal,
  Grid,
  Row,
  Rate,
  Divider,
  Tooltip,
  Whisper,
  Alert,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Input,
  DatePicker,
  SelectPicker,
  Icon,
  Schema,
  InputNumber,
} from "rsuite";

/**
 * Fill SelectPickers
 */
import courses from "../courses.json";
import locations from "../locations.json";
import { DataContext } from "../../state/context.js";
import { getUser, getRequests } from '../../utils/fetches';
import { UPDATE_STUDY_REQUESTS_COLLECTION, UPDATE_USER } from "../../state/actions";

const max_chars = 100;
const alert_time = 1250;
const confirm_time = 2000;

/**
 * Define Request Schema for use in validating a Users request
 */
const { StringType, NumberType, DateType } = Schema.Types;
const model = Schema.Model({
  title: StringType().isRequired("This field is required"),
  class: StringType().isRequired("This field is required"),
  location: StringType().isRequired("This field is required"),
  noise_level: NumberType().isRequired("This field is required"),
  end_time: DateType().isRequired("This field is required"),
  max_partners: NumberType().isRequired("This field is required"),
  description: StringType()
    .maxLength(max_chars, "100 Characters Max")
    .isRequired("This field is required"),
});

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formValue: {
        title: "",
        class: "",
        location: "",
        noise_level: 1,
        end_time: new Date(),
        description: "",
        max_partners: 1,
        study_start: new Date(),
      },
      formError: {},
      chars_left: max_chars,

      show: false,
      create: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.createNewRequest = this.createNewRequest.bind(this);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }

  /**
   * Once the user has submitted the form validate it against the
   * database schema model. If no errors proceed to create the request.
   */
  handleSubmit() {
    if (!this.form.check()) {
      Alert.error("Please fix the highlighted fields", alert_time);
    } else {
      // No error occurred handle accordingly
      this.createNewRequest();
      Alert.success("Request created successfully!", confirm_time);
    }
  }

  /**
   * CREATE   Format the current state of the User's form request and POST to the
   *          Realtime Database
   */
  createNewRequest = () => {
    // Convert Dates to correct format for storage
    let startMinutes = String(this.state.formValue.study_start.getMinutes());
    if (startMinutes.length === 1) {
      startMinutes = "0" + startMinutes;
    }
    let startHours = String(this.state.formValue.study_start.getHours());
    if (startHours.length === 1) {
      startHours = "0" + startHours;
    }
    const newStudyStart = `${startHours}:${startMinutes}`;

    // Convert Dates to correct format for storage
    let endMinutes = String(this.state.formValue.end_time.getMinutes());
    if (endMinutes.length === 1) {
      endMinutes = "0" + endMinutes;
    }
    let endHours = String(this.state.formValue.end_time.getHours());
    if (endHours.length === 1) {
      endHours = "0" + endHours;
    }
    const newStudyEnd = `${endHours}:${endMinutes}`;

    let config = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: this.context.state.user.uuid,
        displayName: this.context.state.user.display_name,
        reqClass: this.state.formValue.class,
        desc: this.state.formValue.description,
        location: this.state.formValue.location,
        maxPartners: this.state.formValue.max_partners,
        noiseRating: this.state.formValue.noise_level,
        title: this.state.formValue.title,
        studyStart: newStudyStart,
        studyEnd: newStudyEnd,
      }),
    };

    // TODO: POST CALL
    fetch("http://localhost:1337/requests/create-request", config)
      .then(this.close())
      .catch((error) => console.log(error));
    
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
    });
    getRequests().then((res) => {
      this.context.dispatch({
        type: UPDATE_STUDY_REQUESTS_COLLECTION,
        payload: {
          requests: res,
        },
      });
    });
  };

  /**
   * Set the state of the modal to stop showing and call parent component
   */
  close() {
    this.setState({ show: false });

    /**
     * CALLS the parent component to tell it to stop rendering me
     */
    this.props.parentCallBack();
  }

  /**
   * CALLS the parent component to tell it to stop rendering me
   */
  open() {
    this.setState({ show: this.props.shouldShow }); // Setting it to the prop passed in by tha parent component
  }

  render() {
    const { formValue } = this.state;
    return (
      <>
        <div className="centered">
          <div className="modal-container">
            <Modal
              show={this.open}
              onHide={this.close}
              style={{
                paddingLeft: "125px",
              }}
            >
              <Modal.Header>
                <Modal.Title>
                  {" "}
                  <h2>Create a Study Request!</h2>
                </Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <Grid fluid>
                  <Form
                    ref={(ref) => (this.form = ref)}
                    onChange={(formValue) => {
                      this.setState({ formValue });
                    }}
                    onCheck={(formError) => {
                      this.setState({ formError });
                    }}
                    formValue={formValue}
                    model={model}
                    layout="vertical"
                  >
                    <Row xs={10} className="show-grid">
                      <FormGroup>
                        <h5>Enter a Descriptive Title:</h5>
                        <FormControl
                          name="title"
                          type="title"
                          style={{ width: 224 }}
                          preventOverflow
                          placeholder="Enter title here!"
                        />
                      </FormGroup>
                    </Row>

                    <Row>
                      <Divider></Divider>
                    </Row>

                    <Row xs={10} className="show-grid">
                      <FormGroup>
                        <h5>Select a Class:</h5>
                        <FormControl
                          accepter={SelectPicker}
                          name="class"
                          type="class"
                          data={courses}
                          style={{ width: 224 }}
                          preventOverflow
                        />
                      </FormGroup>
                    </Row>

                    <Row>
                      <Divider></Divider>
                    </Row>

                    <Row xs={10} className="show-grid">
                      <FormGroup>
                        <h5>Number of Partners:</h5>
                        <FormControl
                          accepter={InputNumber}
                          min={1}
                          name="max_partners"
                          label="max_partners"
                          style={{ width: 224 }}
                        />
                      </FormGroup>
                    </Row>

                    <Row>
                      <Divider></Divider>
                    </Row>

                    <Row xs={10} className="show-grid">
                      <FormGroup>
                        <h5>Select a Study Location:</h5>
                        <FormControl
                          accepter={SelectPicker}
                          name="location"
                          type="location"
                          data={locations}
                          style={{ width: 224 }}
                          preventOverflow
                        />
                      </FormGroup>
                    </Row>

                    <Row>
                      <Divider></Divider>
                    </Row>

                    <Row xs={10} className="show-grid">
                      <FormGroup>
                        <h5>Rate Your Study Location's Noise Level:</h5>
                        <FormControl
                          accepter={Rate}
                          name="noise_level"
                          type="noise_level"
                          defaultValue={1}
                          max={5}
                          size="sm"
                          character={
                            <Icon
                              icon="volume-up"
                              style={{ color: "rgba(0, 106, 150, 0.75)" }}
                            />
                          }
                        />
                      </FormGroup>
                    </Row>

                    <Row>
                      <Divider></Divider>
                    </Row>

                    <Row xs={10} className="show-grid">
                      <FormGroup>
                        <h5>Enter Your Estimated End Time</h5>
                        <FormControl
                          accepter={DatePicker}
                          placement="topStart"
                          name="end_time"
                          type="end_time"
                          format="hh:mm A"
                          showMeridian
                          ranges={[]}
                        />
                      </FormGroup>
                    </Row>

                    <Row>
                      <Divider></Divider>
                    </Row>

                    <Row className="show-grid">
                      <FormGroup>
                        <h5>
                          Enter a description to help your classmates find you:
                        </h5>
                        <ControlLabel>
                          Characters Remaining:{" "}
                          {max_chars - this.state.formValue.description.length}{" "}
                        </ControlLabel>
                        <FormControl
                          accepter={Input}
                          componentClass="textarea"
                          name="description"
                          type="description"
                          rows={3}
                          style={{ width: 600 }}
                          size="lg"
                          placeholder="Describe your surroundings or some identifying feature!"
                        />
                      </FormGroup>
                    </Row>
                  </Form>
                </Grid>
              </Modal.Body>

              <Modal.Footer>
                <Whisper
                  placement="top"
                  trigger="hover"
                  speaker={
                    <Tooltip>Do you want to create this study request?</Tooltip>
                  }
                >
                  <Button onClick={this.handleSubmit} appearance="primary">
                    CREATE REQUEST
                  </Button>
                </Whisper>
                <Button onClick={this.close} appearance="subtle">
                  Cancel
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </>
    );
  }
}
Home.contextType = DataContext;
export default Home;
