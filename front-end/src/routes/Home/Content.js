import {FlexboxGrid } from 'rsuite';
import React, { Component } from 'react';
import {Container, Header, Content} from 'rsuite';
import logo from "../../images/where2study.png"
import SearchBar from "./SearchBar";
import StudyRequests from "./StudyRequests";
import RequestButton from "./RequestButton";
import { DataContext } from '../../state/context';

// Note will need to implement Unit 4 in order to adjust to changes in DB

class Home extends Component {
    constructor(props) {
        super(props);
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.state = {
            filters: [null, null, null, null]
        };
    }

    handleFilterChange(value){
        this.setState({
            filters: value
        });
    }

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
              <SearchBar handleFilterChange={this.handleFilterChange} />
              <StudyRequests filters={this.state.filters} />
              <RequestButton />
            </Content>
          </Container>
        )
    }
};
Home.contextType = DataContext
export default Home;