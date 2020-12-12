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
import { getRequests, getUser } from '../../utils/fetches';

const HomeContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    className: "show-fake-browser navbar-page";
`;

class HomePage extends Component{
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
        getRequests().then((res) => {
            this.context.dispatch({
                type: UPDATE_STUDY_REQUESTS_COLLECTION,
                payload: {
                    requests: res,
                },
            });
        });
    }

    render(){
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

