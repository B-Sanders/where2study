import React, { Component } from 'react';
import {Container, Sidebar, Footer} from "rsuite";
import Content from "./Content";
//import Header from "../../Header";
import Header from "../../Header2";

class HomePage extends Component{
    render(){
        return(
            <div className="show-fake-browser sidebar-page" style={{height: '100%'}}>
                <Container>
                    <Header />
                    <Container>
                        <Content />
                    </Container>
                </Container>
            </div>
        )
    };
}

export default HomePage;

