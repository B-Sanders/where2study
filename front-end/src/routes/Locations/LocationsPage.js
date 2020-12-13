import React, { Component } from 'react';
import Content from "./Content";
import {Sidebar} from "rsuite"
import Header from "../../Header";
import styled from 'styled-components';
import { DataContext } from "../../state/context";
import {
    UPDATE_LOCATIONS_COLLECTION,
    UPDATE_USER,
  } from "../../state/actions";
import db from "../../base";
import { getLocations, getUser } from '../../utils/fetches';

const LocationsContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
flex-direction: row;
    className: "show-fake-browser navbar-page";
`;

class Locations extends Component{
    constructor(props) {
        super(props);
    };
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
        });
        getLocations().then((res) => {
            this.context.dispatch({
                type: UPDATE_LOCATIONS_COLLECTION,
                payload: {
                    locations: res,
                },
            });
        });
    }

    render(){
        return(
            <LocationsContainer>
                <Sidebar history={this.props.history}>
                    <Header history={this.props.history}/>
                </Sidebar>
                <Content />
            </LocationsContainer>
        )
    };

}

export default Locations;
Locations.contextType = DataContext;

