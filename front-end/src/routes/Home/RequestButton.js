import React from 'react'
import { FlexboxGrid } from 'rsuite';
import { Col, Affix } from 'rsuite'
import { IconButton, Icon} from 'rsuite';
import { Tooltip, Whisper } from 'rsuite';
import { Popover, ButtonGroup, Button } from 'rsuite';
import {DataContext} from '../../state/context.js';
import styled from 'styled-components';

/**
 * Import the respective components
 */
import EditRequestModal from '../Requests/EditRequestModal'
import CreateRequestModal from '../Requests/CreateRequestModal';
import ActiveRequestModal from '../Requests/ActiveRequestModal';


const ButtonContainer = styled.div`
    height: 35px;
    width: 35px;
    position: absolute;
    bottom: 40px;
    right: 40px;
`;
/**
 * Temporary file used to show off the create and edit request modals and their funtionality
 */
class RequestCreation extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            showEditModal: false,       // State Variable used to decide to conditionally render the edit modal 
            showCreateModal: false,     // State Variable used to decide to conditionally render the create modal
            showActiveModal: false,
            showActiveToolbar: false,
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
      const activeTip = (
        <Tooltip>
          View Active Request
        </Tooltip>
      );
        console.log(this.context.state.user.active_post);
        console.log(this.context.state.user.uuid);
        console.log(this.context.state.requests[this.context.state.user.uuid]);
        return(
            <>
            
            <ButtonContainer>
                <Affix top={50}>
                <FlexboxGrid colSpan={20} justify="end">
                    <FlexboxGrid.Item>

                        <Col>
                            <div className="modal-container">

                            { /* NOTE: These three lines, based on the respective state variables, decide whether to render the respective components 
                            * shouldShow : prop thats passed to the modal component to tell it to show itself
                            * parentCallBack : callback function which belongs to the parent component which is passed to the child modal component 
                            *   which the child calls when the x is clicked to close the modal. The child calls the function to tell the parent to stop rendering me!. i.e.
                            *   set the state variable 'shoeEditModal' to false.
                            */}

                        { this.state.showEditModal && <EditRequestModal shouldShow={this.state.showEditModal} parentCallBack ={ ()=>{this.setState({ showEditModal: false})} } /> }
                              
                        { this.state.showCreateModal && <CreateRequestModal shouldShow={this.state.showCreateModal} parentCallBack ={ ()=>{this.setState({ showCreateModal: false}); } } /> }
                 
                        { this.state.showActiveModal && <ActiveRequestModal  shouldShow={this.state.showActiveModal} 
                            studyRequest={this.context.state.requests[this.context.state.user.active_post]} 
                            studyOwner={this.context.state.user.active_post} parentCallBack ={ ()=>{this.setState({ showActiveModal: false})} } /> 
                        }

                            </div>
                        </Col>
                        <Col>
                        { !this.context.state.user.active_post ?
                            <Whisper placement="top" trigger="hover" speaker={createTip}>
                                <IconButton icon={<Icon icon="plus-circle" />} onClick={ ()=>{this.setState({showCreateModal: true})} } size="lg" color="yellow" circle />
                            </Whisper>
                        :
                            <Whisper placement="top" trigger="hover" speaker={activeTip}>
                                {!this.state.showActiveToolbar ?
                                    <IconButton icon={<Icon icon="calendar-o" />} onClick={()=>{this.setState({showActiveToolbar: true})}}  size="lg" color="yellow" circle />
                                :
                                    <p></p>
                                }
                            </Whisper>
                        }
                        
                        { this.state.showActiveToolbar && (this.context.state.user.uuid === this.context.state.user.active_post) && <ButtonGroup size="lg">
                                <IconButton icon={<Icon icon="edit" />} appearance={"primary"} onClick={ ()=>{this.setState({showEditModal: true, showActiveToolbar: false})}} size={"sm"} color="yellow" circle></IconButton>
                                <IconButton icon={<Icon icon="eye" />} appearance={"primary"} onClick={ ()=>{this.setState({showActiveModal: true, showActiveToolbar: false})}} size={"sm"} color="yellow" circle></IconButton>
                            </ButtonGroup>
                        }

                        { this.state.showActiveToolbar && !(this.context.state.user.uuid === this.context.state.user.active_post) && <ButtonGroup size="lg">
                                    <IconButton icon={<Icon icon="eye" />} appearance={"primary"} onClick={ ()=>{this.setState({showActiveModal: true, showActiveToolbar: false})}} size={"lg"} color="yellow" circle></IconButton>
                                </ButtonGroup>
                        }   
                        </Col>

                    </FlexboxGrid.Item>
                </FlexboxGrid>
                </Affix>
            </ButtonContainer>
            </>
        );
    }
}

RequestCreation.contextType = DataContext;
export default RequestCreation
