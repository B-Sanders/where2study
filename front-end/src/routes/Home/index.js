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
                <Sidebar>
                    <Header history={this.props.history}/>
                </Sidebar>
                <Content />
            </HomeContainer>
        )
    };
}

HomePage.contextType = DataContext;
export default HomePage;

