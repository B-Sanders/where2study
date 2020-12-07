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

const LocationsContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    className: "show-fake-browser navbar-page";
    overflow: auto;

`;

class Locations extends Component{
    constructor(props) {
        super(props);
    };
      componentDidMount() {
        const userId = window.localStorage.getItem('loginToken');
        const userData = db.database().ref('Users');
            userData.orderByChild('uuid').equalTo(userId).on('value', (dataSnapshot) => {
            const {
                active_post,
                classes,
                display_name,
                email,
                major,
                pronouns,
                uuid,
            } = dataSnapshot.val()[userId];
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
        });
        db.database().ref("Locations").on("value", (dataSnapshot) => {
            this.context.dispatch({
                type: UPDATE_LOCATIONS_COLLECTION,
                payload: {
                    locations: dataSnapshot.val(),
                },
            });
        });
    }

    render(){
        console.log(this.context.state);
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

