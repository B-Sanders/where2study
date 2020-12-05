import React, { Component } from 'react';
import Content from "./Content";
//import Header from "../../Header";
import Header from "../../Header2";
import styled from 'styled-components';

const HomeContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
`;

class HomePage extends Component{
    render(){
        return(
            <HomeContainer>
                <Header />
                <Content />
            </HomeContainer>
        )
    };
}

export default HomePage;

