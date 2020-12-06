import React from 'react'
import { FlexboxGrid } from 'rsuite';
import { Col, Affix } from 'rsuite'
import { IconButton, Icon} from 'rsuite';
import { Tooltip, Whisper } from 'rsuite';


/**
 * Import the respective components
 */
import EditRequestModal from '../Requests/EditRequestModal'
import CreateRequestModal from '../Requests/CreateRequestModal';


/**
 * Temporary file used to show off the create and edit request modals and their funtionality
 */
class RequestCreation extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            showEditModal: false,       // State Variable used to decide to conditionally render the edit modal 
            showCreateModal: false      // State Variable used to decide to conditionally render the create modal
        };

    }

    render() {
      const createTip = (
        <Tooltip>
          Create a Study Request
        </Tooltip>
      );
      const editTip = (
        <Tooltip>
          Edit Study Request
        </Tooltip>
      );
        return(
            <>
            <div className="show-requestCreation">
                <Affix top={50}>
                <FlexboxGrid colSpan={20} justify="end">
                    <FlexboxGrid.Item>

                        <Col>
                            <div className="modal-container">

                            { /* NOTE: These two lines, based on the respective state variables, decide whether to render the respective components 
                            * shouldShow : prop thats passed to the modal component to tell it to show itself
                            * parentCallBack : callback function which belongs to the parent component which is passed to the child modal component 
                            *   which the child calls when the x is clicked to close the modal. The child calls the function to tell the parent to stop rendering me!. i.e.
                            *   set the state variable 'shoeEditModal' to false.
                            */}
                            { this.state.showEditModal && <EditRequestModal shouldShow={this.state.showEditModal} parentCallBack ={ ()=>{this.setState({ showEditModal: false})} } />  }
                            { this.state.showCreateModal && <CreateRequestModal shouldShow={this.state.showCreateModal} parentCallBack ={ ()=>{this.setState({ showCreateModal: false})} } /> }

                            </div>
                        </Col>
                        <Col>
                            <Whisper placement="top" trigger="hover" speaker={createTip}>
                                <IconButton icon={<Icon icon="plus-circle" />} onClick={ ()=>{this.setState({showCreateModal: true})} } size="lg" color="yellow" circle />
                            </Whisper>
                            <Whisper placement="top" trigger="hover" speaker={editTip}>
                                <IconButton icon={<Icon icon="edit" />} onClick={ ()=>{this.setState({showEditModal: true})} }  size="lg" color="yellow" circle />
                            </Whisper>

                        </Col>

                    </FlexboxGrid.Item>
                </FlexboxGrid>
                </Affix>
            </div>
            </>
        );
    }
}

export default RequestCreation