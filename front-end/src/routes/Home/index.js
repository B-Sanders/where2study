import React, { Component } from 'react';
import Content from "./Content";
import {Sidebar} from "rsuite"
//import Header from "../../Header";
import Header from "../../Header";
import styled from 'styled-components';
import { DataContext } from "../../state/context";
import {
    UPDATE_LOCATIONS_COLLECTION,
    UPDATE_STUDY_REQUESTS_COLLECTION,
    UPDATE_USER,
  } from "../../state/actions";
import db from "../../base";

const HomeContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    className: "show-fake-browser navbar-page";
    overflow: auto;

`;

class HomePage extends Component{
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
        db.database().ref("RequestsList").on("value", (dataSnapshot) => {
            this.context.dispatch({
                type: UPDATE_STUDY_REQUESTS_COLLECTION,
                payload: {
                    requests: dataSnapshot.val(),
                },
            });
        });
    }

    render(){
        console.log(this.context.state);
        return(
            <HomeContainer>
                <Sidebar history={this.props.history}>
                    <Header history={this.props.history}/>
                </Sidebar>
                <Content />
            </HomeContainer>
        )
    };
}

HomePage.contextType = DataContext;
export default HomePage;

