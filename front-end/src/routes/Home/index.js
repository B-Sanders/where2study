import React, { Component } from 'react';
import Content from "./Content";
//import Header from "../../Header";
import Header from "../../Header2";
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
`;

class HomePage extends Component{

    componentDidMount() { 
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
        return(
            <HomeContainer>
                <Header />
                <Content />
            </HomeContainer>
        )
    };
}

HomePage.contextType = DataContext;

export default HomePage;

