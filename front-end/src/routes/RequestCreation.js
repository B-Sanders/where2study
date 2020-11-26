import React from 'react'
import { FlexboxGrid } from 'rsuite';
import { Col } from 'rsuite'
import { Button } from 'rsuite'
import logo from '../images/where2study.png'

/**
 * Import the respective components
 */
import EditRequestModal from './EditRequestModal'
import CreateRequestModal from './CreateRequestModal'


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
      
        return(
            <>
            <div className="show-requestCreation">
                <FlexboxGrid colSpan={50} justify="center">
                    <FlexboxGrid.Item>

                        <Col>
                            <h1 align="center"> "HOME PAGE" </h1>
                            < div className="modal-container">

                            { /* NOTE: These two lines, based on the respective state variables, decide whether to render the respective components 
                            * shouldShow : prop thats passed to the modal component to tell it to show itself

                            * parentCallBack : callback function which belongs to the parent component which is passed to the child modal component 
                            *   which the child calls when the x is clicked to close the modal. The child calls the function to tell the parent to stop rendering me!. i.e.
                            *   set the state variable 'shoeEditModal' to false.
                            */}
                            { this.state.showEditModal && <EditRequestModal shouldShow={this.state.showEditModal} parentCallBack ={ ()=>{this.setState({ showEditModal: false})} } />  }
                            { this.state.showCreateModal && <CreateRequestModal shouldShow={this.state.showCreateModal} parentCallBack ={ ()=>{this.setState({ showCreateModal: false})} } /> }

                            </div>
                            <img src={logo} height={300} width={300} />

                        </Col>
                        <Col>
                            <Button onClick={ ()=>{this.setState({showEditModal: true})} } appearance="default" color="yellow"> SHOW EDIT MODAL </Button>
                            <Button onClick={ ()=>{this.setState({showCreateModal: true})} } appearance="default" color="red"> SHOW CREATE MODAL </Button>
                        </Col>

                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </div>
            </>
        );
    }
}

export default RequestCreation