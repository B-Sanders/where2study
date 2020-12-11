import {FlexboxGrid } from 'rsuite';
import React, { Component } from 'react';
import {Container, Header, Content} from 'rsuite';
import logo from "../../images/where2study.png"
import { DataContext } from '../../state/context';
import Locations from "./Locations";

class Location extends Component{
    render() {
        return (
            <Container style={{ overflow: 'scroll' }}>
              <Header>
                <FlexboxGrid justify="center">
                  <FlexboxGrid.Item>
                    <img src={logo} height="125" width="150" href="/"/>
                  </FlexboxGrid.Item>
                </FlexboxGrid>
              </Header>
              <Content>
                <Locations/>
              </Content>
            </Container>
        )
    }
}

export default Location;