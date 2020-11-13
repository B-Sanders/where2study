import React, { Component } from 'react';
import {Container} from "rsuite";
import Content from "./Content";
import Component2 from "./test2";
import Header from "../../Header";
import Header2 from "../../Header2";

class HomePage extends Component{
    render(){
        return(
            <div>
                <div className="page-wrapper">
                    <Container>
                        <Header2 />
                        <Content />
                    </Container>
                </div>
            </div>
        )
    };
}

export default HomePage;

