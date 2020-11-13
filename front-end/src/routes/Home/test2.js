import { Grid, Row, Col } from 'rsuite';
import React, { Component } from 'react';
import { Form, FormGroup, FormControl, ControlLabel, FlexboxGrid, Divider, Container, Header, Footer, Content, Sidebar } from 'rsuite';

class Component2 extends Component{
    render(){
        return(
            <div className="container">
                <Container>
                    <Header>Header</Header>
                <Container>
                    <Sidebar>Sidebar</Sidebar>
                    <Content>Content</Content>
                </Container>
                <Footer>Footer</Footer>
                </Container>
            </div>
        )
    }
}
export default Component2;